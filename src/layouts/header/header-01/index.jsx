/* eslint-disable react/jsx-indent */
import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useMoralis } from "react-moralis";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import ConnectWalletDialog from "@components/connect-wallet-dialog";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import { data } from "autoprefixer";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
const Header = ({ className }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const isAuthenticated = false; // TODO: Update to state hook
    const [isShowConnect, setIsShowConnect] = useState(false);

    const kdaEnvironment = {
        networkId: "testnet04",
        chainId: "1",
    };

    // TODO: Set in environment
    // const apiUrl = "http://localhost:4000/api/";

    const apiPost = async (route, payload) =>
        fetch(`http://localhost:4000/api/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

    const connectXWallet = async () => {
        console.log("Start connectXWallet");

        const pactNetworkId = kdaEnvironment.networkId;
        const pactChainId = kdaEnvironment.chainId;

        if (!window.kadena || !window.kadena.isKadena) {
            console.log("No xwallet instaled");
            return;
        }

        const { kadena } = window;

        await kadena.request({
            method: "kda_connect",
            networkId: pactNetworkId,
        });

        const xwalletResp = await window.kadena.request({
            method: "kda_getSelectedAccount",
            networkId: pactNetworkId,
        });

        if (!xwalletResp) {
            console.log("Invalid xwallet response");
            return;
        }

        if (xwalletResp.chainId !== pactChainId) {
            console.log(
                `wrong chain ${xwalletResp.chainId}, please open chain ${pactChainId}`
            );
            return;
        }

        localStorage.setItem("userAccount", xwalletResp.account);

        // TODO:
        // Update isAuthenticated hook and
        // Display connected wallet
    };

    const signXWallet = async (cmd) =>
        window.kadena.request({
            networkId: kdaEnvironment.networkId,
            method: "kda_requestSign",
            data: {
                networkId: kdaEnvironment.networkId,
                signingCmd: {
                    networkId: kdaEnvironment.networkId,
                    sender: "k:99e94e2df18e41917d755558c9809926fb1c7c51397ba351d4863e59220d3578",
                    chainId: kdaEnvironment.chainId,
                    gasPrice: 0.0000001,
                    gasLimit: 3000,
                    ttl: 28800,
                    caps: [],
                    pactCode: cmd.pactCode,
                    envData: cmd.envData,
                },
            },
        });

    const sign = async (cmd) => {
        // TODO: Add check for Zelcore
        console.log("Signing tx...");

        return signXWallet({
            sender: cmd.account,
            chainId: kdaEnvironment.chainId,
            gasPrice: 0.00000001,
            gasLimit: 3000,
            ttl: 28800,
            caps: cmd.caps,
            pactCode: cmd.pactCode,
            envData: cmd.envData,
            networkId: kdaEnvironment.networkId,
        });
    };

    const getLoginSignature = async () => {
        const account = localStorage.getItem("userAccount");

        const { signedCmd } = await sign({
            account,
            pactCode: "",
            envData: {},
        });

        console.log(signedCmd);

        return signedCmd;
    };

    const apiLogin = async (loginSignature) => {
        const { cmd, sigs } = loginSignature;
        const account = localStorage.getItem("userAccount");

        return apiPost("auth", {
            account,
            command: cmd,
            signature: sigs[0].sig,
        });
    };

    const authenticate = async () => {
        // TODO: Add modal window with x-wallet or zelcore buttons
        await connectXWallet();
        // connectZelcore();

        const loginSignature = await getLoginSignature();

        const { token } = await apiLogin(loginSignature);

        // TODO: Save token and use it in auth
        return token;
    };

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuData} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>
                            {!isAuthenticated && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() =>
                                                setIsShowConnect(true)
                                            }
                                        >
                                            Connect Wallet
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {!isAuthenticated && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown />
                                </div>
                            )}
                            {/* <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.notification_link}>
                                        <i className="feather-bell" />
                                        <span className="badge">6</span>
                                    </Anchor>
                                </div>
                            </div> */}
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <ConnectWalletDialog
                show={isShowConnect}
                setShow={setIsShowConnect}
            />
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
