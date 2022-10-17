import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";
import { acpCollection } from "./collections/acp";
import { docbondCollection } from "./collections/docbond";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);

    {
        /* since the post per page is 20 and we have acp, doc
         * passing 18 as limit.
         * */
    }
    const res = await fetchAPI("api/collections?limit=18", cookies);
    const countRes = await fetchAPI("api/collections?count=true", cookies);

    if (res.response.error || res.error) {
        return {
            props: {
                error: res.response.error || res.error,
                className: "template-color-1",
                collections: [acpCollection, docbondCollection],
                count:
                    countRes && countRes.response && countRes.response.count
                        ? countRes.response.count
                        : 0,
                cookies,
            },
        };
    }

    return {
        props: {
            collections: [acpCollection, docbondCollection].concat(res.response),
            className: "template-color-1",
            count:
                countRes && countRes.response && countRes.response.count
                    ? countRes.response.count
                    : res.response.length,
            cookies,
        },
    };
}

const Collection = ({ collections, count, cookies }) => {
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
                        count: count,
                        cookies,
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Collection;
