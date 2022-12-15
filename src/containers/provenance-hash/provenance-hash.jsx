const ProvenanceHashArea = ({ collection, tokens, concatenatedHashStr }) => {
    const startIndex = collection["starting-index"].int;
    tokens = tokens.sort((a, b) => a["mint-index"].int - b["mint-index"].int);
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
            <p>A random integer is generated using this formula:</p>
            <pre>
                <code className="formula">
                    <span className="red">(</span>
                    <span className="func">defun</span>{" "}
                    <span className="variable">random-integer</span>
                    <span className="operator">:</span>
                    <span className="type">integer</span>
                    <span className="purple">()</span>
                    <br />
                    <span className="blue">{"   "}(</span>
                    <span className="func">bind</span>{" "}
                    <span className="purple">(</span>
                    <span className="variable">chain-data</span>
                    <span className="purple">)</span>
                    <br />
                    <span className="blue">{"       "}&#x7B;</span>
                    <br />
                    <span className="operator"> {"      "}'</span>
                    <span className="variable">block-height</span>{" "}
                    <span className="operator">:=</span>{" "}
                    <span className="variable">block-height</span>
                    <span className="comma">,</span>
                    <br />
                    <span className="operator"> {"      "}'</span>
                    <span className="variable">block-time</span>{" "}
                    <span className="operator">:=</span>{" "}
                    <span className="variable">block-time</span>
                    <br />
                    <span className="blue">{"       "}&#x7D;</span>
                    <br />
                    <span className="purple">{"       "}(</span>
                    <span className="variable">round</span>{" "}
                    <span className="red">(</span>
                    <span className="operator">*</span>
                    <span className="variable">block-height</span>{" "}
                    <span className="blue">(</span>
                    <span className="variable">diff-time block-time</span>{" "}
                    <span className="purple">(</span>{" "}
                    <span className="variable">
                        time "1970-01-01T00:00:00Z"
                    </span>
                    <span className="purple">)</span>
                    <span className="blue">)</span>
                    <span className="red">)</span>
                    <span className="purple">)</span>
                    <br />
                    <span className="blue">{"   "})</span>
                    <br />
                    <span className="red">)</span>
                </code>
            </pre>

            <p className="mt-5 pt-5">
                The random integer generated is used to yield the random
                starting index for minting using this formula:
            </p>
            <pre className="mb-5 pb-5 code-block">
                <code className="formula">
                    <span className="red">(</span>
                    <span className="variable">starting-index</span>{" "}
                    <span className="blue">(</span>
                    <span className="func">mod</span>{" "}
                    <span className="purple">(</span>
                    <span className="variable">random-integer</span>
                    <span className="purple">)</span>{" "}
                    <span className="variable">size</span>
                    <span span className="blue">
                        )
                    </span>
                    <span className="red">)</span>
                </code>
            </pre>
            <p className="pt-5">Here's the relevant information:</p>
            <table className="my-5 provenance_blue_field_table">
                <tbody>
                    <tr>
                        <td className="text-end">FINALIZED STARTING INDEX</td>
                        <td>
                            <a
                                href={`${process.env.chainExplorer}/${collection.requestKey}`}
                            >
                                {collection["starting-index"].int}
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td className="text-end">PROVENANCE HASH</td>
                        <td>{collection["provenance-hash"]}</td>
                    </tr>
                </tbody>
            </table>
            <p>CONCATENATED HASH STRING</p>
            <textarea
                readOnly
                className="fs-6 hash-content"
                value={concatenatedHashStr}
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
                        <th>MINTING ORDER</th>
                        <th>BLAKE2B HASH</th>
                        <th>IPFS HASH</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.length > 0 &&
                        tokens
                            .filter(
                                (token) =>
                                    token.revealed || token.revealedAt > 0
                            )
                            .map((token) => (
                                <tr key={token["content-hash"]}>
                                    <td>{token["mint-index"].int}</td>
                                    <td>{token["content-hash"]}</td>
                                    <td>
                                        <div>
                                            {token.spec.type !== "mutating" ||
                                            !token.spec["sub-specs"] ? (
                                                <a
                                                    href={`https://ipfs.io/ipfs/${token["content-uri"].data}`}
                                                    target="_blank"
                                                >
                                                    {token["content-uri"].data}
                                                </a>
                                            ) : (
                                                <>
                                                    {token.spec[
                                                        "sub-specs"
                                                    ].map((spec) => (
                                                        <div
                                                            key={
                                                                spec[
                                                                    "content_uri"
                                                                ].data
                                                            }
                                                        >
                                                            <a
                                                                href={`https://ipfs.io/ipfs/${spec["content_uri"].data}`}
                                                                target="_blank"
                                                            >
                                                                {
                                                                    spec[
                                                                        "content_uri"
                                                                    ].data
                                                                }
                                                            </a>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProvenanceHashArea;
