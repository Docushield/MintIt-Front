import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pact from "pact-lang-api";
import { setCookie, parseCookies } from "nookies";
import { signXWallet, connectXWallet as connectToXWallet } from "@utils/kadena";
import Image from "next/image";
import {
    toggleConnectWalletDialog,
    setConnected,
} from "../../store/wallet.module";

const ConnectWalletDialog = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.wallet.isConnectWalletDialog);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const handleClose = () => {
        dispatch(toggleConnectWalletDialog());
    };

    const kdaEnvironment = {
        networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    };

    const apiPost = async (route, payload) =>
        fetch(`${baseURL}/api/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

    const connectXWallet = async () => {
        const xwalletResp = await connectToXWallet();

        setCookie(null, "userAccount", xwalletResp.account);
        setCookie(null, "walletName", "X-Wallet");
        dispatch(
            setConnected({
                account: xwalletResp.account,
                walletName: "X-Wallet",
            })
        );
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

        dispatch(
            setConnected({
                account: getAccountsJson.data[0],
                walletName: "Zelcore",
            })
        );
    };

    const connect = async (provider) => {
        if (provider === "X-Wallet") {
            return connectXWallet();
        } else if (provider === "Zelcore") {
            return connectZelcore();
        }
    };

    const signZelcore = async (cmd) => {
        console.log(`Signing...`);
        console.log(cmd);

        return Pact.wallet.sign(cmd);
    };

    const sign = async (provider, cmd) => {
        console.log("Signing tx....");

        const { chainId, networkId } = kdaEnvironment;

        const signingObject = {
            sender: cmd.account,
            chainId,
            gasPrice: 0.00000001,
            gasLimit: 3000,
            ttl: 28800,
            caps: [],
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
        const cookies = parseCookies();
        const account = cookies["userAccount"];

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
        const cookies = parseCookies();
        const account = cookies["userAccount"];

        return apiPost("auth", {
            account,
            command: cmd,
            signature: sigs[0].sig,
        });
    };

    const authenticate = async (provider) => {
        try {
            await connect(provider);

            const loginSignature = await getLoginSignature(provider);

            handleClose();

            const response = await apiLogin(loginSignature);
            const { token } = await response.json();

            setCookie(null, "token", token, {
                maxAge: 30 * 24 * 60 * 60,
            });

            // TODO: Save token and use it in auth
            return token;
        } catch (error) {
            console.log("----Error----", error.message || error);
            return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="wallet-dialog">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div
                    className="wallet-item"
                    onClick={() => authenticate("X-Wallet")}
                >
                    <div>
                        <Image
                            src="/images/wallet/x-wallet.png"
                            width={75}
                            height={75}
                        />
                    </div>
                    <div>
                        <h3>X-WALLET</h3>
                        <p>Connect to your X-wallet</p>
                    </div>
                </div>
                <div
                    className="wallet-item"
                    onClick={() => authenticate("Zelcore")}
                >
                    <div>
                        <Image
                            src="/images/wallet/zelcore.png"
                            width={75}
                            height={75}
                        />
                    </div>
                    <div>
                        <h3>ZELCORE</h3>
                        <p>Connect to your Zelcore Wallet</p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConnectWalletDialog;
