import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import Product from "@components/product/layout-01";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import { pactLocalFetch } from "@utils/pactLocalFetch";

export async function getServerSideProps() {
    const smartContract = process.env.NEXT_PUBLIC_CONTRACT;
    try {
        const pactCode = `(${smartContract}.search-nfts-by-collection "Abdur - mcol12")`;
        let tokens = [];
        const fetchRes = await pactLocalFetch(pactCode);
        if (fetchRes !== null) {
            tokens = fetchRes.result.data;
        }
        return {
            props: {
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

const Purchase = ({ tokens }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Purchase NFTs" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Purchase NFTs"
                    pageTitle1=""
                    currentPage="Purchase NFTs"
                />
                <TabContainer defaultActiveKey="nav-all">
                    <div className="container pt-5">
                        <h2 className="text-center my-5">Purchase NFTs</h2>
                        <div className="row g-5 d-flex">
                            <div className="col-12">
                                <div className="tab-wrapper-one">
                                    <nav className="tab-button-one">
                                        <Nav
                                            className="nav nav-tabs"
                                            id="nav-tab"
                                            role="tablist"
                                        >
                                            <Nav.Link
                                                as="button"
                                                eventKey="nav-all"
                                            >
                                                NFTs On Sale
                                            </Nav.Link>
                                        </Nav>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <TabContent className="tab-content rn-bid-content">
                            <TabPane eventKey="nav-all">
                                <div className="row">
                                    {tokens?.length > 0 ? (
                                        <>
                                            {tokens.map((prod) => (
                                                <div
                                                    key={prod.id}
                                                    className="col-5 col-lg-4 col-md-3 col-sm-4 col-6 my-3"
                                                >
                                                    <Product
                                                        overlay
                                                        title={
                                                            prod[
                                                                "collection-name"
                                                            ]
                                                        }
                                                        slug="abdur---mcol12"
                                                        hash={
                                                            prod[
                                                                "content-hash"
                                                            ] || prod["hash"]
                                                        }
                                                        image={{
                                                            src: prod.revealed
                                                                ? `https://ipfs.io/ipfs/${prod["content-uri"].data}`
                                                                : "/images/collection/placeholder.png",
                                                        }}
                                                        //dummy data
                                                        price={{
                                                            amount: "",
                                                            currency: "KDA",
                                                        }}
                                                        revealed={prod.revealed}
                                                        index={
                                                            prod.index ||
                                                            (prod["mint-index"]
                                                                ? prod[
                                                                      "mint-index"
                                                                  ].int
                                                                : "")
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="row text-center">
                                            <p>No tokens to show</p>
                                        </div>
                                    )}
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </TabContainer>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Purchase;
