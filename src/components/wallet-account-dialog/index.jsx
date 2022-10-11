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
        networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
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
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="rn-popup-modal2 share-modal-wrapper"
        >
            <Modal.Body>
                <h3 className="mb-5">Connected to {walletName}</h3>
                <div className="mt-5 pt-4">
                    <div className="row">
                        <div className="col-9">
                            <h5>
                                {account.slice(0, 9) +
                                    "...." +
                                    account.slice(-7)}
                            </h5>
                            
                        </div>
                        <div className="col-3">
                            <button style={{"border":"none","width":"40px"}} onClick={handleCopy}>
                                <i style={{"font-size":"24px",}} className={isCopied ? "feather-check-circle" : "feather-copy"}></i>
                            </button>
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <div>
                        <Button
                            size="medium"
                            className="mr--20 w-auto"
                            onClick={disconnectWallet}
                        >
                            Disconnect
                        </Button>
                        <Button
                            size="medium"
                            className="w-auto"
                            onClick={onChangeWallet}
                        >
                            Change Wallet
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};

WalletAccountDialog.propTypes = {
    onChangeWallet: PropTypes.func,
};

export default WalletAccountDialog;
