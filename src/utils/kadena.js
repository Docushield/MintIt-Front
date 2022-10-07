export const signXWallet = async (
    cmd,
    gasPrice = 0.0000001,
    gasLimit = 3000,
    ttl = 28800
) =>
    window.kadena.request({
        networkId: cmd.networkId,
        method: "kda_requestSign",
        data: {
            networkId: cmd.networkId,
            signingCmd: {
                networkId: cmd.networkId,
                sender: cmd.sender,
                chainId: cmd.chainId,
                gasPrice: cmd.gasPrice || gasPrice,
                gasLimit: cmd.gasLimit || gasLimit,
                ttl,
                caps: cmd.caps,
                pactCode: cmd.pactCode,
                envData: cmd.envData,
            },
        },
    });

export const connectXWallet = async () => {
    const kdaEnvironment = {
        networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    };



    const { networkId, chainId } = kdaEnvironment;
    console.log(networkId);
    console.log(chainId);

    if (!window.kadena || !window.kadena.isKadena) {
        console.log("No xwallet installed");
        return;
    }

    const { kadena } = window;

    await kadena.request({
        method: "kda_connect",
        networkId,
    });

    const xwalletResp = await window.kadena.request({
        method: "kda_getSelectedAccount",
        networkId,
    });

    if (!xwalletResp) {
        throw new Error("Invalid xwallet response");
    }

    if (xwalletResp.chainId !== chainId) {
        throw new Error(
            `Wrong chain ${xwalletResp.chainId}, please open chain ${chainId}`
        );
    }

    console.log(xwalletResp);
    return xwalletResp;
};
