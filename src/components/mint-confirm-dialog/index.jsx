import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pact from "pact-lang-api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sign } from "@utils/kadena";
import { toggleMintConfirmDialog } from "../../store/collection.module";
import { pactLocalFetch } from "@utils/pactLocalFetch";
import { baseSignInObject } from "src/lib/constants";
import {
    ALPHA_CREATOR_PASS,
    DOC_BOND,
    DOC_ACCOUNT,
    DOC_BOND_TOKEN_NAME,
    ALPHA_CREATOR_PASS_TOKEN_NAME,
} from "src/constants/token";

const CONTRACT_NAME = "free.doc-nft-mint";

const MintConfirmDialog = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const show = useSelector((state) => state.collection.isMintConfirmDialog);
    const current = useSelector((state) => state.collection.current);
    const account = useSelector((state) => state.wallet.account);
    const wallet = useSelector((state) => state.wallet.walletName);

    const [isMinting, setIsMinting] = useState(false);
    const [pending, setPending] = useState(false);
    const [mintSuccess, setMintSuccess] = useState(false);
    const [mintUnSuccess, setMintUnSuccess] = useState(false);
    const [mintStatus, setMintStatus] = useState("");

    const host = `${process.env.chainAPI}/chainweb/0.0/${process.env.networkId}/chain/${process.env.chainId}/pact`;

    const handleClose = () => {
        dispatch(toggleMintConfirmDialog());
        if (mintSuccess || mintUnSuccess) {
            router.reload(window.location.pathname);
        }
    };

    //get price for nft token
    const get_NFT_WL_price = async (tokenName) => {
        let pactCode = `(${CONTRACT_NAME}.get-mint-price-wl "${tokenName}")`;
        const res = await pactLocalFetch(pactCode);
        return res.result.data;
    };

    //get price for nft token
    const get_NFT_price = async (contractName, tokenName) => {
        let pactCode = `(${contractName}.get-mint-price "${tokenName}" "${account}")`;
        const res = await pactLocalFetch(pactCode);
        return res.result.data;
    };

    //checks if account is Active and White Listed
    const check_WLA_Account = async (tokenName) => {
        let pactCode = `(${CONTRACT_NAME}.is-active-wl-account "${tokenName}" "${account}")`;
        const res = await pactLocalFetch(pactCode);
        return res.result.data;
    };

    //checks if account is able for Token sale may be
    const check_WL_Sale = async (tokenName) => {
        let pactCode = `(${CONTRACT_NAME}.is-wl-sale "${tokenName}")`;
        const res = await pactLocalFetch(pactCode);
        return res.result.data;
    };

    const onMint = async () => {
        if (!current) {
            return;
        }
        let cmd = {};
        let userPubKey = "";
        if (current.name === ALPHA_CREATOR_PASS || current.name === DOC_BOND) {
            let tokenName = ALPHA_CREATOR_PASS_TOKEN_NAME;
            if (current.name === DOC_BOND) tokenName = DOC_BOND_TOKEN_NAME;
            const isSaleWL = await check_WL_Sale(tokenName);
            let price = 0;

            if (isSaleWL == null) {
                toast.error("Transaction Failed wl!");
                setIsMinting(false);
                return;
            }

            if (isSaleWL) {
                //get mint token white listed price
                setMintStatus("Getting Token WL Price");
                const mintWlPrice = await get_NFT_WL_price(tokenName);

                //to check if white listed active account
                setMintStatus("Checking whitelist limit");
                const accountStatus = await check_WLA_Account(tokenName);

                if (accountStatus == null) {
                    toast.error("Transaction Failed!");
                    setIsMinting(false);
                    return;
                }
                if (accountStatus) {
                    setMintStatus("Minting NTF Token");
                    price = mintWlPrice;
                } else {
                    toast.error(
                        "MINT ERROR: Either your account is not whitelisted or the whitelist limit has reached."
                    );
                    setIsMinting(false);
                    return;
                }
            } else {
                //get mint token price
                setMintStatus("Getting Token Price");
                const mintPrice = await get_NFT_price(CONTRACT_NAME, tokenName);
                console.log("mint :" + mintPrice);
                setMintStatus("Minting NTF Token");
                price = mintPrice;
            }
            userPubKey = account.startsWith("k:") ? account.slice(2) : account;

            let caps = [];
            caps.push(
                Pact.lang.mkCap(
                    "Coin Transfer",
                    `${tokenName} fee`,
                    "coin.TRANSFER",
                    [account, DOC_ACCOUNT, price]
                )
            );
            caps.push(Pact.lang.mkCap("Gas fee", `Gas fee`, "coin.GAS", []));
            cmd = {
                account,
                caps: caps,
                pactCode: `(${CONTRACT_NAME}.mint "${tokenName}" "${account}" (read-msg 'user-ks))`,
                envData: {
                    "user-ks": {
                        keys: [userPubKey],
                        pred: "keys-all",
                    },
                },
            };
        } else {
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
            } else {
                // Preparation
                const deployedContract = process.env.NEXT_PUBLIC_CONTRACT;
                userPubKey = account.slice(2);

                const mintPrice = await get_NFT_price(
                    deployedContract,
                    current.name
                );
                let caps = current["mint-royalties"].rates.map(
                    ({ description, stakeholder, rate }) =>
                        Pact.lang.mkCap(
                            "Coin Transfer",
                            `${description} fee`,
                            "coin.TRANSFER",
                            [
                                account,
                                stakeholder,
                                parseFloat((mintPrice * rate).toPrecision(6)),
                            ]
                        )
                );

                caps.push(
                    Pact.lang.mkCap("Gas fee", `Gas fee`, "coin.GAS", [])
                );
                caps.push(
                    Pact.lang.mkCap(
                        "NFT Minting",
                        `NFT Minting`,
                        `${deployedContract}.MINT_NFT_REQUEST`,
                        []
                    )
                );

                cmd = {
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
            }
        }

        // This is what we already have in the wallet connect part

        const signingObject = {
            ...baseSignInObject,
            sender: cmd.account,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            signingPubKey: userPubKey,
        };

        // Sign in x-wallet (we can use our sign functions)
        setIsMinting(true);
        setMintStatus("Minting...");
        try {
            const signedCmd = await sign(wallet, signingObject);

            // Send TX
            const { requestKeys } = await fetch(`${host}/api/v1/send`, {
                body: JSON.stringify({ cmds: [signedCmd] }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());
            setPending(true);
            setMintStatus(
                "Your transaction is pending, here's your Request Key : " +
                    requestKeys[0]
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
                        setPending(false);
                        setMintSuccess(true);
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
                        setPending(false);
                        setMintUnSuccess(true);
                    }
                }
            }, 1000);
        } catch (error) {
            toast("Error occurred in minting a new token", error);
            setMintStatus(
                "Error occurred in minting a new token, Error: " + error
            );
            setPending(false);
            setMintUnSuccess(true);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="rn-popup-modal2 share-modal-wrapper"
        >
            <Modal.Body>
                <h3 className="mb-5">
                    Minting,{" "}
                    <span style={{ color: "#20ec8d" }}>
                        {current && current.name}
                    </span>
                </h3>
                {isMinting ? (
                    <div className="row text-center">
                        <div className="col-12">
                            <p>{mintStatus}</p>
                        </div>
                        <div className="col-12 mt-5">
                            {mintSuccess ? (
                                <i
                                    style={{ "font-size": "35px" }}
                                    className="feather-check-circle"
                                />
                            ) : mintUnSuccess ? (
                                <i
                                    style={{ "font-size": "35px" }}
                                    className="feather-x-circle"
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "2.8rem",
                                        height: "2.8rem",
                                    }}
                                    className={
                                        pending
                                            ? "spinner-border"
                                            : "spinner-grow"
                                    }
                                    role="status"
                                ></div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="input-box pb--20"
                                style={{ "font-size": "20px" }}
                            >
                                <input
                                    id="name"
                                    placeholder="Collection Name"
                                    value={current && current.name}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="input-box pb--20"
                                style={{ "font-size": "20px" }}
                            >
                                <input
                                    id="price"
                                    placeholder="Total Mint Price: 20 $KDA"
                                    value={`${
                                        current &&
                                        (new Date().toLocaleString() <
                                        new Date(
                                            current["premint-ends"]
                                        ).toLocaleString()
                                            ? current["premint-price"]
                                            : current["mint-price"])
                                    }
                                    KDA`}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="input-box pb--20"
                                style={{ "font-size": "20px" }}
                            >
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
