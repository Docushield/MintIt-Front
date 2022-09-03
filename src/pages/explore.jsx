import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product/layout-02";


// Demo data
import exploreData from "../data/explore.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Discover page: ", page);
        setPageNumber(page);
    };

    return (
        <Wrapper>
            <SEO pageTitle="Explore" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Explore"
                    pageTitle1="Activity"
                    currentPage="Explore"
                    onPageChageHandler={onPageChageHandler}
                />
                <ProductArea
                data={{
                    section_title: {
                        title: "OUR All NFT'S",
                    },
                    products: exploreData,
                }}
            />
                
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Product;
