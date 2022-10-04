import React, { useState } from "react";
import Image from "next/image";

const WalletAddress = ({ address, length = 20 }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(address);
        setIsCopied(true);
    };
    return (
        <div className="wallet-address-wrapper">
            <div>{address.slice(0, length)}...</div>
            <div className="copy-icon-wrapper" onClick={handleCopy}>
                <Image
                    src={
                        !isCopied
                            ? "/images/icons/copy.svg"
                            : "/images/icons/checked.svg"
                    }
                    width={20}
                    height={20}
                />
            </div>
        </div>
    );
};

export default WalletAddress;
