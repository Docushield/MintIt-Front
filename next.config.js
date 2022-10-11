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
        domains: [
            `${
                process.env.NEXT_PUBLIC_BUCKET_NAME || "mintit-files"
            }.s3.us-east-2.amazonaws.com`,
            "res.cloudinary.com",
        ],
    },
    env: {
        apiURL: process.env.NEXT_PUBLIC_API_URL,
        chainAPI: process.env.NEXT_PUBLIC_CHAIN_API_HOST,
        networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
        explorerURL: process.env.NEXT_PUBLIC_EXPLORER_URL,
    },
};
