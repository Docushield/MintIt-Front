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
    const res = await fetchAPI(
        `api/collections/${slug}/tokens/${hash}`,
        cookies
    );
    const backendToken = res.response;
    backendToken["creator"] = backendToken["owner"];
    backendToken["revealed"] = backendToken["revealedAt"] != null;

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
                    token: backendToken,
                    className: "template-color-1",
                    collection,
                },
            };
        } else {
            backendToken["content-uri"] = fetchRes.result.data["content-uri"];
            backendToken["spec"] = fetchRes.result.data["spec"];
            return {
                props: {
                    slug,
                    token: backendToken,
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
                token: backendToken,
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
