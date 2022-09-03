import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import UpcomingProjectsArea from "@containers/upcoming-projects";

// Demo Data
import newCollectionData from "../data/new-collection.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}
const NewCollection = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("New Collection page: ", page);
        setPageNumber(page);
    };

    return (
    <Wrapper>
        <SEO pageTitle="New Collection" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="New Collection"
                pageTitle1="Activity"
                currentPage="New Collection"
                onPageChageHandler={onPageChageHandler}
            />
            <UpcomingProjectsArea
                data={{ upcomingProjects: newCollectionData }}
            />
        </main>
        <Footer space={2} />
    </Wrapper>
);
}
export default NewCollection;
