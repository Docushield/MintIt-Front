import Pact from "pact-lang-api";
import { toast } from "react-toastify";

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
    const networkId = process.env.NEXT_PUBLIC_NETWORK_ID;

    if (!window.kadena || !window.kadena.isKadena) {
        console.log("No xwallet installed");
        toast.error("x-wallet is not installed!");
        return;
    }

    const { kadena } = window;

    var connectx = await kadena.request({
        method: "kda_connect",
        networkId,
    });

    console.log(connectx);

    if (connectx.status == "fail") {
        toast.error("Invalid network selected.");
        throw new Error("Invalid x-wallet response");
    }

    const xwalletResp = await window.kadena.request({
        method: "kda_getSelectedAccount",
        networkId,
    });

    if (!xwalletResp) {
        toast.error("x-wallet is not working properly!");
        throw new Error("Invalid xwallet response");
    }

    //don't need to check which chain id is open, as in new version of x-wallet
    // if (xwalletResp.chainId !== chainId) {
    //     toast.error(
    //         `Wrong chain ${xwalletResp.chainId}, please open chain ${chainId}`
    //     );
    //     throw new Error(
    //         `Wrong chain ${xwalletResp.chainId}, please open chain ${chainId}`
    //     );
    // }

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
