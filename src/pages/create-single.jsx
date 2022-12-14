import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CreateSingleArea from "@containers/create-single";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const CreateSingle = () => (
    <Wrapper>
        <SEO pageTitle="Create New" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Create New File" />
            <CreateSingleArea />
        </main>
        <Footer />
    </Wrapper>
);

export default CreateSingle;
