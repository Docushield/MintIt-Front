import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import PropTypes from "prop-types";
import Breadcrumb from "@components/breadcrumb";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CollectionDetailsArea from "@containers/collection-details";
// import CollectionArea from "@containers/collection/layout-03";

// demo data
import collectionData from "../../data/collections.json";

// export async function getStaticProps(context) {
//     const slug = context.params.slug;

//     try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//             `https://the-backend.fly.dev/api/collections/${slug}`,
//             {
//                 method: "GET",
//                 headers: {
//                     "x-auth-token": token,
//                 },
//             }
//         ).then((res) => res.json());

//         return { props: { collection: response } };
//     } catch (error) {
//         return {
//             props: {
//                 error: error.message,
//             },
//         };
//     }
// }

const CollectionDetails = ({ collection }) => (
    <Wrapper>
        <SEO pageTitle="Collection Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Collection Details"
                currentPage="Collection Details"
            />
            <CollectionDetailsArea collection={collection} />
        </main>
        <Footer />
    </Wrapper>
);

export async function getStaticPaths() {
    return {
        paths: collectionData.map(({ slug }) => ({
            params: {
                slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const collection = collectionData.find(({ slug }) => slug === params.slug);
    return {
        props: {
            className: "template-color-1",
            collection,
        }, // will be passed to the page component as props
    };
}

CollectionDetails.propTypes = {
    collection: PropTypes.shape({}),
};

export default CollectionDetails;