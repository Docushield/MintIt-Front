import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import Breadcrumb from "@components/breadcrumb";
import ProvenanceHashArea from "@containers/provenance-hash/provenance-hash-1";
import { fetchAPI } from "@utils/fetchAPI";
import { pactLocalFetch } from "@utils/pactLocalFetch";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.params.slug;
    const smartContract = process.env.NEXT_PUBLIC_CONTRACT;

    const collection = await fetchAPI(`api/collections/${slug}`, cookies);
    const collectionName = collection.response.name;

    const res = await pactLocalFetch(
        `(${smartContract}.get-nft-collection "${collectionName}")`
    );
    const tokens = await fetchAPI(`api/collections/${slug}/tokens`, cookies);

    const tokenhashs = await fetchAPI(
        `api/collections/${slug}/tokenHashes`,
        cookies
    );

    console.log(tokenhashs);

    let concatenatedHashStr = "";
    tokenhashs.response.forEach(
        (tokenHash) => (concatenatedHashStr += tokenHash)
    );

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
            collection: res.result.data,
            tokens: tokens.response,
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
            <Breadcrumb pageTitle="Provenance Hash" />
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
