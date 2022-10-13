import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import Breadcrumb from "@components/breadcrumb";
import ProvenanceHashArea from "@containers/provenance-hash/provenance-hash";
import { fetchAPI } from "@utils/fetchAPI";
import { pactLocalFetch } from "@utils/pactLocalFetch";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.params.slug;
    const smartContract = process.env.NEXT_PUBLIC_CONTRACT;

    const collection = await fetchAPI(`api/collections/${slug}`, cookies);
    const collectionName = collection.response.name;
    const requestKey = collection.response.requestKey;

    const res = await pactLocalFetch(
        `(${smartContract}.get-nft-collection "${collectionName}")`
    );
    const pactCode = `(${smartContract}.search-nfts-by-collection "${collectionName}")`;
    let tokens = [];
    const fetchRes = await pactLocalFetch(pactCode);
    if (fetchRes !== null) {
        tokens = fetchRes.result.data;
    }

    const tokenhashs = await fetchAPI(
        `api/collections/${slug}/tokenHashes`,
        cookies
    );

    console.log(tokenhashs);

    let concatenatedHashStr = "";
    tokenhashs.response.forEach(
        (tokenHash) => (concatenatedHashStr += tokenHash)
    );
    tokens = tokenhashs.response
        .map((e) => {
            return tokens.find((x) => x["content-hash"] == e);
        })
        .filter((e) => e != undefined);

    if (res.error || tokens.error) {
        return {
            props: {
                error: res.error || tokens.error,
                className: "template-color-1",
            },
        };
    }

    return {
        props: {
            collection: { ...res.result.data, requestKey },
            tokens: tokens,
            concatenatedHashStr,
            className: "template-color-1",
        },
    };
}

const ProvenanceHash = ({ collection, tokens, concatenatedHashStr }) => (
    <Wrapper>
        <SEO pageTitle="Provenance Hash" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Provenance Hash"
                pageTitle1=""
                currentPage="Provenance Hash"
            />
            <ProvenanceHashArea
                collection={collection}
                tokens={tokens}
                concatenatedHashStr={concatenatedHashStr}
            />
        </main>
        <Footer />
    </Wrapper>
);

ProvenanceHash.propTypes = {
    collection: PropTypes.shape({}),
};

export default ProvenanceHash;
