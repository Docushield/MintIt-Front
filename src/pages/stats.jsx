import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import RankingArea from "@containers/ranking";
import ActivityArea from "@containers/activity";

// Demo data for the ranking page
import rankingData from "../data/stats-ranking.json";
import activityData from "../data/stats-activity.json";

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
            <SEO pageTitle="Stats" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Stats"
                    pageTitle1="Activity"
                    currentPage="Stats"
                    onPageChageHandler={onPageChageHandler}
                />
                {pageNumber === 1 && (
                    <RankingArea data={{ ranking: rankingData }} />
                )}
                {pageNumber === 2 && (
                    <ActivityArea data={{ activities: activityData }} />
                )}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Product;
