module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['prettier', 'airbnb-base'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
