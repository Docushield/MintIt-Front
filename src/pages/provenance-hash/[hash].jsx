import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import { parseCookies } from "nookies";
import ProvenanceHashArea from "@containers/provenance-hash";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const hash = context.params.hash;
    const baseURL = process.env.API_URL || "https://the-backend.fly.dev";

    return { props: { className: "template-color-1", collectionName: hash } };
}

const ProvenanceHash = ({ collectionName }) => (
    <Wrapper>
        <SEO pageTitle="Provenance Hash" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Provenance Hash" />
            <ProvenanceHashArea collectionName={collectionName} />
        </main>
        <Footer />
    </Wrapper>
);

export default ProvenanceHash;
