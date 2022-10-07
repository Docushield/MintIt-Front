import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { destroyCookie } from "nookies";
import {
    setDisconnected,
    toggleWalletAccountDialog,
} from "../../store/wallet.module";

const WalletAccountDialog = ({ onChangeWallet }) => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.wallet.isWalletAccountDialog);
    const account = useSelector((state) => state.wallet.account);
    const walletName = useSelector((state) => state.wallet.walletName);
    const [isCopied, setIsCopied] = useState(false);

    const handleClose = () => {
        dispatch(toggleWalletAccountDialog());
    };

    const kdaEnvironment = {
        networkId: "testnet04",
        chainId: "1",
    };

    const disconnectWallet = async () => {
        console.log("Disconnect Wallet.");
        dispatch(setDisconnected());
        await window.kadena.request({
            method: "kda_disconnect",
            networkId: kdaEnvironment.networkId,
        });
        destroyCookie(null, "userAccount");
        destroyCookie(null, "walletName");
        destroyCookie(null, "token");
        handleClose();
    };

    const handleCopy = async () => {
        setIsCopied(true);
        navigator.clipboard.writeText(account);
    };

    return (
        <Modal show={show} onHide={handleClose} className="account-dialog">
            <Modal.Header closeButton>
                <Modal.Title>Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Connected to {walletName}</h5>
                <div className="account-address">
                    <div>{account.slice(0, 30)}...</div>
                    <Button variant="dark" onClick={handleCopy}>
                        {isCopied ? "Copied" : "Copy"}
                    </Button>
                </div>
                <div className="account-footer">
                    <Button variant="dark" onClick={disconnectWallet}>
                        Disconnect
                    </Button>
                    <Button variant="dark" onClick={onChangeWallet}>
                        Change Wallet
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

WalletAccountDialog.propTypes = {
    onChangeWallet: PropTypes.func,
};

export default WalletAccountDialog;
