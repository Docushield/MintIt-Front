import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import ShareDropdown from "@components/share-dropdown";
import ShareModal from "@components/modals/share-modal";
import Button from "@components/ui/button";
import Product from "@components/product/layout-01";
import { formatDate } from "@utils/date";
import Nav from "react-bootstrap/Nav";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentCollection,
    toggleMintConfirmDialog,
} from "src/store/collection.module";
import { toggleConnectWalletDialog } from "src/store/wallet.module";
import WalletAddress from "@components/wallet-address";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import { pactLocalFetch } from "@utils/pactLocalFetch";
import ReactPaginate from "react-paginate";

const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "https://the-backend.fly.dev";

const getIndex = (token) => token.index || token["mint-index"].int;

const checkStatus = async () => {
    const response = await fetch(`${baseURL}/api/collections/get-status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (response.status == 400) {
        return false;
    } else if (response.status == 200) {
        const resJson = await response.json();
        return resJson.minting;
    }
};

const countTokens = async (slug, account) => {
    const res = await pactLocalFetch(
        `(${smartContract}.count-nfts-by-owner-in-collection "${slug}" "${account}")`
    );
    if (res.result && res.result.data) {
        return res.result.data;
    } else {
        return 0;
    }
};

const CollectionDetailsIntroArea = ({
    className,
    space,
    data,
    tokens,
    account,
}) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    const currentTime = new Date().toLocaleString();
    const revealTime = new Date(data["reveal-at"]).toLocaleString();
    const premintTime = new Date(data["premint-ends"]).toLocaleString();

    const sorted_tokens = tokens.sort((a, b) => getIndex(a) - getIndex(b));
    const POSTS_PER_PAGE = 21;
    const [currentPage, setCurrentPage] = useState(1);
    const [disableBTN, setDisableBTN] = useState(false);
    const [all_tokens, setAllTokens] = useState(
        sorted_tokens.slice(0, POSTS_PER_PAGE)
    );

    const numberOfPages = Math.ceil(sorted_tokens.length / POSTS_PER_PAGE);

    const handlePageClick = (event) => {
        const start = event.selected * POSTS_PER_PAGE;
        setAllTokens(sorted_tokens.slice(start, start + POSTS_PER_PAGE));
    };

    useEffect(() => {
        dispatch(setCurrentCollection(data));
    }, [data]);

    const onMint = async () => {
        setDisableBTN(true);
        //checks if user can mint more tokens
        let account_total = await countTokens(data.name, account);
        console.log(
            "token by this K = " +
                account_total +
                "and limit is = " +
                data.mintingLimit
        );

        //checks if minting is allowed by admin
        let status = await checkStatus();
        if (!status) {
            toast.error("Minting is disabled for a while, try again later.");
            setDisableBTN(false);
            return;
        }
        if (data.mintingLimit != null) {
            if (account_total >= data.mintingLimit) {
                toast.error(
                    `Sorry, You can only mint ${data.mintingLimit} tokens for this collection.`
                );
                setDisableBTN(false);
                return;
            }
        }
        if (connected) {
            setDisableBTN(false);
            dispatch(toggleMintConfirmDialog());
        } else {
            setDisableBTN(false);
            dispatch(toggleConnectWalletDialog());
        }
    };

    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <div className="rn-author-bg-area position-relative ptb--150">
                {data.bannerImageUrl && (
                    <Image
                        src={data.bannerImageUrl}
                        alt={data.name}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                    />
                )}
            </div>
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
                style={{ marginTop: "-80px", overflow: "hidden" }}
            >
                <div className="container">
                    <div className="row padding-tb-50 d-flex">
                        <div className="col-lg-6">
                            <div className="author-wrapper">
                                <div className="author-inner">
                                    {data.imageUrl && (
                                        <div className="user-thumbnail">
                                            <Image
                                                src={data.imageUrl}
                                                alt={data.name}
                                                width={140}
                                                height={140}
                                                layout="fixed"
                                            />
                                        </div>
                                    )}

                                    <div className="rn-author-info-content">
                                        <div className="row my-5">
                                            <div className="col-10">
                                                <h4 className="title">
                                                    {data.name}
                                                </h4>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="social-follw mb--0"
                                                    >
                                                        <i className="feather-twitter" />
                                                        <span className="user-name">
                                                            {data.twitter}
                                                        </span>
                                                    </a>
                                                    <div className="author-button-area mt--0 ml--10">
                                                        <div className="count at-follw">
                                                            <ShareDropdown />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {data.size == data.numMinted ? (
                                            <Button className="mt--15">
                                                Sold Out
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={onMint}
                                                className="mt--15"
                                                disabled={disableBTN}
                                            >
                                                {disableBTN ? (
                                                    <div
                                                        className={
                                                            "spinner-border"
                                                        }
                                                        role="status"
                                                    ></div>
                                                ) : (
                                                    "Mint Now"
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p
                                style={{
                                    textAlign: "justify",
                                    paddingTop: "50px",
                                }}
                            >
                                {data.description}
                            </p>
                        </div>
                        <div
                            className="col-lg-5 offset-lg-1"
                            style={{ marginTop: "-100px" }}
                        >
                            <div className="row mb-5 col_textbox d-flex align-items-center">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="status-box address">
                                            <div>Creator</div>
                                            <div>
                                                <WalletAddress
                                                    address={data.creator}
                                                    length={17}
                                                    lastLength={15}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="status-box">
                                            <div>Supply</div>
                                            <div>{data.size}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="status-box">
                                            <div>Price</div>
                                            <div>
                                                {currentTime < premintTime
                                                    ? data["premint-price"]
                                                    : data["mint-price"]}{" "}
                                                KDA
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="status-box">
                                            <div>Type</div>
                                            <div>{data.type}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="status-box">
                                            <div>Reveals at </div>
                                            <div>
                                                {currentTime < revealTime
                                                    ? formatDate(
                                                          data["reveal-at"],
                                                          "MMMM Do, h:mm:ss A"
                                                      )
                                                    : "Instant"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="status-box">
                                            <div>Mint Starts</div>
                                            <div>
                                                {formatDate(
                                                    data["mint-starts"],
                                                    "MMMM Do, h:mm:ss A"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="status-box">
                                            <div>Premint Ends</div>
                                            <div>
                                                {formatDate(
                                                    data["premint-ends"],
                                                    "MMMM Do, h:mm:ss A"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex my-4 align-items-center">
                <div className="mint-status-box">Type: {data.type}</div>
                <div className="mint-status-box">
                    Mint:
                    {currentTime < premintTime
                        ? data["premint-price"]
                        : data["mint-price"]}{" "}
                    KDA
                </div>
                <div className="mint-status-box">
                    Remaining: {data.size - data.numMinted}
                </div>
                {data.status === "success" && (
                    <Button
                        className="ms-4"
                        path={`/collections/${data.slug}/provenance-hash`}
                    >
                        View Provenance
                    </Button>
                )}
            </div>
            <TabContainer defaultActiveKey="nav-all">
                <div className="container">
                    <div className="row g-5 d-flex">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-all"
                                        >
                                            All Minted NFTs
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-sale"
                                        >
                                            NFTs For Sale
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <TabContent className="tab-content rn-bid-content">
                        <TabPane eventKey="nav-all">
                            <div className="row">
                                {all_tokens?.length > 0 ? (
                                    <>
                                        {all_tokens.map((prod) => (
                                            <div
                                                key={prod.id}
                                                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 my-4"
                                            >
                                                <Product
                                                    overlay
                                                    title={
                                                        prod["collection-name"]
                                                    }
                                                    slug={data.slug}
                                                    hash={
                                                        prod["content-hash"] ||
                                                        prod["hash"]
                                                    }
                                                    image={{
                                                        src: prod.revealed
                                                            ? `https://ipfs.io/ipfs/${prod["content-uri"].data}`
                                                            : "/images/collection/placeholder.png",
                                                    }}
                                                    //dummy data
                                                    price={{
                                                        amount: "",
                                                        currency: "KDA",
                                                    }}
                                                    revealed={prod.revealed}
                                                    index={
                                                        prod.index ||
                                                        (prod["mint-index"]
                                                            ? prod["mint-index"]
                                                                  .int
                                                            : "")
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="row text-center">
                                        <p>No tokens to show</p>
                                    </div>
                                )}
                            </div>
                            <nav
                                className={clsx(
                                    "pagination-wrapper",
                                    className
                                )}
                                aria-label="Page navigation example"
                            >
                                <ReactPaginate
                                    breakLabel={
                                        <i className="feather-more-horizontal" />
                                    }
                                    nextLabel="Next"
                                    onPageChange={handlePageClick}
                                    pageCount={numberOfPages}
                                    previousLabel="Previous"
                                    pageClassName="page-item"
                                    activeLinkClassName="active"
                                    disabledLinkClassName="disabled"
                                    previousLinkClassName="page-item prev"
                                    nextLinkClassName="page-item next"
                                    breakLinkClassName="disabled"
                                    className="pagination"
                                    renderOnZeroPageCount={null}
                                />
                            </nav>
                        </TabPane>
                        <TabPane eventKey="nav-sale">
                            <div className="row text-center">
                                {/* show token for sale here */}
                                <p>No tokens to show</p>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </>
    );
};

CollectionDetailsIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    account: PropTypes.string,
    data: PropTypes.shape({
        bannerImageUrl: PropTypes.string,
        createdAt: PropTypes.string,
        creator: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string,
        imageUrl: PropTypes.string,
        "mint-price": PropTypes.number,
        "mint-royalties": PropTypes.object,
        "mint-starts": PropTypes.string,
        name: PropTypes.string,
        "premint-ends": PropTypes.string,
        "premint-whitelist": PropTypes.array,
        "provenance-hash": PropTypes.string,
        "sale-royalties": PropTypes.object,
        size: PropTypes.number,
        slug: PropTypes.string,
        status: PropTypes.string,
        "token-list": PropTypes.array,
        type: PropTypes.string,
        updatedAt: PropTypes.string,
    }),
};
CollectionDetailsIntroArea.defaultProps = {
    space: 1,
};

export default CollectionDetailsIntroArea;
