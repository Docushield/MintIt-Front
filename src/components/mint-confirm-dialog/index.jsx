import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pact from "pact-lang-api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signXWallet } from "@utils/kadena";
import { toggleMintConfirmDialog } from "../../store/collection.module";

const MintConfirmDialog = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.collection.isMintConfirmDialog);
    const current = useSelector((state) => state.collection.current);
    const account = useSelector((state) => state.wallet.account);
    const [isMinting, setIsMinting] = useState(false);
    const [mintStatus, setMintStatus] = useState("");

    const host = `${process.env.chainAPI}/chainweb/0.0/${process.env.networkId}/chain/${process.env.chainId}/pact`;

    const handleClose = () => {
        setIsMinting(false);
        setMintStatus("");
        dispatch(toggleMintConfirmDialog());
    };

    const onMint = async () => {
        if (!current) {
            return;
        }

        const numMinted = current?.numMinted || 0;
        if (current?.size <= numMinted) {
            toast.error(
                "Unavailable to mint a new token. All tokens were already minted."
            );
            return;
        }

        const premintEnds = current["premint-ends"]
            ? new Date(current["premint-ends"])
            : new Date();
        const mintStarts = current["mint-starts"]
            ? new Date(current["mint-starts"])
            : new Date();
        const whitelists = current["premint-whitelist"];
        const currentTime = new Date();
        if (currentTime < mintStarts) {
            toast.error(
                "Premint period was not started yet, and it is impossible to mint a new token."
            );
            return;
        }
        if (
            currentTime < premintEnds &&
            !whitelists.find((whitelist) => whitelist === account)
        ) {
            toast.error(
                "This address is not whitelisted, and it is impossible to mint a new token."
            );
            return;
        }

        // Preparation
        const deployedContract = process.env.NEXT_PUBLIC_CONTRACT;
        const userPubKey = account.slice(2);

        let caps = current["mint-royalties"].rates.map(
            ({ description, stakeholder, rate }) =>
                Pact.lang.mkCap(
                    "Coin Transfer",
                    `${description} fee`,
                    "coin.TRANSFER",
                    [account, stakeholder, current["mint-price"] * rate]
                )
        );

        caps.push(Pact.lang.mkCap("Gas fee", `Gas fee`, "coin.GAS", []));
        caps.push(
            Pact.lang.mkCap(
                "NFT Minting",
                `NFT Minting`,
                `${deployedContract}.MINT_NFT_REQUEST`,
                []
            )
        );

        const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
        const networkId = process.env.NEXT_PUBLIC_NETWORK_ID;
        const cmd = {
            account,
            caps: caps,
            pactCode: `(${deployedContract}.mint-nft {
                'account: "${account}",
                'guard: (read-msg 'user-ks),
                'collection-name: "${current.name}"
            })`,
            envData: {
                "user-ks": {
                    keys: [userPubKey],
                    pred: "keys-all",
                },
            },
        };

        // This is what we already have in the wallet connect part

        const signingObject = {
            sender: cmd.account,
            chainId,
            gasPrice: 0.00000001,
            gasLimit: 100000,
            ttl: 28800,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            networkId,
            signingPubKey: userPubKey,
        };

        // Sign in xwallet (we can use our sign functions)

        setIsMinting(true);
        setMintStatus("Minting...");
        try {
            const signedCmd = await signXWallet(signingObject);

            // Send TX

            const { requestKeys } = await fetch(`${host}/api/v1/send`, {
                body: JSON.stringify({ cmds: [signedCmd.signedCmd] }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());
            setMintStatus(
                "Transaction is pending, Request Key : " + requestKeys[0]
            );
            const interval = setInterval(async () => {
                const result = await Pact.fetch.poll({ requestKeys }, host);
                if (Object.keys(result).length > 0) {
                    if (result[requestKeys[0]].result.data) {
                        clearInterval(interval);
                        toast.success("Successfully minted a new token");
                        setMintStatus(
                            "Successfully minted a new token, Request Key : " +
                                requestKeys[0]
                        );
                        // setIsMinting(false);
                    } else if (result[requestKeys[0]].result.error) {
                        clearInterval(interval);
                        toast.error(
                            "Failed to mint a new token: " +
                                result[requestKeys[0]].result.error.message
                        );
                        setMintStatus(
                            "Failed to mint a new token, Request Key : " +
                                requestKeys[0] +
                                " , Error : " +
                                result[requestKeys[0]].result.error.message
                        );
                        // setIsMinting(false);
                    }
                }
            }, 1000);
        } catch (error) {
            toast("Error occurred in minting a new token", error);
            setMintStatus(
                "Error occurred in minting a new token, Error: " + error
            );
            // setIsMinting(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="rn-popup-modal2 share-modal-wrapper"
        >
            <Modal.Body>
                <h3 className="mb-5">Mint Collections</h3>
                {isMinting ? (
                    <div className="row text-center">
                        <p>{mintStatus}</p>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-12">
                            <div className="input-box pb--20" style={{"font-size": "20px"}}>
                                <input
                                    id="name"
                                    placeholder="Collection Name"
                                    value={current && current.name}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-box pb--20" style={{"font-size": "20px"}}>
                                <input
                                    id="price"
                                    placeholder="Total Mint Price: 20 $KDA"
                                    value={`${
                                        current && current["mint-price"]
                                    }   $KDA`}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-box pb--20" style={{"font-size": "20px"}}>
                                <input
                                    id="account"
                                    placeholder="Currently connected wallet"
                                    value={`${account.slice(
                                        0,
                                        15
                                    )}..........${account.slice(-12)}`}
                                    disabled
                                />
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button
                                size="medium"
                                onClick={onMint}
                                className="w-auto"
                            >
                                Mint Now
                            </Button>
                        </Modal.Footer>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default MintConfirmDialog;
