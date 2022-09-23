import { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import PlaceBidModal from "@components/modals/placebid-modal";
import Countdown from "@ui/countdown/layout-02";
import { ImageType } from "@utils/types";

const PlaceBet = ({ auction_date, btnColor, className }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div className={clsx("place-bet-area", className)}>
                <div className="rn-bet-create">
                    {auction_date && (
                        <div className="bid-list left-bid">
                            <h6 className="title">Auction has ended</h6>
                            <Countdown className="mt--15" date={auction_date} />
                        </div>
                    )}
                </div>
                <Button
                    color={btnColor || "primary-alta"}
                    className="mt--30"
                    onClick={handleBidModal}
                >
                    Place a Bid
                </Button>
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

PlaceBet.propTypes = {
    highest_bid: PropTypes.shape({
        amount: PropTypes.string,
        bidder: PropTypes.shape({
            name: PropTypes.string,
            image: ImageType,
            slug: PropTypes.string,
        }),
    }),
    auction_date: PropTypes.string,
    btnColor: PropTypes.string,
    className: PropTypes.string,
};

export default PlaceBet;
