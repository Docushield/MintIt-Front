import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import CountdownTimer from "@ui/countdown/layout-01";
import ClientAvatar from "@ui/client-avatar";
import ShareDropdown from "@components/share-dropdown";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";

const Product = ({
    overlay,
    title,
    slug,
    latestBid,
    price,
    likeCount,
    auction_date,
    image,
    bitCount,
    authors,
    placeBid,
    disableShareDropdown,
    hash,
    revealed,
    index,
}) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {image?.src && (
                        <Anchor path={`/collections/${slug}/tokens/${hash}`}>
                            <Image
                                src={image.src}
                                alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {/* {auction_date && <CountdownTimer date={auction_date} />} */}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Buy
                        </Button>
                    )} */}
                </div>
                <div className="product-share-wrapper">
                    {/* <div className="profile-share">
                        {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={client.image}
                            />
                        ))}
                        <Anchor
                            className="more-author-text"
                            path={`/product/${slug}`}
                        >
                            {bitCount}+ Place Bit.
                        </Anchor>
                    </div> */}
                    <span className="product-name">#{index}</span>
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/collections/${slug}/tokens/${hash}`}>
                    <span className="product-name">
                        {title.slice(0, 20) + "..."}
                    </span>
                </Anchor>
                {/* <span className="latest-bid">Highest bid {latestBid}</span> */}
                <a
                    href={`/collections/${slug}/tokens/${hash}`}
                    className="viewbtn connectBtn btn btn-small btn-primary"
                >
                    View
                </a>
                {/* likeCount={likeCount} */}
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

Product.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    latestBid: PropTypes.string,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number,
    auction_date: PropTypes.string,
    image: ImageType.isRequired,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            image: ImageType.isRequired,
        })
    ),
    bitCount: PropTypes.number,
    placeBid: PropTypes.bool,
    disableShareDropdown: PropTypes.bool,
    hash: PropTypes.string,
};

Product.defaultProps = {
    overlay: false,
};

export default Product;
