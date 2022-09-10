import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WalletAccountDialog = ({
    show,
    setShow,
    account,
    walletName,
    setConnected,
    onChangeWallet,
}) => {
    const handleClose = () => {
        setShow(!show);
    };

    const kdaEnvironment = {
        networkId: "testnet04",
        chainId: "1",
    };

    const disconnectWallet = async () => {
        console.log("Disconnect Wallet.");
        setConnected(false);
        await window.kadena.request({
            method: "kda_disconnect",
            networkId: kdaEnvironment.networkId,
        });
        handleClose();
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
                    <Button color="primary-alta">Copy</Button>
                </div>
                <div className="account-footer">
                    <Button onClick={disconnectWallet}>Disconnect</Button>
                    <Button onClick={onChangeWallet}>Change Wallet</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

WalletAccountDialog.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    account: PropTypes.string,
    walletName: PropTypes.string,
    setConnected: PropTypes.func,
    onChangeWallet: PropTypes.func,
};

export default WalletAccountDialog;
