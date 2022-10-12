import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import RankingArea from "@containers/ranking";
import ActivityArea from "@containers/activity-new";

// Demo data for the ranking page
import rankingData from "../data/stats-ranking.json";
import activityData from "../data/activity.json";

export async function getServerSideProps(context) {
    try {
        const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
        const pactCode = `(${smartContract}.get-nft "${collection.name}" "${hash}")`;
        const fetchRes = await pactLocalFetch(pactCode);
        if (fetchRes == null) {
            //blockchain request failed
            return {
                props: {
                    className: "template-color-1",
                    activityData: [],
                },
            };
        } else {
            return {
                props: {
                    activityData: [],
                    className: "template-color-1",
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                activityData: [],
                className: "template-color-1",
            },
        };
    }
}

const Product = ({ activityData }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Stats" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Stats"
                    pageTitle1=""
                    currentPage="Stats"
                />
                {/* <RankingArea data={{ ranking: rankingData.slice(0, 10) }} /> */}
                <ActivityArea
                    data={{ activityData: activityData.slice(0, 10) }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Product;
