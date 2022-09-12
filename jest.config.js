module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testEnvironment: 'jest-environment-jsdom',
};
