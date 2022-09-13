/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import stepsData from "../../data/steps.json";
import Steps from "@components/steps";

const CreateNewArea = ({ className, space }) => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLogo, setSelectedLogo] = useState();
    const [selectedBanner, setSelectedBanner] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [isPreview, setIsPreview] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const notify = () => toast("Your product has submitted");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        console.log("image change");
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const logoChange = (e) => {
        console.log("logo change");
        if (e.target.files && e.target.files.length > 0) {
            setSelectedLogo(e.target.files[0]);
        }
    };

    const bannerChange = (e) => {
        console.log("banner change");
        if (e.target.files && e.target.files.length > 0) {
            setSelectedBanner(e.target.files[0]);
        }
    };

    const onSubmit = (data, e) => {
        const { target } = e;
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        setIsPreview(true);
        const isPreviewBtn = submitBtn.dataset?.btn;
        setHasImageError(!selectedImage);
        if (isPreviewBtn && selectedImage) {
            setPreviewData({ ...data, image: selectedImage });
            setShowProductModal(true);
        }
        if (!isPreviewBtn) {
            notify();
            reset();
            setSelectedImage();
        }
    };

    const onContinue = () => {
        setIsPreview(true);
    };

    return (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <Steps steps={stepsData} />
                            <div className="col-lg-5 mx-auto">
                                <div className="upload-area">
                                    <div className="upload-formate mb--30">
                                        <h6 className="title">Upload file</h6>
                                        <p className="formate">
                                            Drag or choose your file to upload
                                        </p>
                                    </div>

                                    <div className="brows-file-wrapper">
                                        <input
                                            name="file"
                                            id="file"
                                            type="file"
                                            className="inputfile"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                            onChange={imageChange}
                                        />
                                        {selectedImage && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedImage
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}

                                        <label
                                            htmlFor="file"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIF, WEBP, MP4 or MP3.{" "}
                                                <br /> Max 1Gb.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedImage && (
                                        <ErrorText>Image is required</ErrorText>
                                    )}
                                </div>

                                <div className="col-md-12 mt--20 upload-area">
                                    <div className="brows-file-wrapper">
                                        <input
                                            name="logo"
                                            id="logo"
                                            type="file"
                                            className="inputlogo"
                                            onChange={logoChange}
                                        />
                                        {selectedLogo && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedLogo
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}

                                        <label
                                            htmlFor="logo"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Upload a logo
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIF, JPEG. <br /> Size:
                                                1000x1000 or 500x500
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedLogo && (
                                        <ErrorText>Logo is required</ErrorText>
                                    )}
                                </div>

                                <div className="col-md-12 mt--20 upload-area">
                                    <div className="brows-file-wrapper">
                                        <input
                                            name="banner"
                                            id="banner"
                                            type="file"
                                            className="inputfile"
                                            onChange={bannerChange}
                                        />
                                        {selectedBanner && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedBanner
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}

                                        <label
                                            htmlFor="banner"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Upload a banner
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIT, JPEG. <br /> Max 1Gb.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedBanner && (
                                        <ErrorText>
                                            Banner is required
                                        </ErrorText>
                                    )}
                                </div>

                                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                    <h5> Note: </h5>
                                    <span>
                                        {" "}
                                        Service fee : <strong>2.5%</strong>{" "}
                                    </span>{" "}
                                    <br />
                                    <span>
                                        {" "}
                                        You will receive :{" "}
                                        <strong>25.00 KDA $50,000</strong>
                                    </span>
                                </div>
                                {!isPreview && (
                                    <div className="col-md-12 mt--20">
                                        <div className="input-box">
                                            <Button
                                                onClick={onContinue}
                                                fullwidth
                                                data-btn="submit"
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {isPreview && (
                                <div className="col-lg-8 mx-auto">
                                    <div className="form-wrapper-one">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="name"
                                                        placeholder="Collection Name: Random"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="price"
                                                        placeholder="Mint Price: 20 $KDA"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="size"
                                                        placeholder="Collection Size: 10000"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="start"
                                                        placeholder="Start Mint: yyyy/mm/dd/time"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="description"
                                                        placeholder="Description: This is the collection..."
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="type"
                                                        placeholder="Mint Type: Public"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="royalties"
                                                        placeholder="Royalties: 2.5%"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="whitelist"
                                                        placeholder="Whitelist: Yes"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="end"
                                                        placeholder="End: yyyy/mm/dd/time"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="creator"
                                                        placeholder="Creator: k:add24brj44b2jb44..."
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-xl-6 mt_lg--15 mt_md--15 mt_sm--15">
                                                <div className="input-box">
                                                    <Button
                                                        type="submit"
                                                        fullwidth
                                                        data-btn="confirm"
                                                    >
                                                        Confirm & Submit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>2.5%</strong>{" "}
                                </span>{" "}
                                <br />
                                <span>
                                    {" "}
                                    You will receive :{" "}
                                    <strong>25.00 KDA $50,000</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showProductModal && (
                <ProductModal
                    show={showProductModal}
                    handleModal={handleProductModal}
                    data={previewData}
                />
            )}
        </>
    );
};

CreateNewArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
