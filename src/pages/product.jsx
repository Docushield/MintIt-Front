import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/layout-01";

// Demo Data
import productData from "../data/categories.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Product page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="Product" />
        <Header />
        <main id="main-content">
            {/* <Breadcrumb pageTitle="Our Product" currentPage="Our Product" /> */}
            <Breadcrumb
                    pageTitle="Our Product"
                    pageTitle1="Activity"
                    currentPage="Our Product"
                    onPageChageHandler={onPageChageHandler}
                />
            <ProductArea data={{ products: productData }} />
        </main>
        <Footer />
    </Wrapper>
);

};
export default Product;
