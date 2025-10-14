import path from "node:path";
import fs from "node:fs";
import archiver from "archiver";
import chromeWebstoreUpload from "chrome-webstore-upload";

const { EXTENSION_ID, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const webStore = chromeWebstoreUpload({
  extensionId: EXTENSION_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN,
});

const archive = archiver("zip");
archive.directory(path.resolve("./dist"), false);
archive.finalize();

webStore
  .uploadExisting(archive)
  .then((res) => {
    if (res.uploadState === "SUCCESS") {
      return webStore.publish();
    }
    console.log(res);
    return Promise.reject(new Error("failed to upload"));
  })
  .then((res) => {
    if (res.status.includes("OK")) {
      return console.log("successfully uploaded and published!");
    }
    console.log(res);
    return Promise.reject(new Error("failed to publish"));
  })
  .catch((error) => {
    throw error;
  });
