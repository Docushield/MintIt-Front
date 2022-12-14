import PropTypes from "prop-types";
import clsx from "clsx";
import ShareDropdown from "../share-dropdown";

const ProductTitle = ({ className, id }) => (
    <div className={clsx("pd-title-area", className)}>
        <h4 className="title">{id}</h4>
        <div className="pd-react-area">
            {/* <div className="heart-count">
                <i className="feather-heart" />
                <span>{likeCount}</span>
            </div> */}
            <div className="count">
                <ShareDropdown />
            </div>
        </div>
    </div>
);

ProductTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    likeCount: PropTypes.number,
};

ProductTitle.defaultProps = {
    likeCount: 0,
};

export default ProductTitle;
