import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { IDType, ImageType } from "@utils/types";

const ActivityArea = ({ className, space, data }) => {
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
                        <div className="text-center">
                            <h3>Latest NFT Activity</h3>
                        </div>
                        <div className="box-table table-responsive">
                            <table className="table upcoming-projects">
                                <thead>
                                    <tr>
                                        <th>
                                            <span></span>
                                        </th>
                                        <th>
                                            <span>Item</span>
                                        </th>
                                        <th>
                                            <span>Price</span>
                                        </th>
                                        <th>
                                            <span>Quantity</span>
                                        </th>
                                        <th>
                                            <span>From</span>
                                        </th>
                                        <th>
                                            <span>To</span>
                                        </th>
                                        <th>
                                            <span>Time</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="activity">
                                    {data.activityData?.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                index % 2 === 0
                                                    ? "color-light"
                                                    : ""
                                            }
                                        >
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="product-wrapper d-flex align-items-center px-3">
                                                        {item.status ===
                                                            "Sale" && (
                                                            <Image
                                                                src="/images/activity/sale.png"
                                                                alt="Nft_Profile"
                                                                width={30}
                                                                height={30}
                                                                layout="fixed"
                                                            />
                                                        )}

                                                        {item.status ===
                                                            "Mint" && (
                                                            <Image
                                                                src="/images/activity/mint.png"
                                                                alt="Nft_Profile"
                                                                width={30}
                                                                height={30}
                                                                layout="fixed"
                                                            />
                                                        )}
                                                    </div>
                                                    <span>{item.status}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <Anchor path="/author">
                                                    <div className="d-flex">
                                                        <div className="mx-1">
                                                            <Image
                                                                src={
                                                                    item.image
                                                                        .src
                                                                }
                                                                width={45}
                                                                height={45}
                                                                alt={
                                                                    item.collectionName
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <span>
                                                                    {
                                                                        item.collectionName
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span>
                                                                    {item.nftId}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Anchor>
                                            </td>
                                            <td>
                                                <div className="d-flex algin-items-center">
                                                    <div className="p-1">
                                                        <Image
                                                            src="/images/logo/kadena.png"
                                                            width={15}
                                                            height={15}
                                                            alt="kadena"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span>
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>{item.quantity}</span>
                                            </td>
                                            <td>
                                                <Anchor path="/author">
                                                    <span>{item.from}</span>
                                                </Anchor>
                                            </td>
                                            <td>
                                                <Anchor path="/author">
                                                    <span>{item.to}</span>
                                                </Anchor>
                                            </td>
                                            <td>
                                                <span>{item.time}</span>
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

ActivityArea.propTypes = {
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
ActivityArea.defaultProps = {
    space: 1,
};

export default ActivityArea;
