import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { data } from "autoprefixer";
import Anchor from "@ui/anchor";
import { useMoralis } from "react-moralis";

const ConnectWalletDialog = ({ show, setShow, setAccount, setConnected }) => {
    const handleClose = () => {
        setShow(!show);
    };

    const kdaEnvironment = {
        networkId: "testnet04",
        chainId: "1",
    };

    const apiPost = async (route, payload) =>
        fetch(`http://localhost:4000/api/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

    const connectXWallet = async () => {
        console.log("Start connectXWallet");

        const pactNetworkId = kdaEnvironment.networkId;
        const pactChainId = kdaEnvironment.chainId;

        if (!window.kadena || !window.kadena.isKadena) {
            throw new Error("No XWallet installed");
        }

        const { kadena } = window;

        await kadena.request({
            method: "kda_connect",
            networkId: pactNetworkId,
        });

        const xwalletResp = await window.kadena.request({
            method: "kda_getSelectedAccount",
            networkId: pactNetworkId,
        });

        setAccount(xwalletResp.account);

        if (!xwalletResp) {
            throw new Error("Invalid xwallet response");
        }

        if (xwalletResp.chainId !== pactChainId) {
            throw new Error(
                `Wrong chain ${xwalletResp.chainId}, please open chain ${pactChainId}`
            );
        }

        localStorage.setItem("userAccount", xwalletResp.account);

        // TODO:
        // Update isAuthenticated hook and
        // Display connected wallet
    };

    const signXWallet = async (cmd) =>
        window.kadena.request({
            networkId: kdaEnvironment.networkId,
            method: "kda_requestSign",
            data: {
                networkId: kdaEnvironment.networkId,
                signingCmd: {
                    networkId: kdaEnvironment.networkId,
                    sender: "k:99e94e2df18e41917d755558c9809926fb1c7c51397ba351d4863e59220d3578",
                    chainId: kdaEnvironment.chainId,
                    gasPrice: 0.0000001,
                    gasLimit: 3000,
                    ttl: 28800,
                    caps: [],
                    pactCode: cmd.pactCode,
                    envData: cmd.envData,
                },
            },
        });

    const sign = async (cmd) => {
        // TODO: Add check for Zelcore
        console.log("Signing tx...");

        return signXWallet({
            sender: cmd.account,
            chainId: kdaEnvironment.chainId,
            gasPrice: 0.00000001,
            gasLimit: 3000,
            ttl: 28800,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            networkId: kdaEnvironment.networkId,
        });
    };

    const getLoginSignature = async () => {
        const account = localStorage.getItem("userAccount");

        const { signedCmd } = await sign({
            account,
            pactCode: "",
            envData: {},
        });

        console.log(signedCmd);

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

    const authenticate = async () => {
        // TODO: Add modal window with x-wallet or zelcore buttons
        try {
            await connectXWallet();
            // connectZelcore();

            const loginSignature = await getLoginSignature();

            setConnected(true);
            handleClose();

            const { token } = await apiLogin(loginSignature);

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
                <Button variant="dark" onClick={authenticate}>
                    X-WALLET
                </Button>
                <Button variant="dark">ZELCORE</Button>
                <Button variant="dark">CHAINWEAVER</Button>
            </Modal.Body>
        </Modal>
    );
};

ConnectWalletDialog.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    setAccount: PropTypes.func,
    setConnected: PropTypes.func,
};

export default ConnectWalletDialog;
