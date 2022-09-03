import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import AddManagerArea from "@containers/add-manager";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const AddManager = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Add Manager page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Add Manager" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Ad Manage"
                pageTitle1="Activity"
                currentPage="Ad Manage"
                onPageChageHandler={onPageChageHandler}
            />
            <AddManagerArea />
        </main>
        <Footer />
    </Wrapper>
);
};

export default AddManager;
