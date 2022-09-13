import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CreateMultipleArea from "@containers/create-multiple";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const CreateMultiple = () => (
    <Wrapper>
        <SEO pageTitle="Create New" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Create New File" />
            <CreateMultipleArea />
        </main>
        <Footer />
    </Wrapper>
);

export default CreateMultiple;
