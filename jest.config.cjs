const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform : {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv: ['./jest.setup.cjs'],
    globals : {
        HOST : "http://localhost:8888"
    }
};