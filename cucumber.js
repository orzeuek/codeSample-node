// cucumber.js
let common = [
    'tests/integration/**/*.feature', // Specify our feature files
    '--require-module ts-node/register', // Load TypeScript module
    '--require tests/integration/**/*.ts', // Load step definitions
].join(' ');

module.exports = {
    default: common
};
