import React, { useState } from "react";
import { motion } from "framer-motion";

const DescriptionDropdown = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="product-descsription-wrapper">
            <button
                className="product-description-button"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                Collection Description
            </button>
            {isCollapsed && (
                <motion.div
                    className="product-description-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    This is the mock description. This is the mock description.
                    This is the mock description This is the mock description.
                    This is the mock description. This is the mock description
                    This is the mock description. This is the mock description.
                    This is the mock description This is the mock description.
                    This is the mock description. This is the mock description
                </motion.div>
            )}
        </div>
    );
};

export default DescriptionDropdown;
