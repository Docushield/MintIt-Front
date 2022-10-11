import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import Breadcrumb from "@components/breadcrumb";
import ProvenanceHashArea from "@containers/provenance-hash/provenance-hash-1";
import { fetchAPI } from "@utils/fetchAPI";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.params.slug;

    const res = await fetchAPI(`api/collections/${slug}`, cookies);
    const tokens = await fetchAPI(`api/collections/${slug}/tokens`, cookies);

    if (res.error || tokens.error) {
        return {
            props: {
                error: res.error || tokens.error,
                className: "template-color-1",
            },
        };
    }

    let startIndex = 0;
    let min = tokens.response[0];
    for (let i = 0; i < tokens.response.length; i++) {
        if (new Date(min.mint_at) > new Date(tokens.response[i].mint_at)) {
            min = tokens.response[i];
            startIndex = i;
        }
    }

    return {
        props: {
            collection: res.response,
            tokens: tokens.response,
            startIndex,
            className: "template-color-1",
        },
    };
}

const ProvenanceHash = ({ collection, startIndex, tokens }) => (
    <Wrapper>
        <SEO pageTitle="Provenance Hash" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Provenance Hash" />
            <ProvenanceHashArea
                collection={collection}
                tokens={tokens}
                startIndex={startIndex}
                tokens={tokens}
            />
        </main>
        <Footer />
    </Wrapper>
);

ProvenanceHash.propTypes = {
    collection: PropTypes.shape({}),
};

export default ProvenanceHash;
