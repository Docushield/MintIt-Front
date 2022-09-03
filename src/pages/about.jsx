import { useState } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AboutArea from "@containers/about/layout-02";
import QuoteArea from "@containers/quote-area";
import FunfactArea from "@containers/funfact";
import CTAArea from "@containers/cta";
import BlogArea from "@containers/blog/layout-01";
import { normalizedData } from "@utils/methods";
import { getAllPosts } from "../lib/api";
import Breadcrumb from "@components/breadcrumb";

// Demo data
import aboutData from "../data/innerpages/about.json";

const About = ({ posts }) => {
    const content = normalizedData(aboutData?.content || []);
    
    
    const [pageNumber, setPageNumber] = useState(1);

    const onPageChageHandler = (page) => {
        console.log("Mint page: ", page);
        setPageNumber(page);
    };

    return (
        <Wrapper>
            <SEO pageTitle="About" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="About"
                    pageTitle1="Activity"
                    currentPage="About"
                    onPageChageHandler={onPageChageHandler}
                />
                <AboutArea data={content["about-section"]} />
                {/* <QuoteArea data={content["quote-section"]} /> */}
                {/* <FunfactArea data={content["funfact-section"]} /> */}
                <CTAArea data={content["cta-section"]} />
                <BlogArea data={{ ...content["blog-section"], posts }} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticProps() {
    const posts = getAllPosts([
        "title",
        "date",
        "slug",
        "image",
        "category",
        "timeToRead",
    ]);

    return {
        props: {
            posts: posts.slice(0, 4),
            className: "template-color-1",
        },
    };
}

About.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
};
export default About;
