import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pact from "pact-lang-api";

const ConnectWalletDialog = ({
    show,
    setShow,
    setAccount,
    setConnected,
    setWalletName,
    walletName,
}) => {
    const handleClose = () => {
        setShow(!show);
    };

    const kdaEnvironment = {
        networkId: "testnet04",
        chainId: "1",
    };

    const apiPost = async (route, payload) =>
        fetch(`https://the-backend.fly.dev/api/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

    const connectXWallet = async () => {
        const { networkId, chainId } = kdaEnvironment;

        if (!window.kadena || !window.kadena.isKadena) {
            console.log("No xwallet instaled");
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

        localStorage.setItem("userAccount", xwalletResp.account);
        localStorage.setItem("walletName", "X-Wallet");
        setAccount(xwalletResp.account);
    };

    const connectZelcore = async () => {
        const { networkId, chainId } = kdaEnvironment;

        const getAccounts = await fetch("http://127.0.0.1:9467/v1/accounts", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ asset: "kadena" }),
        });

        const getAccountsJson = await getAccounts.json();

        if (getAccountsJson.error) {
            console.log("Error getting accounts");
            return;
        }

        if (getAccountsJson.data.length === 0) {
            console.log("No accounts found");
            return;
        }

        setAccount(getAccountsJson.data[0]);
    };

    const connect = async (provider) => {
        if (provider === "X-Wallet") {
            return connectXWallet();
        } else if (provider === "Zelcore") {
            return connectZelcore();
        }
    };

    // const signXWallet = async (cmd) =>
    //     window.kadena.request({
    //         networkId: kdaEnvironment.networkId,
    //         method: "kda_requestSign",
    //         data: {
    //             networkId: kdaEnvironment.networkId,
    //             signingCmd: {
    //                 networkId: kdaEnvironment.networkId,
    //                 sender: "k:99e94e2df18e41917d755558c9809926fb1c7c51397ba351d4863e59220d3578",
    //                 chainId: kdaEnvironment.chainId,
    //                 gasPrice: 0.0000001,
    //                 gasLimit: 3000,
    //                 ttl: 28800,
    //                 caps: [],
    //                 pactCode: cmd.pactCode,
    //                 envData: cmd.envData,
    //             },
    //         },
    //     });

    const signXWallet = async (cmd) =>
        window.kadena.request({
            networkId: cmd.networkId,
            method: "kda_requestSign",
            data: {
                networkId: cmd.networkId,
                signingCmd: {
                    networkId: cmd.networkId,
                    sender: cmd.sender,
                    chainId: cmd.chainId,
                    gasPrice: 0.0000001,
                    gasLimit: 3000,
                    ttl: 28800,
                    caps: [],
                    pactCode: cmd.pactCode,
                    envData: cmd.envData,
                },
            },
        });

    const signZelcore = async (cmd) => {
        console.log(`Signing...`);
        console.log(cmd);

        return Pact.wallet.sign(cmd);
    };

    const sign = async (provider, cmd) => {
        console.log("Signing tx...");

        const { chainId, networkId } = kdaEnvironment;

        const signingObject = {
            sender: cmd.account,
            chainId,
            gasPrice: 0.00000001,
            gasLimit: 3000,
            ttl: 28800,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            networkId,
        };

        if (provider === "X-Wallet") {
            return signXWallet(signingObject);
        } else if (provider === "Zelcore") {
            return signZelcore(signingObject);
        }
    };

    const getLoginSignature = async (provider) => {
        const account = localStorage.getItem("userAccount");

        const { signedCmd } = await sign(provider, {
            account,
            pactCode: `(coin.details ${account})`,
            envData: {},
            caps: [],
        });

        return signedCmd;
    };

    const apiLogin = async (loginSignature) => {
        const { cmd, sigs } = loginSignature;
        const account = localStorage.getItem("userAccount");

        return apiPost("auth", {
            account,
            command: cmd,
            signature: sigs[0].sig,
        });
    };

    const authenticate = async (provider) => {
        try {
            setWalletName(provider);

            await connect(provider);

            const loginSignature = await getLoginSignature(provider);

            setConnected(true);

            handleClose();

            const response = await apiLogin(loginSignature);
            const { token } = await response.json();

            localStorage.setItem("token", token);

            // TODO: Save token and use it in auth
            return token;
        } catch (error) {
            console.log("----Error----", error.message || error);
            return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="wallet-dialog">
            <Modal.Header closeButton>
                <Modal.Title>Connect Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="dark" onClick={() => authenticate("X-Wallet")}>
                    X-WALLET
                </Button>
                <Button variant="dark" onClick={() => authenticate("Zelcore")}>
                    ZELCORE
                </Button>
            </Modal.Body>
        </Modal>
    );
};

ConnectWalletDialog.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    setAccount: PropTypes.func,
    setConnected: PropTypes.func,
    setWalletName: PropTypes.func,
};

export default ConnectWalletDialog;
