module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{ts,tsx}',
      '!<rootDir>/src/main/**/*',
      '!<rootDir>/src/**/index.ts',
      '!**/*.d.ts'
    ],
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/tests/e2e/cypress'
    ],
    testEnvironment: 'jsdom',
    transform: {
      '.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
      '@/tests/(.*)': '<rootDir>/tests/$1',
      '@/(.*)': '<rootDir>/src/$1',
      '\\.scss$': 'identity-obj-proxy'
    }
  }