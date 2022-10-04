import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import ProductCategory from "@components/product-details/category";
import ProductCollection from "@components/product-details/collection";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";
import { ImageType } from "@utils/types";
import ShareDropdown from "@components/share-dropdown";
import DescriptionDropdown from "@components/product-details/DescriptionDropdown";
import WalletAddress from "@components/wallet-address";

// Demo Image

const ProductDetailsArea = ({ space, className, product }) => (
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
                        <GalleryTab images={product.images} />
                        <DescriptionDropdown />
                    </Sticky>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                    <div className="rn-pd-content-area">
                        <ProductTitle id={product.nft_id} />
                        <h6 className="title-name">
                            Owner:{" "}
                            <Button
                                size="small"
                                color="primary-alta"
                                path="/profile"
                            >
                                <WalletAddress
                                    address={product.owner.address}
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
                            <div className="mx-2">
                                <Button
                                    size="small"
                                    color="primary-alta"
                                    path="#"
                                >
                                    Price: 20 $KDA
                                </Button>
                            </div>
                        </div>
                        <Button color="primary" path="#">
                            Buy Now
                        </Button>
                        <div className="rn-bid-details">
                            <BidTab
                                bids={product?.bids}
                                owner={product.owner}
                                properties={product?.properties}
                                specs={product.specs}
                                history={product?.history}
                            />
                            <PlaceBet
                                highest_bid={product.highest_bid}
                                auction_date={product?.auction_date}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        likeCount: PropTypes.number,
        price: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }).isRequired,
        owner: PropTypes.shape({}),
        collection: PropTypes.shape({}),
        bids: PropTypes.arrayOf(PropTypes.shape({})),
        properties: PropTypes.arrayOf(PropTypes.shape({})),
        tags: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.arrayOf(PropTypes.shape({})),
        highest_bid: PropTypes.shape({}),
        auction_date: PropTypes.string,
        images: PropTypes.arrayOf(ImageType),
    }),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
