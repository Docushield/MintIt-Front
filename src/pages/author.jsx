import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro/layout-02";
import AuthorProfileArea from "@containers/author-profile/layout-02";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";

// Demo data
import authorData from "../data/author.json";
import productData from "../data/categories.json";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);

    const res = await fetchAPI("api/collections", cookies);

    if (res.error) {
        return {
            props: {
                error: res.error,
                className: "template-color-1",
            },
        };
    }

    return {
        props: { collections: res.response, className: "template-color-1" },
    };
}

const Author = ({ collections }) => (
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            <AuthorIntroArea data={authorData.address} />
            {collections && (
                <AuthorProfileArea
                    data={{ products: productData, collections }}
                />
            )}
        </main>
        <Footer />
    </Wrapper>
);

export default Author;
