import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import GalleryTab from "@components/product-details/gallery-tab";
import { ImageType } from "@utils/types";

// Demo Image

const CollectionDetailsArea = ({ space, className, collection }) => (
    <div
        className={clsx(
            "collection-details-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-7 col-md-12 col-sm-12">
                    <Sticky>
                        <GalleryTab images={collection.thumbnails} />
                    </Sticky>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                    <div className="rn-pd-content-area">
                        <img src={collection.image.src} />
                        <h3>{collection.title}</h3>
                        <p>Total: {collection.total_item}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

CollectionDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        id: PropTypes.number,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        total_item: PropTypes.number,
        image: ImageType,
        thumbnails: PropTypes.arrayOf(ImageType),
    }),
};

CollectionDetailsArea.defaultProps = {
    space: 1,
};

export default CollectionDetailsArea;
