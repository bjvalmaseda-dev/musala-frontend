// jest.config.js

module.exports = {
  collectCoverage: false,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    '@pages/(.*)$': '<rootDir>/src/pages/$1',
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '@services/(.*)$': '<rootDir>/src/services/$1',
    '@containers/(.*)$': '<rootDir>/src/containers/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
