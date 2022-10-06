const path = require("path");

module.exports = {
    //reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    env: {
        API_URL: process.env.API_URL || "https://the-backend.fly.dev",
        NETWORK_ID: process.env.NETWORK_ID || "testnet04",
        CHAIN_ID: process.env.CHAIN_ID || "1",
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
    images: {
        domains: ["mintit-files.s3.us-east-2.amazonaws.com"],
    },
};
