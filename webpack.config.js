const path = require("path");

module.exports = env => {
  const production = env === "production";

  return {
    mode: production ? "production" : "development",

    entry: {
      background: "./src/background",
      options: "./src/options"
    },

    devServer: {
      stats: "minimal"
    },

    output: {
      path: path.resolve(__dirname, "dist/js")
    },

    devtool: "sourcemap",

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
