import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import Accordion from "@ui/accordion";

const SupportArea = ({ className, space }) => (
    <div
        className={clsx(
            "rn-support-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g-6">
                <div className="col-lg-6">
                    <div className="rn-support-read">
                        <div className="read-card">
                            <h4>Getting Started as a Collector</h4>
                            <div className="content">
                                <p>
                                    Our platform allows anyone from anywhere to
                                    engage in minting, trading, and collecting
                                    NFTs. The first step is to create and/or
                                    connect your Kadena native wallet to our
                                    website.
                                </p>
                                <p>
                                    Make sure you have funds on Chain-8. That’s
                                    it, you’re are all set! You can now start
                                    browsing through collections or individual
                                    NFTs using filters.
                                </p>
                            </div>
                        </div>
                        <div className="read-card">
                            <h4>Creating and Launching an NFT Collection</h4>
                            <div className="content">
                                <p>
                                    We offer the tools and support for users to
                                    easily launch an NFT or Collection. Once
                                    you’ve set up and connected your wallet,
                                    purchase a Creator Pass to get access to all
                                    our tools.
                                </p>
                                <p>
                                    Then, you can use our NFT-Generator WebApp
                                    to create your collection using layers and
                                    attributes. Once done, upload, verify, and
                                    submit the required information here.
                                </p>
                            </div>
                        </div>
                        <div className="read-card">
                            <h4>Why are Access-Level NFTs?</h4>
                            <div className="content">
                                <p>
                                    Our platform seamlessly integrates
                                    access-level NFT passes for our users. Each
                                    pass has a different use case on our
                                    interface. Purchasing and owning one of
                                    these passes will unlock its utility. Users
                                    require a Creator Pass to create and launch
                                    NFT collections. Our limited collection of
                                    Ads Pass offers advertising placeholders
                                    across the Docushield ecosystem with a
                                    365-day rotation.
                                </p>
                            </div>
                        </div>
                        <Button path="/create" className="mr--15">
                            Create
                        </Button>
                        <Button path="/contact" className="btn-primary-alta">
                            Contact Us
                        </Button>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="support-accordion">
                        <Accordion
                            defaultActiveKey={0}
                            items={[
                                {
                                    id: 0,
                                    title: "How do Royalties work on MINT-IT?",
                                    description:
                                        "<strong>NFT royalties are payments that compensate original NFT creators during a point-of-sale.</strong> Royalties are usually set by the owner during the minting process.  NFT collection creators on MINT-IT have the option of setting up royalties where a share of each sale is sent to their wallet address.",
                                },
                                {
                                    id: 1,
                                    title: "What’s an NFT?",
                                    description:
                                        '<strong>NFT stands for "non-fungible token."</strong> An NFT is a digital asset on a blockchain with unique identification codes and metadata that distinguish them from each other. They come in different forms such as art, real estate, books, music, or videos. NFTs can be considered modern-day collectibles. An NFT collection is a series of NFTs that is created or minted by a specific creator.',
                                },
                                {
                                    id: 2,
                                    title: "How Decentralized is MINT-IT?",
                                    description:
                                        "<strong>We built the platform with decentralization in mind, a core Web3 value.</strong> All transactions are carried out on the blockchain allowing users to have access to all the records. This makes it easy to verify the rich manifests and Merkle trees. Our NFT contracts also utilize creator-keys that act as “access-control” to certain parts of the deployed collection.",
                                },
                                {
                                    id: 3,
                                    title: "I’m a creator who wants to get started. Can I get support from MINT-IT?",
                                    description:
                                        "<strong>Absolutely!</strong> NFT creators who are having any challenges can reach out to MINT-IT support on Discord, Telegram, or through our website. Our team will be happy to assist you.",
                                },
                                {
                                    id: 4,
                                    title: "Can I Launch a Custom NFT Collection with a New Concept?",
                                    description:
                                        "We do offer a more custom NFT minting experience to select projects where it’s possible to implement their ideas. In fact, we encourage innovation as we help set the standard of NFTs on Kadena.",
                                },
                                {
                                    id: 5,
                                    title: "Are NFTs on MINT-IT utilizing Kadena’s Marmalade Standard?",
                                    description:
                                        "Our platform is the first to make full use of Marmalade, offering a seamless user experience! What’s really cool is that royalties are enforced on-chain across multiple marketplaces. NFT collectors can use MINT-IT to trade NFTs launched on Marmalade but not through MINT-IT!",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

SupportArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
};
SupportArea.defaultProps = {
    space: 1,
};

export default SupportArea;
