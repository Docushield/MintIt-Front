import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro/layout-02";
import AuthorProfileArea from "@containers/author-profile/layout-02";
import { parseCookies } from "nookies";
import { pactLocalFetch } from "@utils/pactLocalFetch";

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        const account = cookies["userAccount"];
        const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
        const pactCode = `(${smartContract}.search-nfts-by-owner "${account}")`;
        const fetchRes = await pactLocalFetch(pactCode);
        if (fetchRes == null) {
            //blockchain request failed
            return {
                props: {
                    account: account,
                    collections: [],
                    tokens: [],
                    className: "template-color-1",
                },
            };
        } else {
            return {
                props: {
                    account: account,
                    collections: [],
                    tokens: fetchRes.result.data,
                    className: "template-color-1",
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: error.message,
                tokens: [],
                collections: [],
                account: "",
                className: "template-color-1",
            },
        };
    }
}

const Author = ({ collections, tokens, account }) => (
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            <AuthorIntroArea data={account} />
            {collections && (
                <AuthorProfileArea data={{ products: tokens, collections }} />
            )}
        </main>
        <Footer />
    </Wrapper>
);

export default Author;
