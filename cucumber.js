// cucumber.js
let common = [
    'tests/integration/**/*.feature', // Specify our feature files
    '--require-module ts-node/register', // Load TypeScript module
    '--require tests/integration/**/*.ts', // Load step definitions
    '--format progress-bar', // Load custom formatter
].join(' ');

module.exports = {
    default: common
};
