import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsOfUse from "@containers/terms-use-area";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PrivacyPolicy = () => {
    return (
        <Wrapper>
            <SEO pageTitle="Term conditions" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Terms Conditions"
                    pageTitle1=""
                    currentPage="Terms Conditions"
                />
                <TermsOfUse />
            </main>
            <Footer />
        </Wrapper>
    );
};
export default PrivacyPolicy;
