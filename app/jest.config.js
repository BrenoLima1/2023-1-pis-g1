module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
      '**/__tests__/**/*.spec.(ts|js)'
    ],
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node'
    ],

  };
