const commonConfig = require("./webpack.common");

const prodConfig = {
  ...commonConfig,
  mode: "development",
};

module.exports = prodConfig;
