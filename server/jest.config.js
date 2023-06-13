/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "babel-jest", // Додайте цей рядок
  },
  moduleNameMapper: {
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@errors/(.*)$": "<rootDir>/src/errors/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@common/(.*)$": "<rootDir>/src/modules/common/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
  },
};
