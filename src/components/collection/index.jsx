import React from "react";
import PropTypes from "prop-types";
import Anchor from "@ui/anchor";
import Image from "next/image";
import { formatUntilLive } from "@utils/date";

const Collection = ({
    title,
    total_item,
    image,
    thumbnails,
    profile_image,
    path,
    live_date,
    onClick,
}) => {
    const [left, setLeft] = React.useState("");

    React.useEffect(() => {
        const timer = setInterval(() => {
            setLeft(formatUntilLive(live_date));
            if (left === "LIVE") {
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Anchor path={path} className="rn-collection-inner-one">
            <div className="collection-wrapper">
                {image?.src && (
                    <div className="collection-big-thumbnail">
                        <Image
                            src={image.src}
                            alt={image?.alt || "Nft_Profile"}
                            width={507}
                            height={339}
                        />
                    </div>
                )}
                {left && <div className="collection-until-live">{left}</div>}
                <div className="collenction-small-thumbnail">
                    {thumbnails?.map((thumb, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={i}>
                            <Image
                                src={thumb?.src}
                                alt={thumb?.alt || "Nft_Profile"}
                                width={164}
                                height={110}
                            />
                        </div>
                    ))}
                </div>
                {profile_image?.src && (
                    <div className="collection-profile">
                        <Image
                            src={profile_image.src}
                            alt={profile_image?.alt || "Nft_Profile"}
                            width={80}
                            height={80}
                        />
                    </div>
                )}

                <div className="collection-deg">
                    <h6 className="title">{title}</h6>
                    <span className="items">{total_item} items</span>
                </div>
            </div>
        </Anchor>
    );
};

Collection.propTypes = {
    title: PropTypes.string.isRequired,
    total_item: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
            .isRequired,
        alt: PropTypes.string,
    }).isRequired,
    thumbnails: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
                .isRequired,
            alt: PropTypes.string,
        }).isRequired
    ).isRequired,
    profile_image: PropTypes.shape({
        src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
            .isRequired,
        alt: PropTypes.string,
    }).isRequired,
    live_date: PropTypes.string,
    onClick: PropTypes.func,
};

export default Collection;
