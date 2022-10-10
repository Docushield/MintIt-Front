import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import { pactLocalFetch } from "@utils/pactLocalFetch";

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
    const slug = context.query.slug;
    const collectionName = slug.replace(/-/g, " ");
    const hash = context.query["token-hash"];
    try {
        const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
        const pactCode = `(${smartContract}.get-nft "${collectionName}" "${hash}")`;
        const fetchRes = await pactLocalFetch(pactCode);
        if (fetchRes == null) {
            //blockchain request failed
            return {
                props: {
                    slug,
                    token: {},
                    className: "template-color-1",
                },
            };
        } else {
            return {
                props: {
                    slug,
                    token: fetchRes.result.data,
                    className: "template-color-1",
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: error.message,
                token: {},
                slug,
                className: "template-color-1",
            },
        };
    }
}

TokenHash.propTypes = {
    token: PropTypes.shape({}),
};

export default TokenHash;
