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
                gasPrice,
                gasLimit,
                ttl,
                caps: cmd.caps,
                pactCode: cmd.pactCode,
                envData: cmd.envData,
            },
        },
    });

export const connectXWallet = async () => {
    const kdaEnvironment = {
        networkId: "testnet04",
        chainId: "1",
    };

    const { networkId, chainId } = kdaEnvironment;

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

    return xwalletResp;
};
