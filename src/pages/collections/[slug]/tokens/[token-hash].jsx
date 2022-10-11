import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";

const TokenHash = ({ token, slug }) => (
    <Wrapper>
        <SEO pageTitle="Product Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Product Details"
                pageTitle1=""
                currentPage="Product Details"
            />
            <ProductDetailsArea product={token} slug={slug} />
            {/* <ProductArea
                data={{
                    section_title: { title: "Recent View" },
                    products: recentViewProducts,
                }}
            />
            <ProductArea
                data={{
                    section_title: { title: "Related Item" },
                    products: relatedProducts,
                }}
            /> */}
        </main>
        <Footer />
    </Wrapper>
);

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.query.slug;
    const tokenHash = context.query['token-hash'];
    const res = await fetchAPI(`api/collections/${slug}/tokens/${tokenHash}`, cookies);
    const token = res.response;
    // const { categories } = product;
    // const recentViewProducts = shuffleArray(productData).slice(0, 5);
    // const relatedProducts = productData
    //     .filter((prod) => prod.categories?.some((r) => categories?.includes(r)))
    //     .slice(0, 5);
    return {
        props: {
            className: "template-color-1",
            token,
            slug,
            // recentViewProducts,
            // relatedProducts,
        },
    };
}

TokenHash.propTypes = {
    token: PropTypes.shape({}),
};

export default TokenHash;
