import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product/layout-02";

// Demo data
import hallOfFameData from "../data/hall-of-fame.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}
const Home02 = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Hall Of Fam page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Hall Of Fam" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Hall of Fam"
                pageTitle1="Activity"
                currentPage="Hall of Fam"
                onPageChageHandler={onPageChageHandler}
            />
            <ProductArea
                data={{
                    section_title: {
                        title: "Hall of Fam",
                    },
                    products: hallOfFameData,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);
};

export default Home02;
