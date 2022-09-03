import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import UploadVariants from "@containers/upload-variants";


export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Mint page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Mint" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Mint"
                pageTitle1="Activity"
                currentPage="Mint"
                onPageChageHandler={onPageChageHandler}
            />
            <UploadVariants />
        </main>
        <Footer />
    </Wrapper>

);
};

export default Home;
