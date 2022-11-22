/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Table from "react-bootstrap/Table";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import stepsData from "../../data/steps.json";
import Steps from "@components/steps";
import slugify from "slugify";
import { formatDate } from "@utils/date";
const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "https://the-backend.fly.dev";

const checkStatus = async () => {
    const response = await fetch(`${baseURL}/api/collections/get-status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (response.status == 400) {
        return false;
    } else if (response.status == 200) {
        const resJson = await response.json();
        return resJson.collection;
    }
};

const CreateNewArea = ({ className, space, handleSend }) => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedBanner, setSelectedBanner] = useState();
    const [limit, setLimit] = useState();
    const [previewData, setPreviewData] = useState({});
    const [isPreview, setIsPreview] = useState(false);
    const [selectedJson, setSelectedJson] = useState(null);
    const [disableBTN, setBisableBTN] = useState(false);

    const slug = useMemo(() => {
        return selectedJson ? slugify(selectedJson["name"]) : "";
    }, [selectedJson]);

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
        if (e.target.files && e.target.files.length > 0) {
            const profile = e.target.files[0];
            console.log(profile.type);
            if (
                profile.type !== "image/jpeg" &&
                profile.type !== "image/png" &&
                profile.type !== "image/jpg"
            ) {
                toast("Invalid file type, select valid image file.");
                return;
            }
            setSelectedImage(profile);
        }
    };

    const bannerChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const banner = e.target.files[0];
            console.log(banner.type);
            if (
                banner.type !== "image/jpeg" &&
                banner.type !== "image/png" &&
                banner.type !== "image/jpg"
            ) {
                toast("Invalid file type, select valid image file.");
                return;
            }
            setSelectedBanner(banner);
        }
    };

    const jsonChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type !== "application/json") {
                toast("Invalid file type, select valid JSON file.");
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", (event) => {
                const input_json = JSON.parse(event.target.result);
                const inValid_mint_starts = isNaN(
                    Date.parse(input_json["mint-starts"])
                );
                const inValid_premint_ends = isNaN(
                    Date.parse(input_json["premint-ends"])
                );
                const inValid_reveal_at = isNaN(
                    Date.parse(input_json["reveal-at"])
                );
                let all_hashes = [];
                for (const token of input_json["token-list"]) {
                    all_hashes.push(token.hash);
                }
                const inValid_hashes =
                    new Set(all_hashes).size !== all_hashes.length;
                if (!input_json.creator || !input_json.name) {
                    toast(
                        "Invalid file, this file is not valid for creating collection."
                    );
                    return;
                }
                if (
                    inValid_mint_starts ||
                    inValid_premint_ends ||
                    inValid_reveal_at
                ) {
                    toast("Invalid Date Format, Please check date formats.");
                    return;
                }
                if (inValid_hashes) {
                    toast("Duplicate Token Hashes, Please check Token Hashes.");
                    return;
                }

                setSelectedJson(input_json);
                setIsPreview(true);
            });
            reader.readAsText(file);
        }
    };

    const onSubmit = async () => {
        if (!selectedImage) {
            toast.error("Please select the image to upload");
            return;
        }
        if (!selectedBanner) {
            toast.error("Please select the banner to upload");
            return;
        }
        if (!selectedJson) {
            toast.error("Please select the json to upload");
        }
        if (!limit || limit == 0) {
            toast.error("Please enter minting limit (must be non-zero)");
            return;
        }
        setBisableBTN(true);
        let status = await checkStatus();
        console.log("asdfasd"+status);
        if (!status) {
            toast.error(
                "Collection initialization is disabled for a while, try again later."
            );
            setBisableBTN(false);
            return;
        }
        setBisableBTN(false);
        // await handleSend(
        //     selectedImage,
        //     selectedBanner,
        //     selectedJson,
        //     slug,
        //     limit
        // );
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
                                            accept="application/json"
                                            onChange={jsonChange}
                                        />

                                        <label
                                            htmlFor="file"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                Only accept JSON files. <br />
                                            </p>
                                        </label>
                                    </div>
                                    {!selectedJson && (
                                        <ErrorText>Json is required</ErrorText>
                                    )}
                                </div>

                                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                    <h5> Note: </h5>
                                    <span>
                                        {" "}
                                        Service fee : <strong>2.5%</strong>{" "}
                                        royalties
                                    </span>{" "}
                                    <br />
                                </div>
                            </div>
                            {isPreview && (
                                <div className="col-lg-8 mx-auto">
                                    <div className="form-wrapper-one">
                                        <div className="upload-area mb--50">
                                            <div className="upload-formate mb--30">
                                                <h6 className="title">
                                                    Enter Minting Limit
                                                </h6>
                                                <p className="formate">
                                                    To allow one account to mint
                                                    limited NFTs
                                                </p>
                                            </div>
                                            <input
                                                id="contact-name"
                                                type="number"
                                                value={limit}
                                                onChange={(e) => {
                                                    setLimit(e.target.value);
                                                }}
                                            />
                                            {!limit && (
                                                <ErrorText>
                                                    Minting Limit is required
                                                </ErrorText>
                                            )}
                                        </div>
                                        <div className="upload-area mb--20">
                                            <div className="upload-formate mb--30">
                                                <h6 className="title">
                                                    Upload image
                                                </h6>
                                                <p className="formate">
                                                    Drag or choose your image to
                                                    upload
                                                </p>
                                            </div>

                                            <div className="brows-file-wrapper">
                                                <input
                                                    name="image"
                                                    id="image"
                                                    type="file"
                                                    accept="image/png, image/jpg, image/jpeg"
                                                    className="inputfile"
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
                                                    htmlFor="image"
                                                    title="No File Choosen"
                                                >
                                                    <i className="feather-upload" />
                                                    <span className="text-center">
                                                        Choose an image
                                                    </span>
                                                    <p className="text-center mt--10">
                                                        Only accept image files.{" "}
                                                        <br />
                                                    </p>
                                                </label>
                                            </div>
                                            {!selectedImage && (
                                                <ErrorText>
                                                    Image is required
                                                </ErrorText>
                                            )}
                                        </div>
                                        <div className="upload-area mb--20">
                                            <div className="upload-formate mb--30">
                                                <h6 className="title">
                                                    Upload banner
                                                </h6>
                                                <p className="formate">
                                                    Drag or choose your banner
                                                    to upload
                                                </p>
                                            </div>

                                            <div className="brows-file-wrapper">
                                                <input
                                                    name="banner"
                                                    id="banner"
                                                    type="file"
                                                    className="inputfile"
                                                    accept="image/png, image/jpg, image/jpeg"
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
                                                        Choose a banner file
                                                    </span>
                                                    <p className="text-center mt--10">
                                                        Only accept image files.{" "}
                                                        <br />
                                                    </p>
                                                </label>
                                            </div>
                                            {!selectedBanner && (
                                                <ErrorText>
                                                    Banner is required
                                                </ErrorText>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="name"
                                                        placeholder="Collection Name: Random"
                                                        value={`Collection Name: ${selectedJson.name}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="price"
                                                        placeholder="Mint Price: 20 $KDA"
                                                        value={`Mint Price: ${selectedJson["mint-price"]} $KDA`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="size"
                                                        placeholder="Collection Size: 10000"
                                                        value={`Collection Size: ${selectedJson.size}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="size"
                                                        placeholder="Collection Slug: "
                                                        value={`Collection Slug: ${slug}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="start"
                                                        placeholder="Start Mint: yyyy/mm/dd/time"
                                                        value={`Start Mint: ${formatDate(
                                                            selectedJson[
                                                                "mint-starts"
                                                            ],
                                                            "YYYY-MM-DD"
                                                        )}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="description"
                                                        placeholder="Description: This is the collection..."
                                                        value={`Description: ${selectedJson.description}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="type"
                                                        placeholder="Mint Type: Public"
                                                        value={`Mint Type: ${selectedJson.type}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="creator"
                                                        placeholder="Creator: k:add24brj44b2jb44..."
                                                        value={`Creator: ${selectedJson.creator}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input-box pb--20">
                                                    <input
                                                        id="royalties"
                                                        placeholder="Royalties: 2.5%"
                                                        value={`Royalties: ${(
                                                            selectedJson[
                                                                "mint-royalties"
                                                            ].rates || []
                                                        ).reduce(
                                                            (prev, current) =>
                                                                prev.rate +
                                                                current.rate
                                                        )}%`}
                                                    />
                                                    <Table
                                                        responsive
                                                        className="mt--20 text-white"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Description
                                                                </th>
                                                                <th>Rate</th>
                                                                <th>
                                                                    Stakeholder
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(
                                                                selectedJson[
                                                                    "mint-royalties"
                                                                ].rates || []
                                                            ).map(
                                                                (
                                                                    royalty,
                                                                    i
                                                                ) => (
                                                                    <tr
                                                                        id={`i${i}`}
                                                                    >
                                                                        <td>
                                                                            {
                                                                                royalty.description
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                royalty.rate
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                royalty.stakeholder
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-box">
                                                    <input
                                                        id="end"
                                                        placeholder="End: yyyy/mm/dd/time"
                                                        value={`End: ${formatDate(
                                                            selectedJson[
                                                                "premint-ends"
                                                            ],
                                                            "YYYY-MM-DD"
                                                        )}`}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-xl-6">
                                                <div className="input-box">
                                                    <Button
                                                        type="submit"
                                                        fullwidth
                                                        data-btn="confirm"
                                                        disabled={disableBTN}
                                                    >
                                                        Confirm & Submit
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt--20">
                                                <div className="input-box">
                                                    <Table
                                                        responsive
                                                        className="text-white"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    WhiteList
                                                                    Address
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(
                                                                selectedJson[
                                                                    "premint-whitelist"
                                                                ] || []
                                                            ).map(
                                                                (
                                                                    whiteItem,
                                                                    j
                                                                ) => (
                                                                    <tr
                                                                        id={`j${j}`}
                                                                    >
                                                                        <td className="py-2">
                                                                            <small>
                                                                                {
                                                                                    whiteItem
                                                                                }
                                                                            </small>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </Table>
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
                                    royalties
                                </span>{" "}
                                <br />
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
    handleSend: PropTypes.func,
};

CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
