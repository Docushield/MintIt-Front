import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import moment from "moment/moment";

const HistoryTabContent = ({ history }) => (
    <div className="box-table table-responsive">
        <table className="table upcoming-projects ">
            <thead className="token-history-header">
                <tr>
                    <th>
                        <span>Item</span>
                    </th>
                    <th>
                        <span>Price</span>
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
            <tbody className="token-history">
                {history?.map((item, index) => (
                    <tr
                        key={item.id}
                        className={index % 2 === 0 ? "color-light" : ""}
                    >
                        <td>
                            <div className="d-flex align-items-center">
                                <div className="product-wrapper d-flex align-items-center px-3">
                                    {item.status === "reveal" && (
                                        <Image
                                            src="/images/activity/sale.png"
                                            alt="Nft_Profile"
                                            width={30}
                                            height={30}
                                            layout="fixed"
                                        />
                                    )}

                                    {item.status === "mint" && (
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
                                    <span>{item.price}</span>
                                </div>
                            </div>
                        </td>

                        <td>
                            <Anchor path="#">
                                <span>
                                    {item.from && item.from.slice(0, 8) + "..."}
                                </span>
                            </Anchor>
                        </td>
                        <td>
                            <Anchor path="#">
                                <span>
                                    {item.to && item.to.slice(0, 8) + "..."}
                                </span>
                            </Anchor>
                        </td>
                        <td>
                            <span>
                                {moment(Date(item.time)).format(
                                    "MM-DD-YYYY/hh:mm"
                                )}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

HistoryTabContent.propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({})),
};

export default HistoryTabContent;
