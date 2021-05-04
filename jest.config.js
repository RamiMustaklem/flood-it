module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@exmpl/(.*)': '<rootDir>/src/$1',
  },
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'src/app.js',
    'tests',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
}
