import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-01";
import LiveExploreArea from "@containers/live-explore/layout-02";

// Demo data
import filterData from "../data/discover-filter.json";
import liveData from "../data/discover-live.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const AllNFTs = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Discover page: ", page);
        setPageNumber(page);
    };

    const liveAuctionData = liveData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .slice(0, 5);

    return (
        <Wrapper>
            <SEO pageTitle="Discover" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Discover All NFTs"
                    pageTitle1=""
                    currentPage="All NFTs"
                    onPageChageHandler={onPageChageHandler}
                />
                {pageNumber === 1 && (
                    <ExploreProductArea
                        data={{
                            section_title: {
                                title: "Explore All NFTs",
                            },
                            products: filterData,
                        }}
                    />
                )}
                {pageNumber === 2 && (
                    <LiveExploreArea
                        data={{
                            products: liveAuctionData,
                        }}
                    />
                )}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default AllNFTs;
