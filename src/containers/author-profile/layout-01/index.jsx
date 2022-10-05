import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import Product from "@components/product/layout-01";
import ProductFilter from "@components/product-filter/layout-02";
import { ProductType } from "@utils/types";
import { shuffleArray } from "@utils/methods";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const DublicateCollectionArea = ({ className, data }) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);

    const [isConfirm, setIsConfirm] = React.useState(false);
    const onSaleProducts = shuffleArray(data.products).slice(0, 10);
    const ownedProducts = shuffleArray(data.products).slice(0, 10);
    const createdProducts = shuffleArray(data.products).slice(0, 10);
    const likedProducts = shuffleArray(data.products).slice(0, 10);

    const slectHandler = ({ value }, name) => {
        // dispatch({ type: "SET_INPUTS", payload: { [name]: value } });
    };

    const priceHandler = (value) => {
        // dispatch({ type: "SET_INPUTS", payload: { price: value } });
    };

    const sortHandler = ({ value }) => {
        // const sortedProducts = state.products.sort((a, b) => {
        //     if (value === "most-liked") {
        //         return a.likeCount < b.likeCount ? 1 : -1;
        //     }
        //     return a.likeCount > b.likeCount ? 1 : -1;
        // });
        // dispatch({ type: "SET_PRODUCTS", payload: sortedProducts });
    };

    return (
        <div className={clsx("rn-dublicate-collection-area", className)}>
            <div className="container d-flex my-4">
                <div className="mint-status-box">Public Round</div>
                <div className="mint-status-box">Mint: 20 KDA</div>
                <div className="mint-status-box">Remaining: 1029</div>

                <Button
                    className="ms-4"
                    href={`/provenance-hash/${data.author.provenance_hash}`}
                >
                    View Provenance
                </Button>
            </div>
            <TabContainer defaultActiveKey="nav-profile">
                <div className="container">
                    <ProductFilter
                        slectHandler={slectHandler}
                        sortHandler={sortHandler}
                        priceHandler={priceHandler}
                        inputs={{
                            price: [0, 100],
                        }}
                    />
                    <TabContent className="tab-content rn-bid-content">
                        {/* <TabPane className="row d-flex g-5" eventKey="nav-home">
                            {onSaleProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane> */}
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {ownedProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex mt--0"
                            eventKey="nav-contact"
                        >
                            {createdProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        {/* <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-liked"
                        >
                            {likedProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane> */}
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

DublicateCollectionArea.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        products: PropTypes.arrayOf(ProductType),
    }),
};
export default DublicateCollectionArea;
