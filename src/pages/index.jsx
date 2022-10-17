import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Particles from "@ui/particles";
import HeroArea from "@containers/hero/layout-05";
import TopSellerArea from "@containers/top-seller/layout-01";
import ExploreProductArea from "@containers/explore-product/layout-03";
import ServiceArea from "@containers/services/layout-01";
import CollectionArea from "@containers/collection/layout-01";
import CreatorArea from "@containers/creator/layout-03";
import { normalizedData } from "@utils/methods";
import { SSRProvider } from "react-bootstrap";
import { parseCookies } from "nookies";
import { fetchAPI } from "@utils/fetchAPI";
import { acpCollection } from "./collections/acp";
import { docbondCollection } from "./collections/docbond";

// Demo data
import homepageData from "../data/homepages/homepage.json";
import sellerData from "../data/sellers.json";
import productData from "../data/categories.json";
import Mint from "@components/constant-collections";

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);

    const res = await fetchAPI("api/collections", cookies);

    if ((res.response && res.response.error) || res.error) {
        return {
            props: {
                error: res.response.error || res.error,
                className: "template-color-1 with-particles",
                collections: [acpCollection, docbondCollection],
            },
        };
    }

    return {
        props: {
            collections: res.response
                .concat(acpCollection)
                .concat(docbondCollection),
            className: "template-color-1 with-particles",
        },
    };
}

const Home = ({ collections }) => {
    const content = normalizedData(homepageData?.content || []);

    return (
        <SSRProvider>
            <Wrapper>
                <SEO pageTitle="Home " />
                <Header />
                <main id="main-content">
                    <Particles />
                    <HeroArea
                        data={{
                            ...content["hero-section"],
                        }}
                    />
                    {/* <TopSellerArea
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                /> */}
                    <CollectionArea
                        data={{
                            ...content["collection-section"],
                            collections: collections,
                        }}
                    />
                    <ServiceArea data={content["service-section"]} />
                    {/* <CreatorArea data={{ creators: creatorData }} /> */}
                    {/* <ExploreProductArea
                        data={{
                            ...content["explore-product-section"],
                            products: productData,
                        }}
                    /> */}
                </main>
                <Footer />
            </Wrapper>
        </SSRProvider>
    );
};

export default Home;
