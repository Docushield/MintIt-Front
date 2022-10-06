import Pact from "pact-lang-api";

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

export const signZelcore = async (cmd) => {
    console.log(`Signing...`);
    console.log(cmd);

    return Pact.wallet.sign(cmd);
};

export const sign = async (provider, signingObject) => {
    console.log("Signing tx...");
    if (provider === "X-Wallet") {
        const res = await signXWallet(signingObject);
        return res.signedCmd;
    } else if (provider === "Zelcore") {
        return signZelcore(signingObject);
    }
};

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

export const connectZelcore = async () => {
    const accounts = await fetch("http://127.0.0.1:9467/v1/accounts", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ asset: "kadena" }),
    });

    const accountsJson = await accounts.json();
    return accountsJson;
};
