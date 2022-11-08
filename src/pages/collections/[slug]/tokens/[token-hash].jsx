import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TokenDetailsArea from "@containers/product-details/token-details";
import { pactLocalFetch } from "@utils/pactLocalFetch";
import { fetchAPI } from "@utils/fetchAPI";
import { parseCookies } from "nookies";

const TokenHash = ({ token, slug, collection }) => (
    <Wrapper>
        <SEO pageTitle="Product Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Product Details"
                pageTitle1=""
                currentPage="Product Details"
            />
            <TokenDetailsArea
                product={token}
                slug={slug}
                collection={collection}
            />
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
    const cookies = parseCookies();
    const slug = context.query.slug;
    const hash = context.query["token-hash"];
    const cres = await fetchAPI(`api/collections/${slug}`, cookies);
    const collection = cres.response;
    try {
        const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
        const pactCode = `(${smartContract}.get-nft "${collection.name}" "${hash}")`;
        const fetchRes = await pactLocalFetch(pactCode);
        if (fetchRes == null) {
            //blockchain request failed
            return {
                props: {
                    slug,
                    token: {},
                    className: "template-color-1",
                    collection,
                },
            };
        } else {
            return {
                props: {
                    slug,
                    token: fetchRes.result.data,
                    className: "template-color-1",
                    collection,
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
                collection,
            },
        };
    }
}

TokenHash.propTypes = {
    token: PropTypes.shape({}),
    collection: PropTypes.shape({}),
};

export default TokenHash;
