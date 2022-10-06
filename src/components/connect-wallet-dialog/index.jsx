import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { setCookie, parseCookies } from "nookies";
import { apiLogin } from "@utils/apiLogin";
import {
    ZELCORE,
    X_WALLET,
    GAS_PRICE,
    GAS_LIMIT,
    TTL,
} from "src/constants/kadena";
import {
    sign,
    connectXWallet as connectToXWallet,
    connectZelcore as connectToZelcore,
} from "@utils/kadena";
import {
    toggleConnectWalletDialog,
    setConnected,
} from "../../store/wallet.module";

const ConnectWalletDialog = () => {
    const kdaEnvironment = {
        networkId: process.env.NETWORK_ID,
        chainId: process.env.CHAIN_ID,
    };

    const dispatch = useDispatch();
    const show = useSelector((state) => state.wallet.isConnectWalletDialog);

    const handleClose = () => {
        dispatch(toggleConnectWalletDialog());
    };

    const setUserAccountAndWalletNameToCookie = (account, wallet) => {
        setCookie(null, "userAccount", account);
        setCookie(null, "walletName", wallet);
    };

    const setUserAccountAndWalletNameToReduxStore = (account, wallet) =>
        dispatch(
            setConnected({
                account: account,
                walletName: wallet,
            })
        );

    const connectXWallet = async () => {
        const res = await connectToXWallet();
        return { account: res.account, walletName: X_WALLET };
    };

    const connectZelcore = async () => {
        const res = await connectToZelcore();
        return { account: res.data[0], walletName: ZELCORE };
    };

    const connect = async (provider) => {
        let res;
        if (provider === X_WALLET) {
            res = await connectXWallet();
        } else if (provider === ZELCORE) {
            res = await connectZelcore();
        }
        setUserAccountAndWalletNameToCookie(res.account, res.walletName);
        setUserAccountAndWalletNameToReduxStore(res.account, res.walletName);
    };

    const getLoginSignature = async (provider) => {
        const { networkId, chainId } = kdaEnvironment;

        const cookies = parseCookies();
        const account = cookies["userAccount"];
        const userPubKey = account.startsWith("k:")
            ? account.slice(2)
            : account;

        const signingObject = {
            sender: account,
            chainId,
            gasPrice: GAS_PRICE,
            gasLimit: GAS_LIMIT,
            ttl: TTL,
            caps: [],
            pactCode: `(coin.details ${account})`,
            envData: {
                "user-ks": {
                    keys: [userPubKey],
                    pred: "keys-all",
                },
            },
            signingPubKey: userPubKey,
            networkId,
        };

        const signedCmd = await sign(provider, signingObject);

        return signedCmd;
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
                    onClick={() => authenticate(X_WALLET)}
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
                    onClick={() => authenticate(ZELCORE)}
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
