import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { IDType, ImageType } from "@utils/types";

const RankingArea = ({ className, space, data }) => {
    return (
        <div
            className={clsx(
                "rn-upcoming-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="table-title-area d-flex align-items-center mb-5">
                            <i className="feather-briefcase" />
                            <h2 className="m-0">Live Stats</h2>
                        </div>
                        <div className="text-center">
                            <h3>Top Collections Stats</h3>
                        </div>
                        <div className="box-table table-responsive">
                            <table className="table upcoming-projects">
                                <thead>
                                    <tr>
                                        <th>
                                            <span>SL</span>
                                        </th>
                                        <th>
                                            <span>Collection</span>
                                        </th>
                                        <th>
                                            <span>Volume</span>
                                        </th>
                                        <th>
                                            <span>24h%</span>
                                        </th>
                                        <th>
                                            <span>7d%</span>
                                        </th>
                                        <th>
                                            <span>Floor Price</span>
                                        </th>
                                        <th>
                                            <span>Owners</span>
                                        </th>
                                        <th>
                                            <span>Items</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="ranking">
                                    {data.ranking?.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                index % 2 === 0
                                                    ? "color-light"
                                                    : ""
                                            }
                                        >
                                            <td>
                                                <span>{index + 1}.</span>
                                            </td>
                                            <td>
                                                <div className="product-wrapper d-flex align-items-center">
                                                    {item?.product?.image
                                                        ?.src && (
                                                        <Anchor
                                                            path={
                                                                item.product
                                                                    .slug
                                                            }
                                                            className="thumbnail"
                                                        >
                                                            <Image
                                                                src={
                                                                    item.product
                                                                        .image
                                                                        .src
                                                                }
                                                                alt="Nft_Profile"
                                                                width={56}
                                                                height={56}
                                                                layout="fixed"
                                                            />
                                                        </Anchor>
                                                    )}

                                                    <span>
                                                        {item.product.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span>{item.volume}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={
                                                        item["24h%"].status ===
                                                        "-"
                                                            ? "color-danger"
                                                            : "color-green"
                                                    }
                                                >
                                                    {item["24h%"].status}
                                                    {item["24h%"].charge}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className={
                                                        item["7d%"].status ===
                                                        "-"
                                                            ? "color-danger"
                                                            : "color-green"
                                                    }
                                                >
                                                    {item["7d%"].status}
                                                    {item["7d%"].charge}
                                                </span>
                                            </td>
                                            <td>
                                                <span>{item.floor_price}</span>
                                            </td>
                                            <td>
                                                <span>{item.owners}</span>
                                            </td>
                                            <td>
                                                <span>{item.items}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RankingArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        ranking: PropTypes.arrayOf(
            PropTypes.shape({
                id: IDType,
                product: PropTypes.shape({
                    title: PropTypes.string,
                    slug: PropTypes.string,
                    image: ImageType,
                }),
                volume: PropTypes.string,
                "24h%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                "7d%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                floor_price: PropTypes.string,
                owners: PropTypes.string,
                items: PropTypes.string,
            })
        ),
    }),
};
RankingArea.defaultProps = {
    space: 1,
};

export default RankingArea;
