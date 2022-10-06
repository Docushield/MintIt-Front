import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import { parseCookies } from "nookies";
import ProvenanceHashArea from "@containers/provenance-hash/provenance-hash-1";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const hash = context.params.hash;
    const baseURL = process.env.API_URL || "https://the-backend.fly.dev";

    const mockCollection = {
        name: "Crypto Kitties",
    };

    return {
        props: { className: "template-color-1", collection: mockCollection },
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

export default ProvenanceHash;
