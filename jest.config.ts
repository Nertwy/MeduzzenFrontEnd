import type { Config } from "jest";
const config: Config = {
  verbose: true,
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
    url: "http://localhost/",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
  },
  testEnvironment: "jsdom",
};

export default config;
