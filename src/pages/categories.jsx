import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-02";

// Demo data
import categoryData from "../data/categories.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home02 = () => (
    <Wrapper>
        <SEO pageTitle="Categories" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Categories" currentPage="Categories" />
            <ExploreProductArea
                data={{
                    section_title: {
                        title: "Explore Category Products",
                    },
                    products: categoryData,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export default Home02;
