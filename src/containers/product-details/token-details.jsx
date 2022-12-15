import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import BidTab from "@components/product-details/bid-tab";
import DescriptionDropdown from "@components/product-details/DescriptionDropdown";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { toggleConnectWalletDialog } from "src/store/wallet.module";
import { setCurrentToken, toggleTokenSaleDialog } from "src/store/token.module";

const TokenDetailsArea = ({
    space,
    className,
    product,
    slug,
    collection,
    userAccount,
}) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(product["current-owner"]);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 4000);
    };

    useEffect(() => {
        dispatch(setCurrentToken(product));
    }, [product]);

    const onSale = () => {
        if (connected) {
            dispatch(toggleTokenSaleDialog());
        } else {
            dispatch(toggleConnectWalletDialog());
        }
    };

    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <GalleryTab
                                url={
                                    product.revealed
                                        ? `https://ipfs.io/ipfs/${product["content-uri"].data}`
                                        : "/images/collection/placeholder.png"
                                }
                            />
                            <DescriptionDropdown collection={collection} />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle
                                id={
                                    collection["name"] +
                                    " #" +
                                    product["mint-index"].int
                                }
                            />
                            <h6 className="title-name">
                                Owner:{" "}
                                <Button
                                    size="small"
                                    color="primary-alta"
                                    onClick={handleCopy}
                                >
                                    <div className="wallet-address-wrapper">
                                        <div>
                                            {product["current-owner"].slice(
                                                0,
                                                17
                                            )}
                                            ...
                                            {product["current-owner"].slice(
                                                -15
                                            )}
                                        </div>
                                        <div className="copy-icon-wrapper">
                                            <Image
                                                src={
                                                    !isCopied
                                                        ? "/images/icons/copy.svg"
                                                        : "/images/icons/checked.svg"
                                                }
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    </div>
                                </Button>
                            </h6>
                            {/* <Button onClick={onSale}>{userAccount == product["current-owner"] ? "Sale NFT Now" : "Purchase NFT"}</Button> */}
                            <div className="catagory-collection items-center">
                                {/*                             <div className="mx-2">
                                <Button
                                    size="small"
                                    color="primary-alta"
                                    path="#"
                                >
                                    Listed: Yes/No
                                </Button>
                            </div>*/}
                                {/* <div className="mx-2">
                                <Button
                                    size="small"
                                    color="primary-alta"
                                    path="#"
                                >
                                    Price: 20 $KDA
                                </Button>
                            </div> */}
                            </div>
                            {/* <Button color="primary" path="#">
                            Buy Now
                        </Button> */}
                            <div className="rn-bid-details">
                                <BidTab
                                    bids={product?.bids}
                                    owner={product.owner}
                                    creator={collection?.creator}
                                    properties={product.spec.value.attributes}
                                    spec={product.spec}
                                    history={product?.history}
                                    slug={slug}
                                    collection={collection}
                                />
                                {/* <PlaceBet
                                highest_bid={product.highest_bid}
                                auction_date={product?.auction_date}
                            /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

TokenDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({}),
};

TokenDetailsArea.defaultProps = {
    space: 1,
};

export default TokenDetailsArea;
