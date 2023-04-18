
export default {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform : {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
};