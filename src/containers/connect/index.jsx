import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Wallet from "@components/wallet";
import Anchor from "@ui/anchor";

const ConnectArea = ({ className, space }) => (
    <div
        className={clsx(
            "rn-connect-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g mb--50 mb_md--30 mb_sm--30 align-items-center">
                <div
                    className="col-lg-6"
                    data-sal="slide-up"
                    data-sal-delay="150"
                    data-sal-duration="800"
                >
                    <h3 className="connect-title">
                        Getting Started with a Kadena Wallet
                    </h3>
                    <p className="connect-td">
                        Create a Wallet, Deposit Funds, and Connect it to the
                        MINT-IT Website.{" "}
                    </p>
                </div>
                <div
                    className="col-lg-6"
                    data-sal="slide-up"
                    data-sal-delay="200"
                    data-sal-duration="800"
                >
                    <p className="wallet-bootm-disc">
                        Currently our platform supports X-Wallet and Zelcore
                        Kadena wallet providers.
                    </p>
                </div>
            </div>
            <div className="row g-5">
                <div
                    className="col-lg-6"
                    data-sal="slide-up"
                    data-sal-delay="150"
                    data-sal-duration="500"
                >
                    <div className="connect-thumbnail">
                        <div className="left-image">
                            <Image
                                src="/images/wallet/wallet-connect.png"
                                alt="Nft_Profile"
                                width={670}
                                height={576}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row g-5">
                        <div
                            className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            <Wallet
                                imgSrc="/images/wallet/zelcore.png"
                                title="Zelcore"
                                path="https://zelcore.io/"
                                icon="feather-cast"
                            />
                        </div>
                        <div
                            className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            <Wallet
                                imgSrc="/images/wallet/x-wallet.png"
                                title="X-Wallet"
                                path="https://xwallet.kaddex.com/"
                                icon="feather-box"
                            />
                        </div>
                        {/* <div
                            className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            <Wallet
                                title="Chainweaver"
                                description="Great oppertunity to reach them."
                                path="/collection"
                                icon="feather-award"
                                color="pink"
                            />
                        </div> */}
                        {/* <div
                            className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            <Wallet
                                title="TiOne"
                                description="Built your bigger offers then me"
                                path="/collection"
                                icon="feather-briefcase"
                                color="yellow"
                            />
                        </div>
                        <div
                            className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            <Wallet
                                title="Bkashes"
                                description="Cash Transfer for easyest way you wast"
                                path="/collection"
                                icon="feather-command"
                                color="green"
                            />
                        </div>
                        <div
                            className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            <Wallet
                                title="Pyynle"
                                description="More then myself down among the Cash."
                                path="/collection"
                                icon="feather-cpu"
                                color="blue"
                            />
                        </div> */}
                        <div
                            className="col-12"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                        >
                            {/* <Wallet
                                title="YesCash"
                                description="Biggest Bank transfer for best oppertunity"
                                path="/collection"
                                icon="feather-gitlab"
                                color="red"
                            /> */}

                            <p className="wallet-bootm-disc">
                                Once you’ve created a wallet and connected to
                                the MINT-IT website, if you want to mint, or
                                trade an NFT on the secondary marketplace you
                                will need $KDA funds on chain-8. Feel free to
                                reach out to our team for support, we’re happy
                                to help.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ConnectArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
ConnectArea.defaultProps = {
    space: 1,
};

export default ConnectArea;
