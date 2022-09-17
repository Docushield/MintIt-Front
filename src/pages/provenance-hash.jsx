import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProvenanceHashArea from "@containers/provenance-hash";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const ProvenanceHash = () => (
    <Wrapper>
        <SEO pageTitle="Provenance Hash" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Provenance Hash" />
            <ProvenanceHashArea />
        </main>
        <Footer />
    </Wrapper>
);

export default ProvenanceHash;
