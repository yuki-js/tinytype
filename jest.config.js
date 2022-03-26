/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // exclude utils directory
  testPathIgnorePatterns: ["/node_modules/", "/utils/"],
};
