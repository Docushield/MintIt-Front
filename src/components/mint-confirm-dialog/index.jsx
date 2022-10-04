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
    const [error, setError] = useState("");

    const handleClose = () => {
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
        const current = new Date();
        if (current < mintStarts) {
            toast.error(
                "Premint period was not started yet, and it is impossible to mint a new token."
            );
            return;
        }
        if (
            current < premintEnds &&
            !whitelists.find((whitelist) => whitelist === account)
        ) {
            toast.error(
                "This address is not whitelisted, and it is impossible to mint a new token."
            );
            return;
        }

        // Preparation
        const deployedContract = "free.z74plc";

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

        const chainId = "1";
        const networkId = "testnet04";

        const cmd = {
            account,
            caps: caps,
            pactCode: `(${deployedContract}.mint-nft {
                'account: "${account}",
                'guard: (read-msg 'user-guard),
                'collection-name: "${current.name}"
            })`,
            envData: {
                "user-guard": {
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
            gasLimit: 3000,
            ttl: 28800,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            networkId,
        };

        // Sign in xwallet (we can use our sign functions)

        setIsMinting(true);
        try {
            const signedCmd = await signXWallet(signingObject);

            // Send TX

            const host =
                "https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact";

            const { requestKeys } = await fetch(`${host}/api/v1/send`, {
                body: JSON.stringify({ cmds: [signedCmd.signedCmd] }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());

            const result = await Pact.fetch.poll({ requestKeys }, host);
            console.log(result);
            toast("Successfully minted a new token.");
        } catch (error) {
            setError(error);
            toast("Error occurred in minting a new token", error);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="mint-confirm-dialog">
            <Modal.Header closeButton>
                <Modal.Title>Mint New</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isMinting ? (
                    <div className="row text-center">
                        <p>Minting...</p>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-box pb--20">
                                <input
                                    id="name"
                                    placeholder="Collection Name"
                                    value={current && current.name}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-box pb--20">
                                <input
                                    id="price"
                                    placeholder="Total Mint Price: 20 $KDA"
                                    value={`${
                                        current && current["mint-price"]
                                    } $KDA`}
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
                                <Button fullwidth onClick={onMint}>
                                    Mint
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default MintConfirmDialog;
