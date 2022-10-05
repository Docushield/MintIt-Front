import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";

// Demo data
import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Mint = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Discover page: ", page);
        setPageNumber(page);
    };

    return (
        <Wrapper>
            <SEO pageTitle="Mint" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Mint"
                    currentPage="Mint"
                    onPageChageHandler={onPageChageHandler}
                />
                <CollectionArea
                    data={{
                        collections: collectionsData,
                        section_title: {
                            title: "Minting Now",
                        },
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Mint;
