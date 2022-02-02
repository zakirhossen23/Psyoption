/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
    'notistack',
    '@material-ui/core',
    '@project-serum/anchor',
    '@project-serum/sol-wallet-adapter',
    '@solana/web3.js',
    '@solana/spl-token-registry',
    '@project-serum/swap-ui',
])

module.exports = withTM({
    target: 'serverless',
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, path: false, "os": require.resolve("os-browserify/browser") };

        return config;
    },
})
