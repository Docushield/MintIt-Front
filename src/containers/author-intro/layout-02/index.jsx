import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { ImageType } from "@utils/types";
import ShareDropdown from "@components/share-dropdown";
import ShareModal from "@components/modals/share-modal";
import WalletAddress from "@components/wallet-address";
import Button from "react-bootstrap/Button";
import Anchor from "@ui/anchor";

const AuthorIntroArea = ({ className, space, data }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <div className="rn-author-bg-area position-relative ptb--150">
                <Image
                    src="/images/banner/general.png"
                    alt="profile banner"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
            >
                <div className="container">
                    <div className="row padding-tb-50 align-items-baseline d-flex">
                        <div className="col-lg-3">
                            <div className="author-wrapper">
                                <div className="author-inner">
                                    {/* {data.image?.src && ( */}
                                    <div className="user-thumbnail">
                                        <Image
                                            src={"/images/profile/user.png"}
                                            alt={data.image?.alt || data.name}
                                            width={140}
                                            height={140}
                                            layout="fixed"
                                        />
                                    </div>
                                    {/* )} */}

                                    <div className="rn-author-info-content">
                                        {/* <h4 className="title">Name</h4>
                                         <div className="d-flex align-items-center">
                                            <a
                                                href="https://twitter.com"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="social-follw mb--0"
                                            >
                                                <i className="feather-twitter" />
                                                <span className="user-name">
                                                    {data.twitter}
                                                </span>
                                            </a>
                                            <div className="author-button-area mt--0 ml--10">
                                                <div className="count at-follw">
                                                    <ShareDropdown />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="mt-4 blue-area">
                                            {data.address}
                                        </div> */}
                                        <div className="mt-4 blue-area col-lg-12 col-md-6 col-12 m-auto">
                                            <WalletAddress
                                                address={data}
                                                length={17}
                                                lastLength={15}
                                            />
                                        </div>
                                        {/* <div className="follow-area">
                                            <div className="follow followers">
                                                <span>
                                                    {data.followers}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        followers
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="follow following">
                                                <span>
                                                    {data.following}{" "}
                                                    <a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="color-body"
                                                    >
                                                        following
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="author-button-area">
                                            <span className="btn at-follw follow-button">
                                                <i className="feather-user-plus" />
                                                Follow
                                            </span>
                                            <button
                                                type="button"
                                                className="btn at-follw share-button"
                                                onClick={shareModalHandler}
                                            >
                                                <i className="feather-share-2" />
                                            </button>

                                            <div className="count at-follw">
                                                <ShareDropdown />
                                            </div>
                                            <Anchor
                                                path="/edit-profile"
                                                className="btn at-follw follow-button edit-btn"
                                            >
                                                <i className="feather feather-edit" />
                                            </Anchor>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {/* <p>{data.description}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AuthorIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.string,
};
AuthorIntroArea.defaultProps = {
    space: 1,
};

export default AuthorIntroArea;
