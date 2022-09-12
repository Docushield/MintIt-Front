import { useState, useEffect, useCallback } from "react";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@components/collection";
import Pagination from "@components/pagination-02";
import { CollectionType, SectionTitleType } from "@utils/types";

const categories = [
    {
        name: "All",
        key: "nav-home",
    },
    {
        name: "Trending",
        key: "nav-trending",
    },
    {
        name: "Art",
        key: "nav-art",
    },
    {
        name: "Collectables",
        key: "nav-collectables",
    },
    {
        name: "Music",
        key: "nav-music",
    },
    {
        name: "Gaming",
        key: "nav-gaming",
    },
    {
        name: "Utility",
        key: "nav-utility",
    },
    {
        name: "Sports",
        key: "nav-sports",
    },
    {
        name: "Photography",
        key: "nav-photography",
    },
];

const POSTS_PER_PAGE = 8;

const CollectionArea = ({ className, space, id, data }) => {
    const [collections, setCollections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(data.collections.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
                <Nav className="product-tab-nav">
                    <div className="nav">
                        {categories.map((category) => (
                            <Nav.Link
                                as="button"
                                key={category.key}
                                eventKey={category.key}
                            >
                                {category.name}
                            </Nav.Link>
                        ))}
                    </div>
                </Nav>
                <div className="row g-5">
                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                        >
                            <Collection
                                title={collection.title}
                                total_item={collection.total_item}
                                path="/mycollection"
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
