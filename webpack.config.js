const path = require("path");

module.exports = env => {
  const isProduction = env === "production";

  return {
    mode: isProduction ? "production" : "development",

    entry: {
      background: "./src/background",
      options: "./src/options"
    },

    output: {
      path: path.resolve(__dirname, "dist/js")
    },

    devtool: isProduction ? false : "inline-source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        }
      ]
    }
  };
};
