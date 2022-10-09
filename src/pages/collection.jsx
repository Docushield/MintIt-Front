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

    const res = await fetchAPI("api/collections", cookies);

    if (res.response.error || res.error) {
        return {
            props: {
                error: res.response.error || res.error,
                className: "template-color-1",
                collections: [],
            },
        };
    }

    return {
        props: {
            collections: res.response,
            className: "template-color-1",
        },
    };
}

const Collection = ({ collections }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Discover Collections" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Discover Collections"
                    pageTitle1=""
                    currentPage="Collection"
                />
                <CollectionArea
                    data={{
                        collections: collections,
                        section_title: {
                            title: "Discover Collections",
                        },
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Collection;
