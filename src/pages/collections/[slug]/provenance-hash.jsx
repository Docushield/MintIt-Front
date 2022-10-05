import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import Breadcrumb from "@components/breadcrumb";
import ProvenanceHashArea from "@containers/provenance-hash";
import { fetchAPI } from "@utils/fetchAPI";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.params.slug;

    const res = await fetchAPI(`api/collections/${slug}`, cookies);

    if (res.error) {
        return {
            props: {
                error: res.error,
                className: "template-color-1",
            },
        };
    }

    return {
        props: { collection: res.response, className: "template-color-1" },
    };
}

const ProvenanceHash = ({ collection }) => (
    <Wrapper>
        <SEO pageTitle="Provenance Hash" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Provenance Hash" />
            <ProvenanceHashArea collection={collection} />
        </main>
        <Footer />
    </Wrapper>
);

ProvenanceHash.propTypes = {
    collection: PropTypes.shape({}),
};

export default ProvenanceHash;
