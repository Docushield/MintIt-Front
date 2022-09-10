import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConnectWalletDialog = ({ show, setShow }) => {
    const handleClose = () => {
        setShow(!show);
    };

    return (
        <Modal show={show} onHide={handleClose} className="wallet-dialog">
            <Modal.Header closeButton>
                <Modal.Title>Connect Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="dark">X-WALLET</Button>
                <Button variant="dark">ZELCORE</Button>
                <Button variant="dark">CHAINWEAVER</Button>
            </Modal.Body>
        </Modal>
    );
};

ConnectWalletDialog.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
};

export default ConnectWalletDialog;
