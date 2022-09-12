import { useRouter } from "next/router";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";

// demo data
import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Collection = () => {
    const router = useRouter();

    const onClick = () => {
        console.log("on click");
        router.push({
            pathname: "/mycollection",
        });
    };

    return (
        <Wrapper>
            <SEO pageTitle="Collection" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Our Collection"
                    currentPage="Collection"
                />
                <CollectionArea
                    data={{
                        collections: collectionsData,
                        section_title: {
                            title: "Projects Launching",
                        },
                    }}
                    onClick={onClick}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Collection;
