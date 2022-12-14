import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CreateCollectionProgressArea from "@containers/create-collection-progress";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const CreateCollectionProgress = () => (
    <Wrapper>
        <SEO pageTitle="Create Collection Progress" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Creating Collection..." />
            <CreateCollectionProgressArea />
        </main>
        <Footer />
    </Wrapper>
);

export default CreateCollectionProgress;
