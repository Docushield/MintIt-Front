import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import Breadcrumb from "@components/breadcrumb";
import CollectionDetailsIntroArea from "@containers/collection-details/collection-details-1";

const CollectionDetails = ({ collection, slug, tokens }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Collection Details" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Collection Details"
                    currentPage="Collection Details"
                />
                <CollectionDetailsIntroArea data={collection} tokens={tokens} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const slug = context.params.slug;
    const baseURL = process.env.API_URL || "https://the-backend.fly.dev";

    try {
        const token = cookies["token"];
        const response = await fetch(`${baseURL}/api/collections/${slug}`, {
            method: "GET",
            headers: {
                "x-auth-token": token,
            },
        }).then((res) => res.json());

        const tokens = await fetch(
            `${baseURL}/api/collections/${slug}/tokens`,
            {
                method: "GET",
                headers: {
                    "x-auth-token": token,
                },
            }
        ).then((res) => res.json());

        return {
            props: {
                collection: response,
                tokens: tokens,
                className: "template-color-1",
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
                tokens: [],
                className: "template-color-1",
            },
        };
    }
}

CollectionDetails.propTypes = {
    collection: PropTypes.shape({}),
};

export default CollectionDetails;
