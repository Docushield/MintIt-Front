import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import ConnectWalletDialog from "@components/connect-wallet-dialog";
import WalletAccountDialog from "@components/wallet-account-dialog";
import MintConfirmDialog from "@components/mint-confirm-dialog";
import BurgerButton from "@ui/burger-button";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import { parseCookies, setCookie } from "nookies";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import {
    setConnected,
    toggleConnectWalletDialog,
    toggleWalletAccountDialog,
} from "../../../store/wallet.module";

const Header = ({ className }) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.wallet.connected);
    const account = useSelector((state) => state.wallet.account);

    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();

    useEffect(() => {
        const cookies = parseCookies();
        if (cookies["userAccount"]) {
            dispatch(
                setConnected({
                    account: cookies["userAccount"],
                    walletName: cookies["walletName"],
                })
            );
        }
    }, []);

    const onChangeWallet = () => {
        dispatch(toggleWalletAccountDialog());
        dispatch(toggleConnectWalletDialog());
    };

    const onConnect = () => dispatch(toggleConnectWalletDialog());

    const onShowAccount = () => dispatch(toggleWalletAccountDialog());

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
                            {/* <div className="setting-option d-none d-lg-block">
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
                            </div> */}
                            <div className="setting-option header-btn">
                                <div className="icon-box">
                                    {!connected ? (
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={onConnect}
                                        >
                                            Connect Wallet
                                        </Button>
                                    ) : (
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={onShowAccount}
                                        >
                                            {account.slice(0, 10)}...
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="setting-option rn-icon-list user-account">
                                {connected && <UserDropdown />}
                            </div>
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
            <ConnectWalletDialog />
            <WalletAccountDialog onChangeWallet={onChangeWallet} />
            <MintConfirmDialog />
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
