import { PROOF_FOR_STARTING_INDEX } from "src/lib/constants";

const ProvenanceHashArea = ({ collection, startIndex, tokens }) => {
    console.log(collection);
    const concatenatedHash = tokens.map((token) => token.hash).join("");
    return (
        <div className="container mt-5">
            <h2 className="fst-italic">{collection.name} Provenance Record</h2>
            <p>
                This page presents the provenance record of each{" "}
                {collection.name} NFT that will ever exist. Firstly, each piece
                of content from the collection is hashed used Blake2b algorithm.
                Then a string is obtained by concatenating Blake2b of each{" "}
                {collection.name} content piece in the specific order as listed
                below. The final proof or provenance hash is obtained by hashing
                the the concatenated string. This is the final provenance
                record.
            </p>
            <div className="divider"></div>

            <h4 className="mb-5">IMPORTANT INFORMATION</h4>
            <p>
                Each {collection.name} token ID is assigned to an artwork image
                from the initial sequence with this formula:
            </p>
            <pre>
                <code>
                    {PROOF_FOR_STARTING_INDEX}
                </code>
            </pre>
            <p>Here's the relevant information:</p>
            <table className="my-5 provenance_blue_field_table">
                <tr>
                    <td className="text-end">FINALIZED STARTING INDEX</td>
                    <td>8853</td>
                </tr>

                <tr>
                    <td className="text-end">PROVENANCE HASH</td>
                    <td>{collection["provenance-hash"]}</td>
                </tr>
            </table>
            <p>CONCATENATED HASH STRING</p>
            <textarea
                readOnly
                className="fs-6 hash-content"
                value={concatenatedHash}
            ></textarea>
            <div className="divider"></div>
            <h4>PROVENANCE RECORD</h4>
            <p>
                The table below lists the Original Index at Creation, Assigned
                Token ID, Blake2b Hash, and the IPFS link of each{" "}
                {collection.name} content piece.
            </p>
            <table className="my-5 text-center">
                <thead>
                    <tr>
                        <th>INITIAL SEQUENCE INDEX</th>
                        <th>ASSIGNED TOKEN ID</th>
                        <th>BLACKE2B HASH</th>
                        <th>IPFS HASH</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.length > 0 &&
                        tokens.map((token, index) => (
                            <tr key={token.hash}>
                                <td>{index}</td>
                                <td>
                                    {(startIndex + index) % collection.size}
                                </td>
                                <td>{token.hash}</td>
                                <td>
                                    <a
                                        href={`https://ipfs.io/ipfs/${token.contentUri.data}`}
                                        target="_blank"
                                    >
                                        {token.contentUri.data}
                                    </a>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProvenanceHashArea;
