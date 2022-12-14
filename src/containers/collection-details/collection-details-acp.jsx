import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import ShareDropdown from "@components/share-dropdown";
import ShareModal from "@components/modals/share-modal";
import Button from "@components/ui/button";
import { formatDate } from "@utils/date";
import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentCollection,
    toggleMintConfirmDialog,
} from "src/store/collection.module";
import { toggleConnectWalletDialog } from "src/store/wallet.module";
import WalletAddress from "@components/wallet-address";

const CollectionDetailsIntroArea = ({ className, space, data, count }) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);

    useEffect(() => {
        dispatch(setCurrentCollection(data));
    }, [data]);

    const onMint = () => {
        if (connected) {
            dispatch(toggleMintConfirmDialog());
        } else {
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
                <Image
                    src={data.bannerImageUrl}
                    alt={data.name}
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority
                />
            </div>
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
                style={{ marginTop: "-80px" }}
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
                                    </div>
                                </div>
                            </div>
                            <p style={{ textAlign: "justify" }}>
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
                                            <div>{data["mint-price"]} KDA</div>
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
                                            <div>Instant</div>
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
                <div className="mint-status-box">{data.type} Round</div>
                <div className="mint-status-box">
                    Mint: {data["mint-price"]} KDA
                </div>
                <div className="mint-status-box">Remaining: {count}</div>
                {data.status === "success" && (
                    <Button className="ms-4" onClick={onMint}>
                        Mint Now
                    </Button>
                )}
            </div>

            <div className="container">
                <div className="row padding-tb-50 align-items-center d-flex">
                    <div className="col-lg-6">
                        {data.slug == "acp" && (
                            <div style={{ width: "100%" }}>
                                <video
                                    style={{ width: "100%" }}
                                    src="/videos/product.mp4"
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

CollectionDetailsIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
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
