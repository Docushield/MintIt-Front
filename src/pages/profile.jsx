import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro/layout-02";
import AuthorProfileArea from "@containers/author-profile/layout-02";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";

// Demo data
// import authorData from "../data/author.json";
// import productData from "../data/categories.json";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const token = cookies["token"];
        const account = cookies["userAccount"];
        const response = await fetch(
            `${baseURL}/api/collections/profile/${account}`,
            {
                method: "GET",
                headers: {
                    "x-auth-token": token,
                },
            }
        ).then((res) => res.json());
        return {
            props: {
                collections: response.collections,
                account:account,
                tokens: response.nfts,
                className: "template-color-1",
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
                tokens: [],
                account:"",
                collections: [],
                className: "template-color-1",
            },
        };
    }
}

const Author = ({ collections,tokens, account}) => (
    console.log(account),
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            <AuthorIntroArea data={account} />
            {collections && (
                <AuthorProfileArea
                    data={{ products: tokens, collections }}
                />
            )}
        </main>
        <Footer />
    </Wrapper>
);

export default Author;
