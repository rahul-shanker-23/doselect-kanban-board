const PROXY_URI = process.env.VSCODE_PROXY_URI;
const getBasePath = (port) => {
  const PROXY_URI = process.env.VSCODE_PROXY_URI;
  if (!PROXY_URI) return "/";
  const proxyURL = PROXY_URI.replace("{{port}}", port);
  const intermediatePath = proxyURL.split("//")[1];
  const desiredPath = intermediatePath.substring(intermediatePath.indexOf("/"));
  return desiredPath;
};

module.exports = {
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleNameMapper: {
    // Mocking CSS Modules
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // Mocking image files
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    // define all globals for test here
    BASE_PATH: getBasePath(3000),
    PROXY_URI: null,
  },
};
