import Image from "next/image";
import { Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import Pact from "pact-lang-api";
import { useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import Anchor from "@ui/anchor";

const Mint = () => {
    const [account, setAccount] = useState("");
    const [provider, setProvider] = useState("");
    const [mintError, setMintError] = useState("");
    const [mintStatus, setMintStatus] = useState("");
    const [pending, setPending] = useState(false);
    const [showTx, setShowTx] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [nftTokenCount, setNftTokenCount] = useState(0);
    const [bondTokenCount, setBondTokenCount] = useState(0);

    useEffect(() => {
        const cookies = parseCookies();
        const userAcc = cookies["userAccount"];
        const provider = cookies["walletName"];
        setAccount(userAcc);
        setProvider(provider);
        console.log(userAcc);

        getNftTokenCount();
        getBondTokenCount();
    }, []);

    const DOC_ACCOUNT =
        "k:4159aa0d1f1e6c119c532d9286746274c3cc46dadd50ffc486a38de502ad6855";
    const CONTRACT_NAME = "free.doc-nft-mint";

    const pactChainId = "8";
    const pactGasLimit = 100000;
    const pactGasPrice = 0.00000001;
    const pactNetworkId = "mainnet01";
    const apiHost = `https://api.chainweb.com/chainweb/0.0/${pactNetworkId}/chain/${pactChainId}/pact`;

    //sends request to x-wallet for sign
    const signXWallet = async (cmd) =>
        window.kadena.request({
            networkId: cmd.networkId,
            method: "kda_requestSign",
            data: {
                networkId: cmd.networkId,
                signingCmd: {
                    networkId: cmd.networkId,
                    sender: cmd.sender,
                    chainId: cmd.chainId,
                    gasPrice: pactGasPrice,
                    gasLimit: pactGasLimit,
                    ttl: 28800,
                    caps: cmd.caps,
                    pactCode: cmd.pactCode,
                    envData: cmd.envData,
                    signingPubKey: cmd.signingPubKey,
                },
            },
        });

    const signZelcore = async (cmd) => {
        console.log(`Signing...`);
        console.log(cmd);

        return Pact.wallet.sign(cmd);
    };

    const sign = async (provider, signingObject) => {
        console.log("Signing Tx with provider: ", provider);
        if (provider === "X-Wallet") {
            const resp = await signXWallet(signingObject);
            return resp.signedCmd;
        } else if (provider === "Zelcore") {
            return signZelcore(signingObject);
        }
    };

    //sends local fetch command
    const executeLocal = async (command) => {
        const response = await fetch(`${apiHost}/api/v1/local`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(command),
        });

        const respObject = await response.json();
        console.log(respObject);

        if (
            !respObject ||
            !respObject.result ||
            respObject.result.status !== "success"
        )
            return null;

        return respObject.result.data;
    };

    //makes local executable command
    const prepareLocal = (pactCod) => {
        let command = Pact.api.prepareExecCmd(
            [],
            new Date().toISOString(),
            pactCod,
            {},
            Pact.lang.mkMeta(
                "",
                pactChainId,
                pactGasPrice,
                pactGasLimit,
                Math.floor(Date.now() / 1000),
                86400
            ),
            pactNetworkId
        );
        return command;
    };

    //get price for nft token
    const get_NFT_WL_price = async (tokenName) => {
        let pactCod = `(${CONTRACT_NAME}.get-mint-price-wl "${tokenName}")`;
        const command = await prepareLocal(pactCod);
        const result = await executeLocal(command);
        return result;
    };

    //get price for nft token
    const get_NFT_price = async (tokenName) => {
        let pactCod = `(${CONTRACT_NAME}.get-mint-price "${tokenName}" "${account}")`;
        const command = await prepareLocal(pactCod);
        const result = await executeLocal(command);
        return result;
    };

    //checks if account is Active and White Listed
    const check_WLA_Account = async (tokenName) => {
        let pactCod = `(${CONTRACT_NAME}.is-active-wl-account "${tokenName}" "${account}")`;
        const command = await prepareLocal(pactCod);
        const result = await executeLocal(command);
        return result;
    };

    //checks if account is able for Token sale may be
    const check_WL_Sale = async (tokenName) => {
        let pactCod = `(${CONTRACT_NAME}.is-wl-sale "${tokenName}")`;
        const command = await prepareLocal(pactCod);
        const result = await executeLocal(command);
        return result;
    };

    //mint token
    const mintToken = async (price, tokenName) => {
        const userPubKey = account.startsWith("k:")
            ? account.slice(2)
            : account;

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
        const chainId = pactChainId;
        const networkId = pactNetworkId;
        const cmd = {
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

        const signingObject = {
            sender: cmd.account,
            chainId,
            gasPrice: pactGasPrice,
            gasLimit: pactGasLimit,
            ttl: 28800,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            signingPubKey: userPubKey,
            networkId,
        };

        //add UI loader here

        try {
            const signedCmd = await sign(provider, signingObject);
            const response = await Pact.wallet.sendSigned(signedCmd, apiHost);
            console.log(response);
            const requestKey = response.requestKeys[0];
            //wait until transaction is being processed (update status on UI ELEMENT)
            setMintStatus("Transaction is Pending, Request Key:" + requestKey);
            const listenCmd = {
                listen: requestKey,
            };
            setIsMinting(false);
            setPending(true);
            setShowTx(true);
            Pact.fetch
                .listen(listenCmd, apiHost)
                .then(() => {
                    setMintStatus(
                        "Transaction Completed, Request Key is : " + requestKey
                    );
                    setPending(false);
                })
                .catch(() => {
                    toast.error("Transaction was rejected");
                    setPending(false);
                    setShowTx(false);
                });
        } catch (error) {
            toast.error("Failed to mint a new token");
            console.log(error);
            setIsMinting(false);
        }
    };

    const getTokenCount = async (tname, tnamespaceName) => {
        let command = prepareLocal(
            `(marmalade.ledger.get-balance "${tname}" "${tnamespaceName}" )`
        );
        const result = await executeLocal(command);
        if (!result) return 0;
        return result;
    };

    const getNftTokenCount = async () => {
        const resp = await getTokenCount(
            "t:mintit-creator-access-pass",
            "m:free.doc-nft-mint:mintit-creator-access-pass"
        );
        setNftTokenCount(resp);
    };
    const getBondTokenCount = async () => {
        const resp = await getTokenCount(
            "t:doc-bond-nft",
            "m:free.doc-nft-mint:doc-bond-nft"
        );

        setBondTokenCount(resp);
    };

    const mintNFT = async (tname) => {
        setIsMinting(true);
        //to check if white listed token for sale
        setMintStatus("Checking if token is white listed for sale");
        const isSaleWL = await check_WL_Sale(tname);

        if (isSaleWL == null) {
            toast.error("Transaction Failed wl!");
            setIsMinting(false);
            return;
        }

        if (isSaleWL) {
            //get mint token white listed price
            setMintStatus("Getting Token WL Price");
            const mintWlPrice = await get_NFT_WL_price(tname);

            //to check if white listed active account
            setMintStatus("Checking whitelist limit");
            const accountStatus = await check_WLA_Account(tname);

            if (accountStatus == null) {
                toast.error("Transaction Failed!");
                setIsMinting(false);
                return;
            }
            if (accountStatus) {
                setMintStatus("Minting NTF Token");
                mintToken(mintWlPrice, tname);
            } else {
                toast.error(
                    "MINT ERROR: Either your account is not whitelisted or the whitelist limit has reached."
                );
                setIsMinting(false);
            }
        } else {
            //get mint token price
            setMintStatus("Getting Token Price");
            const mintPrice = await get_NFT_price(tname);
            console.log("mint :" + mintPrice);
            setMintStatus("Minting NTF Token");
            mintToken(mintPrice, tname);
        }
    };

    return (
        <div className="container">
            <div className={styles.mint}>
                {pending && (
                    <h1 className={styles.text2}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden"></span>
                        </Spinner>
                    </h1>
                )}
                {true && (
                    <h1 className={styles.text4}>
                        <p>{mintStatus}</p>
                    </h1>
                )}
                <h1 className={styles.text1}>
                    <span>MINT AN NFT</span>
                </h1>
                {isMinting ? (
                    <div className="row d-flex justify-content-center text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">
                                {mintStatus}
                            </span>
                        </Spinner>
                        <p className="pt-4">{mintStatus}</p>
                    </div>
                ) : (
                    <div className="row">
                        <Anchor
                            path="/collections/acp"
                            className="rn-collection-inner-one"
                        >
                            <div
                                className="col-md-5"
                                style={{ padding: "44px" }}
                            >
                                <video
                                    className={styles.videoNFT}
                                    src="/videos/product.mp4"
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                />
                                <div className="text-center my-3">
                                    <div>150 KDA</div>
                                    <div>Alpha Creator Pass</div>
                                </div>
                                <p className={styles.text2}>
                                    {nftTokenCount}
                                    /1000 AVAILABLE
                                </p>
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "26px",
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            mintNFT(
                                                "mintit-creator-access-pass"
                                            )
                                        }
                                        className="btn btn-small btn-primary"
                                    >
                                        MINT IT
                                    </button>
                                </div>
                            </div>
                        </Anchor>
                        <Anchor
                            path="/collections/docbond"
                            className="rn-collection-inner-one"
                        >
                            <div
                                className="col-md-5 offset-2"
                                style={{ padding: "44px" }}
                            >
                                <div className={styles.cardWrapper}>
                                    <Image
                                        src="/images/token.png"
                                        width={500}
                                        height={500}
                                        alt="frame"
                                    />
                                </div>
                                <div className="text-center my-3">
                                    <div>250 KDA</div>
                                    <div>Doc Bond</div>
                                </div>
                                <p className={styles.text2}>
                                    {bondTokenCount}
                                    /1000 AVAILABLE
                                </p>
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "26px",
                                    }}
                                >
                                    <button
                                        onClick={() => mintNFT("doc-bond-nft")}
                                        className="btn btn-small btn-primary"
                                    >
                                        MINT IT
                                    </button>
                                </div>
                            </div>
                        </Anchor>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mint;
