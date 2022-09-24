import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import Breadcrumb from "@components/breadcrumb";
import ProvenanceHashArea from "@containers/provenance-hash";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.params.slug;
    const baseURL = process.env.API_URL || "https://the-backend.fly.dev";

    try {
        const token = cookies["token"];
        const response = await fetch(`${baseURL}/api/collections/${slug}`, {
            method: "GET",
            headers: {
                "x-auth-token": token,
            },
        }).then((res) => res.json());

        return {
            props: { collection: response, className: "template-color-1" },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
                className: "template-color-1",
            },
        };
    }
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
