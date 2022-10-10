import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";
import Mint from "@components/constant-collections";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);

    const res = await fetchAPI("api/collections", cookies);

    if (res.error) {
        return {
            props: {
                error: res.error,
                className: "template-color-1 with-particles",
            },
        };
    }

    return {
        props: {
            collections: res.response,
            className: "template-color-1 with-particles",
        },
    };
}
const MintPage = ({ collections }) => {
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
                    pageTitle1=""
                    currentPage="Mint"
                    onPageChageHandler={onPageChageHandler}
                />
                <CollectionArea
                    data={{
                        collections,
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

export default MintPage;
