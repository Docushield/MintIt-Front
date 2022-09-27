import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import { TextType, SectionTitleType } from "@utils/types";

const QuoteArea = ({ space, className, data }) => (
    <div
        className={clsx(
            "rn-about-Quote-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g-5 d-flex align-items-center">
                {/* <div className="col-lg-6">
                    <div className="rn-about-title-wrapper">
                        {data?.section_title && (
                            <SectionTitle {...data.section_title} />
                        )}
                    </div>
                </div> */}
                {/* <div className="col-lg-6"> */}
                <div
                    className="rn-about-wrapper"
                    data-sal="slide-up"
                    data-sal-duration="800"
                    data-sal-delay="150"
                >
                    <p>
                        MINT-IT is a decentralized NFT minting platform and
                        marketplace that allows creators to mint collections of
                        all kinds of NFTs and collectibles on the Kadena
                        blockchain. In this marketplace, users can explore
                        digital assets in various categories, including videos,
                        trading cards, music, art, and more. MINT-IT is built
                        with scalability in mind, this implies lower transaction
                        fees in comparison to other marketplaces. Kadena is the
                        only scalable layer-1 PoW blockchain, assuring speed,
                        security, and decentralization. With Kadena’s
                        multi-chain architecture, the higher the TPS on Kadena,
                        the more energy efficient it becomes. Thus, users won’t
                        have to worry about their energy footprint when using
                        our platform. Existing platforms on other blockchains
                        control marketplace requirements like royalties. With
                        MINT-IT, we offer true on-chain NFT sales using Pacts,
                        this means that royalties will live forever with NFTs.
                        MINT-IT is user-oriented, we understand that anonymity
                        is one of the most important building blocks of Web3 and
                        hence do not require participants to KYC in order to use
                        our platform. You can sign-up using your email address
                        and password from anywhere at any time and get started
                        with minting or trading NFTs! MINT-IT is a brainchild of
                        Docushield, a Web3 document and cloud storage solution
                        built on Kadena and for the masses. We at Docushield saw
                        the need for MINT-IT in Kadena’s NFT community and
                        created the very first NFT minting and marketplace
                        platform on Kadena. This has given us a first movers
                        advantage and much room needed to set the pace while
                        building something unique at the forefront of mass
                        adoption. The Docushield and MINT-IT team always welcome
                        community feedback and are happy to answer all your
                        questions. This is one of many ground projects that will
                        make up the Docushield Ecosystem. Feel free to reach out
                        to our team on our socials or through customer support.
                    </p>
                </div>
                {/* </div> */}
            </div>
        </div>
    </div>
);

QuoteArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        texts: PropTypes.arrayOf(TextType),
    }),
};

QuoteArea.defaultProps = {
    space: 1,
};

export default QuoteArea;
