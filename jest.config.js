module.exports = {
  testEnvironment: "jsdom",

  setupFiles: ["<rootDir>/jest.globals.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo-modules-core)/)"
  ],

  moduleNameMapper: {
    "\\.(png|jpg|jpeg|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  }
};
