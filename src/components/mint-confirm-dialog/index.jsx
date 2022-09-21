import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleMintConfirmDialog } from "../../store/collection.module";

const MintConfirmDialog = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.collection.isMintConfirmDialog);
    const account = useSelector((state) => state.wallet.account);

    const handleClose = () => {
        dispatch(toggleMintConfirmDialog());
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
                            <input
                                id="name"
                                placeholder="Collection Name"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-box pb--20">
                            <input
                                id="price"
                                placeholder="Total Mint Price: 20 $KDA"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-box pb--20">
                            <input
                                id="account"
                                placeholder="Currently connected wallet"
                                value={account}
                                readOnly
                            />
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

export default MintConfirmDialog;
