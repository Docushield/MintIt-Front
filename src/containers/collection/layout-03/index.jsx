import { useState, useEffect, useCallback, useReducer } from "react";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@components/collection";
import Pagination from "@components/pagination-02";
import ProductFilter from "@components/product-filter/layout-01";
import CategoryFilter from "@components/category-filter";
import { CollectionType, SectionTitleType } from "@utils/types";

const POSTS_PER_PAGE = 8;

function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_COLLETIONS":
            return { ...state, collections: action.payload };
        default:
            return state;
    }
}

const CollectionArea = ({ className, space, id, data }) => {
    const itemsToFilter = [...(data.collections || [])];
    const [collections, setCollections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(data.collections.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        collections: data.collections || [],
        inputs: { price: [0, 100] },
    });

    const slectHandler = ({ value }, name) => {
        dispatch({ type: "SET_INPUTS", payload: { [name]: value } });
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

    const filterMethods = (item, filterKey, value) => {
        if (value === "all") return false;
        let itemKey = filterKey;
        if (filterKey === "category") {
            itemKey = "categories";
        }
        if (Array.isArray(item[itemKey])) {
            return !item[itemKey].includes(value);
        }
        if (filterKey === "collection") {
            return item[itemKey].name !== value;
        }
        return item[itemKey] !== value;
    };

    const itemFilterHandler = useCallback(() => {
        let filteredItems = [];

        filteredItems = itemsToFilter.filter((item) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in state.inputs) {
                if (filterMethods(item, key, state.inputs[key])) return false;
            }
            return true;
        });
        dispatch({ type: "SET_COLLECTIONS", payload: filteredItems });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.inputs]);

    useEffect(() => {
        itemFilterHandler();
    }, [itemFilterHandler]);

    const creatorHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setCollections(data.collections.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, data.collections]);

    useEffect(() => {
        creatorHandler();
    }, [currentPage, creatorHandler]);

    return (
        <div
            className={clsx(
                "rn-collection-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            id={id}
        >
            <div className="container">
                {data?.section_title && (
                    <h2 className="text-center mb--50">
                        {data.section_title.title}
                    </h2>
                )}
                {/* <CategoryFilter total={12393102} onClick={slectHandler} /> */}
                {/* <ProductFilter
                    slectHandler={slectHandler}
                    priceHandler={priceHandler}
                    sortHandler={sortHandler}
                    inputs={{
                        price: [0, 100],
                    }}
                /> */}
                <div className="row g-5">
                    {state.collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                        >
                            <Collection
                                title={collection.title}
                                total_item={collection.total_item}
                                path="/mycollection"
                                minted={collection.minted}
                                image={collection.image}
                                thumbnails={collection.thumbnails}
                                profile_image={collection.profile_image}
                                live_date={collection.live_date}
                            />
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div
                        className="col-lg-12"
                        data-sal="slide-up"
                        data-sal-delay="950"
                        data-sal-duration="800"
                    >
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={paginationHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

CollectionArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        collections: PropTypes.arrayOf(CollectionType),
        section_title: SectionTitleType,
    }),
};
CollectionArea.defaultProps = {
    space: 1,
};

export default CollectionArea;
