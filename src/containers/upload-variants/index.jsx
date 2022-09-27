import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Button from "@ui/button";

const UploadVariants = ({ className, space }) => (
    <div
        className={clsx(
            "rn-upload-variant-area varient",
            space === 1 && "rn-section-gap",
            className
        )}
    >
        <div className="container">
            <div className="row">
                <div className="upload-variant-title-wrapper">
                    <h3 className="title text-center">
                        Create and Upload Metadata
                    </h3>
                    <p className="text-center">
                        Once the NFT collection has been generated using the
                        MINT-IT WebApp, download the output file and upload it
                        to <strong>Create Collection</strong>. Want to create a
                        single NFT? Click on <strong>Create Single</strong> and
                        follow the steps.
                    </p>
                </div>
            </div>
            <div className="row g-5 mt--40">
                <div className="offset-lg-3 col-lg-3 col-md-6 col-12">
                    <div className="upload-variant-wrapper">
                        <div className="variant-preview">
                            <Image
                                src="/images/upload-variants/single.png"
                                alt="Doc-single"
                                width={500}
                                height={500}
                                layout="responsive"
                            />
                        </div>
                        <Button
                            path="/create-single"
                            size="medium"
                            fullwidth
                            className="mt--20"
                        >
                            Create Single
                        </Button>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                    <div className="upload-variant-wrapper">
                        <div className="variant-preview">
                            <Image
                                src="/images/upload-variants/multiple.png"
                                alt="Doc-single"
                                width={500}
                                height={500}
                                layout="responsive"
                            />
                        </div>
                        <Button
                            path="/create-multiple"
                            size="medium"
                            fullwidth
                            className="mt--20"
                        >
                            Create Collection
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

UploadVariants.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

UploadVariants.defaultProps = {
    space: 1,
};

export default UploadVariants;
