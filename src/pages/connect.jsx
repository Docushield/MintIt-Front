import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ConnectArea from "@containers/connect";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}
const Connect = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Connect page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Connect" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Getting Started"
                pageTitle1="Activity"
                currentPage="Getting Started"
                onPageChageHandler={onPageChageHandler}
            />
            <ConnectArea />
        </main>
        <Footer />
    </Wrapper>
);
}

export default Connect;
