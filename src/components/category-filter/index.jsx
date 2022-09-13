import PropTypes from "prop-types";
import Nav from "react-bootstrap/Nav";

const categories = [
    {
        name: "All",
        key: "nav-home",
        value: "all",
    },
    {
        name: "Trending",
        key: "nav-trending",
        value: "trending",
    },
    {
        name: "Art",
        key: "nav-art",
        value: "art",
    },
    {
        name: "Collectables",
        key: "nav-collectables",
        value: "collectables",
    },
    {
        name: "Music",
        key: "nav-music",
        value: "music",
    },
    {
        name: "Gaming",
        key: "nav-gaming",
        value: "gaming",
    },
    {
        name: "Utility",
        key: "nav-utility",
        value: "utility",
    },
    {
        name: "Sports",
        key: "nav-sports",
        value: "sports",
    },
    {
        name: "Photography",
        key: "nav-photography",
        value: "photography",
    },
];

const CategoryFilter = ({ total, onClick }) => (
    <Nav className="product-tab-nav">
        <div className="nav align-items-center">
            {categories.map((category) => (
                <Nav.Link
                    as="button"
                    key={category.key}
                    onClick={() =>
                        onClick({ value: category.value }, "category")
                    }
                    eventKey={category.key}
                >
                    {category.name}
                </Nav.Link>
            ))}
            <div>{total || 0} Items</div>
        </div>
    </Nav>
);

CategoryFilter.propTypes = {
    total: PropTypes.number,
    onClick: PropTypes.func,
};

export default CategoryFilter;
