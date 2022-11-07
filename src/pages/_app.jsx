import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../store";
import NextNProgress from 'nextjs-progressbar';
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <Provider store={store}>
            <SSRProvider>
                <ThemeProvider defaultTheme="dark">
                    <NextNProgress options={{showSpinner: false}} color="#20ec8d" height={4} />
                    <Component {...pageProps} />
                </ThemeProvider>
            </SSRProvider>
        </Provider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
