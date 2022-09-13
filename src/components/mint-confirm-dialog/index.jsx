import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MintConfirmDialog = ({ show, setShow }) => {
    const handleClose = () => {
        setShow(!show);
    };

    return (
        <Modal show={show} onHide={handleClose} className="mint-confirm-dialog">
            <Modal.Header closeButton>
                <Modal.Title>Mint New</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="input-box pb--20">
                            <input id="amount" placeholder="Amount" readOnly />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-box pb--20">
                            <input
                                id="price"
                                placeholder="Mint Price: 20 $KDA"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-box pb--20">
                            <input id="buyer" placeholder="Buyer" readOnly />
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mt_lg--15 mt_md--15 mt_sm--15">
                        <div className="input-box">
                            <Button fullwidth>Mint</Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

MintConfirmDialog.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
};

export default MintConfirmDialog;
