import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro/layout-01";
import AuthorProfileArea from "@containers/author-profile/layout-01";
import CollectionDetailsIntroArea from "@containers/collection-details/collection-details-2";

// Demo data
import collection from "../data/collection.json";
import productData from "../data/categories.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Author = () => (
    <Wrapper>
        <SEO pageTitle="MyCollection" />
        <Header />
        <main id="main-content">
            <CollectionDetailsIntroArea collection={collection} />
            <AuthorProfileArea
                data={{ products: productData, collections: collection }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export default Author;
