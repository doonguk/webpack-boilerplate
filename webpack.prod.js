const commonConfig = require("./webpack.common");

const prodConfig = {
  ...commonConfig,
  mode: "production",
};

module.exports = prodConfig;
