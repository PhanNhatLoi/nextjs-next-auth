const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, ".env"),
      })
    );
    return config;
  },
};
