import React, { useRef, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import Product from "@components/product/layout-01";
import ProductFilter from "@components/product-filter/layout-01";
import { ProductType } from "@utils/types";
import { shuffleArray } from "@utils/methods";
import { Button } from "react-bootstrap";
import Collection from "@components/collection";
import { useSelector, useDispatch } from "react-redux";
import FilterButton from "@ui/filter-button";
import { slideToggle } from "@utils/methods";
import Mint from "@components/constant-collections";

function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}

const DublicateCollectionArea = ({ className, data }) => {
    const appDispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);

    const onSaleProducts = shuffleArray(data.products).slice(0, 10);
    const ownedProducts = shuffleArray(data.products).slice(0, 10);
    // const createdProducts = shuffleArray(data.products).slice(0, 10);
    const collections = shuffleArray(data.collections).slice(0, 10);
    const likedProducts = shuffleArray(data.products).slice(0, 10);
    const filterRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        products: data.products || [],
        inputs: { price: [0, 100] },
    });

    const filterHandler = () => {
        dispatch({ type: "FILTER_TOGGLE" });
        if (!filterRef.current) return;
        slideToggle(filterRef.current);
    };

    useEffect(() => {
        filterHandler();
    }, [filterRef]);

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
            <TabContainer defaultActiveKey="nav-owned">
                <div className="container">
                    {/* <div className="col-12 mt_mobile--15 mb--20">
                        <FilterButton
                            open={state.filterToggle}
                            onClick={filterHandler}
                        />
                    </div> */}

                    {/* <ProductFilter
                        ref={filterRef}
                        slectHandler={slectHandler}
                        sortHandler={sortHandler}
                        priceHandler={priceHandler}
                        inputs={{
                            price: [0, 100],
                        }}
                    /> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        {/* <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            On Sale
                                        </Nav.Link> */}
                                        {/* <Nav.Link
                                            as="button"
                                            eventKey="nav-owned"
                                        >
                                            Owned
                                        </Nav.Link> */}
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-owned"
                                        >
                                            My NFTs
                                        </Nav.Link>
                                        {/* <Nav.Link
                                            as="button"
                                            eventKey="nav-liked"
                                        >
                                            Liked
                                        </Nav.Link> */}
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>
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
                        <TabPane eventKey="nav-owned">
                            <div className="row g-5 d-flex">
                                {ownedProducts?.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                    >
                                        <Product
                                            overlay
                                            placeBid
                                            title={prod.name}
                                            slug={prod.slug}
                                            latestBid={prod.latestBid}
                                            price="10"
                                            likeCount={prod.likeCount}
                                            auction_date={prod.auction_date}
                                            image={prod.images?.[0]}
                                            authors={prod.authors}
                                            bitCount={prod.bitCount}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPane>
                        {/* <TabPane eventKey="nav-created">
                            <div className="row g-5 mt--0 d-flex">
                                {collections?.map((collection) => (
                                    <div
                                        key={collection.id}
                                        className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                    >
                                        <Collection
                                            title={collection.name}
                                            total_item={collection.size}
                                            path={`/collections/${collection.slug}`}
                                            minted={collection.numMinted}
                                            image={collection.imageUrl}
                                            thumbnails={collection.thumbnails}
                                            profile_image={
                                                collection.bannerImageUrl
                                            }
                                            live_date={collection["reveal-at"]}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Mint />
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
