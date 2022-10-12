import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import BidTab from "@components/product-details/bid-tab";
import ShareDropdown from "@components/share-dropdown";
import DescriptionDropdown from "@components/product-details/DescriptionDropdown";
import WalletAddress from "@components/wallet-address";

const TokenDetailsArea = ({ space, className, product, slug, collection }) => (
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
                        <DescriptionDropdown />
                    </Sticky>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                    <div className="rn-pd-content-area">
                        <ProductTitle
                            id={
                                product.revealed
                                    ? product["name"]
                                    : product["collection-name"]
                            }
                        />
                        <h6 className="title-name">
                            Owner:{" "}
                            <Button
                                size="small"
                                color="primary-alta"
                                path="/profile"
                            >
                                <WalletAddress
                                    address={product.creator}
                                    length={17}
                                    lastLength={15}
                                />
                            </Button>
                        </h6>
                        <div className="catagory-collection items-center">
                            <div className="mx-2">
                                <Button
                                    size="small"
                                    color="primary-alta"
                                    path="#"
                                >
                                    Listed: Yes/No
                                </Button>
                            </div>
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

TokenDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({}),
};

TokenDetailsArea.defaultProps = {
    space: 1,
};

export default TokenDetailsArea;
