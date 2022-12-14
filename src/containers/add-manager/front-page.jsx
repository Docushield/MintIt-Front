/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "@ui/button";
import Image from "next/image";

const FrontPage = () => {
    const [selectedImage, setSelectedImage] = useState({
        profile: "",
        cover: "",
    });
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0],
            }));
        }
    };

    return (
        <div className="Doc-information">
            <div className="profile-change row g-5">
                {/* <div className="profile-left col-lg-4">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Profile Picture</h6>
                        <div className="img-wrap">
                            {selectedImage?.profile ? (
                                <img
                                    src={URL.createObjectURL(
                                        selectedImage.profile
                                    )}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (
                                <Image
                                    id="rbtinput1"
                                    src="/images/profile/profile-01.jpg"
                                    alt="Profile-NFT"
                                    layout="fill"
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="profile"
                                id="fatima"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="fatima" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Profile
                                </span>
                            </label>
                        </div>
                    </div>
                </div> */}

                <div className="profile-left right col-lg-12">
                    <div className="profile-image mb--15">
                        <h6 className="title">Change Your Cover Photo</h6>
                        <div className="img-wrap ">
                            <div className="admangrimg">
                                <p>1000 X 1000</p>
                            </div>
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="cover"
                                id="nipa"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="nipa" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Cover
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="edit-bio-area mt--15">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="edit-bio-area mt--15">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="edit-bio-area mt--15">
                        <a href="#" className="right">Destination Link</a>
                    </div>
                    <div className="input-two-wrapper mb--15">
                        <div className="first-name threequator-wid">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="last-name onequator-wid">
                            <Button size="medium">Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;
