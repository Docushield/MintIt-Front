import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionDetailsIntroArea from "@containers/collection-details/collection-details-acp";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

export const acpCollection = {
    id: "60ad94a1-176f-4f01-a4aa-7b1e14031b27",
    creator:
        "k:4159aa0d1f1e6c119c532d9286746274c3cc46dadd50ffc486a38de502ad6855",
    description:
        "This is our first edition of the Alpha Creator Pass; a limited collection of 1000 passes that gives owners lifetime access to the MINT-IT platform and tools required to create and mint an NFT collection. Creators will be able to seamlessly deploy NFT collections that follow the Kadena Marmalade Standard. We have also incorporated IPFS (Interplanetary File Storage) hosting, a peer-to-peer file hosting network which we are using to store all NFT content on MINT-IT.",
    name: "Alpha Creator Pass",
    type: "public",
    "provenance-hash": "e8c7f1b927702f287e8bafe95e81feb1ak0efO02rca",
    "mint-starts": "2022-09-30T16:00:00.000Z",
    "premint-ends": "2022-10-07T16:00:00.000Z",
    "reveal-at": "2022-09-30T16:00:00.000Z",
    size: 1000,
    "mint-price": 150,
    "premint-price": 1,
    "token-list": [],
    createdAt: "2022-10-09T09:13:10.266Z",
    "mint-royalties": {
        rates: [
            {
                rate: 0.975,
                description: "creator",
                stakeholder:
                    "k:047bc663e6cdaccb268e224765645dd11573091f9ff2ac083508b46a0647ace0",
                "stakeholder-guard": {
                    keys: [
                        "047bc663e6cdaccb268e224765645dd11573091f9ff2ac083508b46a0647ace0",
                    ],
                    pred: "keys-all",
                },
            },
            {
                rate: 0.025,
                description: "mintit",
                stakeholder:
                    "k:d46967fd03942c50f0d50edc9c35d018fe01166853dc79f62e2fdf72689e0484",
                "stakeholder-guard": {
                    keys: [
                        "d46967fd03942c50f0d50edc9c35d018fe01166853dc79f62e2fdf72689e0484",
                    ],
                    pred: "keys-all",
                },
            },
        ],
    },
    "sale-royalties": {
        rates: [
            {
                rate: 0.025,
                description: "creator",
                stakeholder:
                    "k:047bc663e6cdaccb268e224765645dd11573091f9ff2ac083508b46a0647ace0",
                "stakeholder-guard": {
                    keys: [
                        "047bc663e6cdaccb268e224765645dd11573091f9ff2ac083508b46a0647ace0",
                    ],
                    pred: "keys-all",
                },
            },
            {
                rate: 0.025,
                description: "mintit",
                stakeholder:
                    "k:d46967fd03942c50f0d50edc9c35d018fe01166853dc79f62e2fdf72689e0484",
                "stakeholder-guard": {
                    keys: [
                        "d46967fd03942c50f0d50edc9c35d018fe01166853dc79f62e2fdf72689e0484",
                    ],
                    pred: "keys-all",
                },
            },
        ],
    },
    status: "success",
    statusMessage: "true",
    imageUrl: "/images/acp.png",
    bannerImageUrl: "/images/banner/acp_banner.png",
    slug: "acp",
    numMinted: 3,
    updatedAt: "2022-10-09T17:44:03.393Z",
};

const Acp = () => (
    <Wrapper>
        <SEO pageTitle="Alpha Creator Pass" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Collection Details"
                pageTitle1=""
                currentPage="Collection Details"
            />
            <CollectionDetailsIntroArea data={acpCollection} />
        </main>
        <Footer />
    </Wrapper>
);

export default Acp;
