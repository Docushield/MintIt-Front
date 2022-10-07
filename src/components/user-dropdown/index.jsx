import Image from "next/image";
import Anchor from "@ui/anchor";
import { useDispatch } from "react-redux";
import { setDisconnected } from "src/store/wallet.module";
import { destroyCookie } from "nookies";

const UserDropdown = () => {
    const dispatch = useDispatch();

    const disconnectWallet = async () => {
        dispatch(setDisconnected());
        await window.kadena.request({
            method: "kda_disconnect",
            networkId: "testnet04",
        });
        destroyCookie(null, "userAccount");
        destroyCookie(null, "walletName");
    };

    return (
        <div className="icon-box">
            <Anchor path="/profile">
                <Image
                    src="/images/icons/profile-image.png"
                    alt="Images"
                    layout="fixed"
                    width={38}
                    height={38}
                />
            </Anchor>
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <h4 className="title">
                        <Anchor path="/profile">My Profile</Anchor>
                    </h4>
                </div>
                {/* <div className="rn-product-inner">
                    <ul className="product-list">
                        <li className="single-product-list">
                            <div className="thumbnail">
                                <Anchor path="/product">
                                    <Image
                                        src="/images/portfolio/portfolio-07.jpg"
                                        alt="Nft Product Images"
                                        layout="fixed"
                                        width={50}
                                        height={50}
                                    />
                                </Anchor>
                            </div>
                            <div className="content">
                                <h6 className="title">
                                    <Anchor path="/product">Balance</Anchor>
                                </h6>
                                <span className="price">25 KDA</span>
                            </div>
                            <div className="button" />
                        </li>
                        <li className="single-product-list">
                            <div className="thumbnail">
                                <Anchor path="/product">
                                    <Image
                                        src="/images/portfolio/portfolio-01.jpg"
                                        alt="Nft Product Images"
                                        layout="fixed"
                                        width={50}
                                        height={50}
                                    />
                                </Anchor>
                            </div>
                            <div className="content">
                                <h6 className="title">
                                    <Anchor path="/product">Balance</Anchor>
                                </h6>
                                <span className="price">25 KDA</span>
                            </div>
                            <div className="button" />
                        </li>
                    </ul>
                </div>
                <div className="add-fund-button mt--20 pb--20">
                    <Anchor
                        className="btn btn-primary-alta w-100"
                        path="/connect"
                    >
                        Add Your More Funds
                    </Anchor>
                </div> */}
                <ul className="list-inner">
                    <li>
                        <Anchor path="/manage-profile">Manage Profile</Anchor>
                    </li>
                    {/* <li>
                        <Anchor path="/admanager">Ad Manager</Anchor>
                    </li> */}
                    {/* <li>
                        <Anchor path="/connect">Manage Collections</Anchor>
                    </li> */}
                    <li>
                        <button type="button" onClick={disconnectWallet}>
                            Disconnect Wallet
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDropdown;
