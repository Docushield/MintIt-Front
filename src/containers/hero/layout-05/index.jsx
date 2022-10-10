import PropTypes from "prop-types";
import Button from "@ui/button";
import Product from "@components/product/layout-01";
import { ButtonType, ProductType } from "@utils/types";
import ShareDropdown from "@components/share-dropdown";
import ProductBid from "@components/product-bid";
import Image from "next/image";
import Anchor from "@ui/anchor";

const HeroArea = ({ data }) => (
    <div className="slider-style-5 rn-section-gapTop">
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-6 order-2 order-lg-1 mt_md--30 mt_sm--30">
                    <div className="banner-left-content">
                        {data?.badge && (
                            <span
                                className="title-badge"
                                data-sal="slide-up"
                                data-sal-delay="150"
                                data-sal-duration="800"
                            >
                                {data.badge}
                            </span>
                        )}

                        <h2
                            className="title"
                            data-sal="slide-up"
                            data-sal-delay="200"
                            data-sal-duration="800"
                            dangerouslySetInnerHTML={{ __html: data?.title }}
                        />
                        <p
                            className="banner-disc-one"
                            data-sal="slide-up"
                            data-sal-delay="250"
                            data-sal-duration="800"
                            dangerouslySetInnerHTML={{
                                __html: data?.description,
                            }}
                        />
                        {/* to hide getting stated button */}
                        {/* {data?.buttons && (
                            <div className="button-group">
                                {data.buttons.map(({ id, content, ...btn }) => (
                                    <Button
                                        key={id}
                                        data-sal="slide-up"
                                        data-sal-delay="300"
                                        data-sal-duration="800"
                                        {...btn}
                                    >
                                        {content}
                                    </Button>
                                ))}
                            </div>
                        )} */}
                    </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2">
                    <div className="row g-5">
                        <div className="col-lg-6 col-md-6">
                            <div className="product-style-one">
                                <div className="card-thumbnail">
                                    <Anchor path={`/collections/acp`}>
                                        <video
                                            style={{ width: "240px" }}
                                            src="/videos/product.mp4"
                                            autoPlay
                                            playsInline
                                            muted
                                            loop
                                        />
                                    </Anchor>
                                </div>
                                <div className="product-share-wrapper">
                                    <span className="product-name">
                                        Collection Name
                                    </span>
                                    <ShareDropdown />
                                </div>
                                <Anchor path={`/collections/acp`}>
                                    <span className="product-name">
                                        Alpha Creator Pass
                                    </span>
                                </Anchor>
                                <ProductBid price="150KDA" />
                                <a
                                    href="/collections/acp"
                                    className="viewbtn connectBtn btn btn-small btn-primary"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product-style-one">
                                <div className="card-thumbnail">
                                    <Anchor path={`/collections/docbond`}>
                                        <Image
                                            src="/images/token.png"
                                            alt={"NFT_portfolio"}
                                            width={533}
                                            height={533}
                                        />
                                    </Anchor>
                                </div>
                                <div className="product-share-wrapper">
                                    <span className="product-name">
                                        Collection Name
                                    </span>
                                    <ShareDropdown />
                                </div>
                                <Anchor path={`/collections/docbond`}>
                                    <span className="product-name">
                                        Doc Bond
                                    </span>
                                </Anchor>
                                <ProductBid price="150KDA" />
                                <a
                                    href="/collections/docbond"
                                    className="viewbtn connectBtn btn btn-small btn-primary"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

HeroArea.propTypes = {
    data: PropTypes.shape({
        badge: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttons: PropTypes.arrayOf(ButtonType),
        products: PropTypes.arrayOf(ProductType),
    }),
};
export default HeroArea;
