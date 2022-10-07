import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ServiceArea from "@containers/services/layout-01";
import SupportArea from "@containers/support";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const HelpCenter = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Help Center page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Help Center" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Help Center"
                pageTitle1=""
                currentPage="Help Center"
                onPageChageHandler={onPageChageHandler}
            />
            <ServiceArea />
            <SupportArea />
        </main>
        <Footer />
    </Wrapper>
);
}
export default HelpCenter;
