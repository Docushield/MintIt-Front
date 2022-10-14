import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Image from "next/image";

const Breadcrumb = ({
    pageTitle,
    currentPage,
    className,
    space,
    pageTitle1 = undefined,
    onPageChageHandler,
}) => {
    const [toggle, setToggle] = useState(1);
    const onToggleTitle = (index) => {
        setToggle(index);
        onPageChageHandler(index);
    };

    return (
        <div
            className={clsx(
                "rn-breadcrumb-inner",
                className,
                space === 1 && "ptb--30"
            )}
        >
            <div className="container">
                <div className="row align-items-center">
                    {pageTitle1 !== undefined ? (
                        <div className="col-lg-6 col-md-6 col-12">
                            <h5
                                className={
                                    "pageTitle-line text-center text-md-start " +
                                    (toggle === 1 ? "curTitle" : "")
                                }
                                onClick={() => onToggleTitle(1)}
                            >
                                {pageTitle}
                            </h5>
                            <h5
                                className={
                                    "pageTitle-line text-center text-md-start " +
                                    (toggle === 2 ? "curTitle" : "")
                                }
                                onClick={() => onToggleTitle(2)}
                            >
                                {pageTitle1}
                            </h5>
                        <ul className="breadcrumb-list">
                            <li className="item">
                                <Anchor path="/">Home</Anchor>
                            </li>
                            <li className="separator">
                                <i className="feather-chevron-right" />
                            </li>
                            <li className="item current">
                                {currentPage || pageTitle}
                            </li>
                        </ul>
                        </div>
                    ) : (
                        <div className="col-lg-6 col-md-6 col-12">
                            <h5 className="pageTitle text-center text-md-start">
                                {pageTitle}
                            </h5>
                        </div>
                    )}
                    <div className="col-lg-6 col-md-6 col-12">
                        {/* <div className="col_banner">
                            <p>Banner Required</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

Breadcrumb.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    pageTitle1: PropTypes.string,
    currentPage: PropTypes.string,
    className: PropTypes.string,
    onPageChageHandler: PropTypes.func,
    space: PropTypes.oneOf([1]),
};

Breadcrumb.defaultProps = {
    space: 1,
};

export default Breadcrumb;
