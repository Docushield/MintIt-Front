import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro/layout-02";
import AuthorProfileArea from "@containers/author-profile/layout-02";
import Pact from "pact-lang-api";
import { parseCookies } from "nookies";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    const networkId = process.env.NEXT_PUBLIC_NETWORK_ID;
    const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
    const pactHost = process.env.NEXT_PUBLIC_CHAIN_API_HOST;
    const pactGasLimit = 100000;
    const pactGasPrice = 0.00000001;
    const apiHost = `${pactHost}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
    try {
        const account = cookies["userAccount"];
        let command = await Pact.api.prepareExecCmd(
            [],
            new Date().toISOString(),
            `(${smartContract}.search-nfts-by-owner "${account}")`,
            {},
            Pact.lang.mkMeta(
                "",
                chainId,
                pactGasPrice,
                pactGasLimit,
                Math.floor(Date.now() / 1000),
                86400
            ),
            networkId
        );

        const response = await fetch(`${apiHost}/api/v1/local`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(command),
        });

        const respObject = await response.json();
        console.log(respObject);

        if (
            !respObject ||
            !respObject.result ||
            respObject.result.status !== "success"
        ) {
            return {
                props: {
                    account: account,
                    tokens: [],
                    collections: [],
                    className: "template-color-1",
                },
            };
        } else {
            return {
                props: {
                    account: account,
                    collections: [],
                    tokens: respObject.result.data,
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
