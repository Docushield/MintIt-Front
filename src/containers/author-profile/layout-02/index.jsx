import React, { useRef, useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
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
import ReactPaginate from "react-paginate";

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
    const POSTS_PER_PAGE = 21;
    const [myTokens, setMyTokens] = useState(
        data.products.slice(0, POSTS_PER_PAGE)
    );
    const numberOfPages = Math.ceil(data.products.length / POSTS_PER_PAGE);
    const paginationHandler = (event) => {
        const start = event.selected * POSTS_PER_PAGE;
        setMyTokens(data.products.slice(start, start + POSTS_PER_PAGE));
    };

    // NOTE : below commented code can be used for filtering and sorting
    // const appDispatch = useDispatch();
    // const connected = useSelector((state) => state.wallet.connected);
    // const onSaleProducts = shuffleArray(data.products).slice(0, 10);
    // const createdProducts = shuffleArray(data.products).slice(0, 10);
    // const collections = shuffleArray(data.collections).slice(0, 10);
    // const likedProducts = shuffleArray(data.products).slice(0, 10);
    // const filterRef = useRef(null);
    // const [state, dispatch] = useReducer(reducer, {
    //     filterToggle: false,
    //     products: data.products || [],
    //     inputs: { price: [0, 100] },
    // });
    // const filterHandler = () => {
    //     dispatch({ type: "FILTER_TOGGLE" });
    //     if (!filterRef.current) return;
    //     slideToggle(filterRef.current);
    // };
    // useEffect(() => {
    //     filterHandler();
    // }, [filterRef]);

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
                                        style={{ width: "100%" }}
                                    >
                                        {/* <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            On Sale
                                        </Nav.Link> */}
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-owned"
                                        >
                                            My NFTs
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-others"
                                        >
                                            ACP & BOND
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <TabContent className="tab-content rn-bid-content">
                        <TabPane eventKey="nav-others">
                            <div className="row g-5 d-flex">
                                {data.others.length > 0 ? (
                                    data.others?.map((prod, i) => (
                                        <div
                                            key={i}
                                            className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                        >
                                            <div className="collection-wrapper">
                                                {prod.Collection !=
                                                "MintIt Creator Access Pass" ? (
                                                    <div className="collection-big-thumbnail">
                                                        <video
                                                            style={{
                                                                width: "100%",
                                                                padding: "5%",
                                                                borderRadius:
                                                                    "10%",
                                                            }}
                                                            src={`https://ipfs.io/ipfs/${prod.uri.data}`}
                                                            autoPlay
                                                            playsInline
                                                            muted
                                                            loop
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="collection-big-thumbnail">
                                                        <Image
                                                            src={`https://ipfs.io/ipfs/${prod.uri.data}`}
                                                            alt={"Nft_Profile"}
                                                            width={507}
                                                            height={339}
                                                        />
                                                    </div>
                                                )}
                                                <div className="collection-deg">
                                                    <h6
                                                        className="title"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {prod.datum.collection}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="row text-center mt-5 pt-5">
                                        <p>No Tokens to show</p>
                                    </div>
                                )}
                            </div>
                        </TabPane>
                        <TabPane eventKey="nav-owned">
                            {myTokens.length > 0 ? (
                                <div className="row g-5 d-flex">
                                    {myTokens?.map(
                                        (prod) => (
                                            console.log(),
                                            (
                                                <div
                                                    key={prod.id}
                                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                                >
                                                    <Product
                                                        overlay
                                                        placeBid
                                                        title={
                                                            prod[
                                                                "collection-name"
                                                            ]
                                                        }
                                                        slug={prod[
                                                            "collection-name"
                                                        ]
                                                            .replace(/ /g, "-")
                                                            .toLowerCase()}
                                                        hash={
                                                            prod["content-hash"]
                                                        }
                                                        latestBid={
                                                            prod.latestBid
                                                        }
                                                        //dummy data
                                                        price={{
                                                            amount: "",
                                                            currency: "KDA",
                                                        }}
                                                        likeCount={
                                                            prod.likeCount
                                                        }
                                                        auction_date={
                                                            prod.auction_date
                                                        }
                                                        image={{
                                                            src: prod.revealed
                                                                ? `https://ipfs.io/ipfs/${prod["content-uri"].data}`
                                                                : "/images/collection/placeholder.png",
                                                        }}
                                                        authors={prod.authors}
                                                        bitCount={prod.bitCount}
                                                        index={
                                                            prod.index ||
                                                            (prod["mint-index"]
                                                                ? prod[
                                                                      "mint-index"
                                                                  ].int
                                                                : "")
                                                        }
                                                    />
                                                </div>
                                            )
                                        )
                                    )}
                                    <Pagination
                                        currentPage={currentPage}
                                        numberOfPages={numberOfPages}
                                        onClick={paginationHandler}
                                    />
                                </div>
                            ) : (
                                <div className="row text-center mt-5">
                                    <p>No NFTs to show</p>
                                </div>
                            )}
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
            <nav
                className={clsx("pagination-wrapper", className)}
                aria-label="Page navigation example"
            >
                <ReactPaginate
                    breakLabel={<i className="feather-more-horizontal" />}
                    nextLabel="Next"
                    onPageChange={paginationHandler}
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
