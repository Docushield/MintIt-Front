import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import PrivacyPolicyArea from "@containers/privacy-policy";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PrivacyPolicy = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Terms Conditions page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Privacy Policy" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Terms Conditions"
                pageTitle1="Activity"
                currentPage="Terms Conditions"
                onPageChageHandler={onPageChageHandler}
            />
            <PrivacyPolicyArea />
        </main>
        <Footer />
    </Wrapper>
);
}
export default PrivacyPolicy;
