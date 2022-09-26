import PropTypes from "prop-types";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Image from "next/image";

const Wallet = ({ className, title, path, imgSrc }) => (
    <div className={clsx("wallet-wrapper", className)}>
        <div>
            <Image src={imgSrc} width={150} height={150} alt="wallet" />
        </div>
        <div className="inner">
            <div className="content">
                <h3 className="title">
                    <Anchor path={path}>{title}</Anchor>
                </h3>
            </div>
        </div>
        <Anchor className="over-link visually-hidden" path={path}>
            {title} link
        </Anchor>
    </div>
);

Wallet.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
};
export default Wallet;
