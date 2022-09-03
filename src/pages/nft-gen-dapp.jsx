import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsAndConditionsArea from "@containers/terms-condition";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const NFTGenDapp = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("NFT Gen Dapp page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="NFT Gen Dapp" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="NFT Gen Dapp"
                pageTitle1="Activity"
                currentPage="NFT Gen Dapp"
                onPageChageHandler={onPageChageHandler}
            />
            <TermsAndConditionsArea />
        </main>
        <Footer />
    </Wrapper>
);
}
export default NFTGenDapp;
