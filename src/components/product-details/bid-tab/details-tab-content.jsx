import PropTypes from "prop-types";
import TopSeller from "@components/top-seller/layout-01";
import { IDType, ImageType } from "@utils/types";
import Button from "@ui/button";
import WalletAddress from "@components/wallet-address";
import Anchor from "@ui/anchor";

const DetailsTabContent = ({
    owner,
    creator,
    properties,
    spec,
    slug,
    collection,
}) => {
    console.log(collection);
    return (
        <div className="rn-pd-bd-wrapper mt--20">
            {properties && <TopSeller name={owner} slug={slug} />}
            {properties && (
                <div className="rn-pd-sm-property-wrapper">
                    <h6 className="pd-property-title">Properties</h6>
                    <div className="property-wrapper">
                        {properties.map((property) => (
                            <div
                                key={property.id}
                                className="pd-property-inner"
                            >
                                <span className="color-body type">
                                    {property["trait_type"]}
                                </span>
                                <span className="color-white value">
                                    {property.value.length > 3 ||
                                    property.value.split(" ").length > 1
                                        ? property.value.slice(0, 3) + "..."
                                        : property.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="rn-pd-sm-property-wrapper mt-5">
                <h6 className="pd-property-title">More Information</h6>
                <Anchor path="/profile" className="address-wrapper">
                    <div className="pd-property-spec address">
                        <div>Creator:</div>
                        <div>
                            <WalletAddress
                                address={creator}
                                length={17}
                                lastLength={15}
                            />
                        </div>
                    </div>
                </Anchor>
                <div className="pd-property-spec">
                    Creator Roaylties:{" "}
                    {collection["sale-royalties"]["rates"][0].rate * 100} %
                </div>
                <div className="pd-property-spec">
                    MINT-IT Royalties:{" "}
                    {collection["mint-royalties"]["rates"][0].rate * 100} %
                </div>
                <div className="pd-property-spec">NFT Type: {spec.type}</div>
            </div>
            <Button
                className="mt-4"
                size="small"
                color="primary-alta"
                path={`/collections/${slug}/provenance-hash`}
            >
                View Provenance
            </Button>
        </div>
    );
};

DetailsTabContent.propTypes = {
    owner: PropTypes.shape({
        name: PropTypes.string,
        total_sale: PropTypes.number,
        slug: PropTypes.string,
        image: ImageType,
    }),
    properties: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            type: PropTypes.string,
            value: PropTypes.string,
        })
    ),
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            type: PropTypes.string,
            value: PropTypes.string,
        })
    ),
};

export default DetailsTabContent;
