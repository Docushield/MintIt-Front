import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);

    const res = await fetchAPI("api/collections?limit=18", cookies);
    const countRes = await fetchAPI("api/collections?count=true", cookies);

    if (res.error) {
        return {
            props: {
                error: res.error,
                count:
                    countRes && countRes.response && countRes.response.count
                        ? countRes.response.count
                        : 0,
                cookies,
                className: "template-color-1 with-particles",
            },
        };
    }

    return {
        props: {
            collections: res.response,
            count:
                countRes && countRes.response && countRes.response.count
                    ? countRes.response.count
                    : res.response.length,
            cookies,
            className: "template-color-1 with-particles",
        },
    };
}
const MintPage = ({ collections, count, cookies }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Mint" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Mint"
                    pageTitle1=""
                    currentPage="Mint"
                />
                <CollectionArea
                    data={{
                        collections: collections,
                        section_title: {
                            title: "Minting Now",
                        },
                        count: count,
                        cookies,
                    }}
                />

            </main>
            <Footer />
        </Wrapper>
    );
};

export default MintPage;
