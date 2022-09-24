const ProvenanceHashArea = ({ collectionName }) => {
    return (
        <div className="container mt-5">
            <h2 className="provenance-headline">
                Collection Name Provenance Record
            </h2>
            <p>
                This page presents the provenance record of each{" "}
                {collectionName} NFT that will ever exist. Firstly, each piece
                of content from the collection is hashed used Blake2b algorithm.
                Then a string is obtained by concatenating Blake2b of each{" "}
                {collectionName} content piece in the specific order as listed
                below. The final proof or provenance hash is obtained by hashing
                the the concatenated string. This is the final provenance
                record.
            </p>
            <div className="divider"></div>

            <h4 className="mb-5">IMPORTANT INFORMATION</h4>
            <p>
                Each Bored Ape token ID is assigned to an artwork image from the
                initial sequence with this formula:
            </p>
            <p className="my-5 text-center">
                (tokenId + startingIndex) % 10000 → Initial Sequence Index
            </p>
            <p>Here's the relevant information:</p>
            <table className="my-5 provenance_blue_field_table">
                <tr>
                    <td className="text-end">FINALIZED STARTING INDEX</td>
                    <td>8853</td>
                </tr>

                <tr>
                    <td className="text-end">PROVENANCE HASH</td>
                    <td>
                        cc354b3fcacee8844dcc9861004da081f71df9567775b3f3a43412752752c0bf
                    </td>
                </tr>
            </table>
            <p>CONCATENATED HASH STRING</p>
            <textarea readOnly className="fs-6 hash-content">
                c92b0386542d8beb8fb167aed611e73c5f30250a083f54edf78653946a8a6913ba2ea17148a6b4fd17df39b4c5531d860c565f465c866213806bb8cfb96ada247edf3c2c26498ead3f4144c5d43509bbbaa2317edc3571ccd54be795705b2a8e6e89bf24717b39009dd7b8e742018602a7adb32762c27e2735b3bd38d45641e2a5a2a50e5ff57ae1234f4a8fa4c2630e9a215d46aa4bedd761e35d654e41eefeb80baadd4c5ddb1be8b3d21ef7ffde175b77c9a652dfae3b29971d8907281c632091eb5bf983a3b5beac921fa66e6aa1cb5bfdc6965b173c8e2697d8614b681805c1204e21a6cad5648d87c906d18232b9083a8cb1ed47e2a11405f5057f66ddf9b5c92daad7296a5f90e8f91401a35c068755067fab692ac6cff0e92bd3400f3f005e81f781ed1d492b2580fed6aef2b7b28396b11d38c7f20f345df212ddaa12c663e9408c16cf36392c05c7143713ebc79b83993131436467190d7cdbd91a3549711dd8e202ffe9da26db2618d46d74b25184875fe3c5aed905bafc0325ff7d336fe4ef10cee64950863317cabc3ebc16ac2e57f550dbde1294215aa68524ec91e0efd6e63a3880281f048a24fbfb8ed564851b9bcc2af3cb32a4b50b053d56f6c243cc67c89b6b05ad892a67d4cd7ebf34db38b35c66402a90780a8e746fa878da423b4c195c9b8baebdf45ef108663900e97dac11dcf39db2cb0634c4317a5ab7cb0780fe353009e1fca6c0623a19536c432cbca916be405cd2b3e3d36e8c73f61da88e4163e64c801dc558c49dd0daca1ca4614bd90524285ab936f
            </textarea>
            <div className="divider"></div>
            <h4>ROVENANCE RECORD</h4>
            <p>
                The table below lists the Original Index at Creation, Assigned
                Token ID, Blake2b Hash, and the IPFS link of each{" "}
                {collectionName} content piece.
            </p>
            <table className="my-5 text-center">
                <tr>
                    <th>INITIAL SEQUENCE INDEX</th>
                    <th>ASSIGNED TOKEN ID</th>
                    <th>BLACKE2B HASH</th>
                    <th>IPFS HASH</th>
                </tr>
                <tr>
                    <td>0</td>
                    <td>1147</td>
                    <td>
                        c92b0386542d8beb8fb167aed611e73c5f30250a083f54edf78653946a8a6913
                    </td>
                    <td>
                        <a
                            href="https://ipfs.io/ipfs/QmdUXVtRxKhdVhjPXCUxZGyXNHn5e2oS6pt8enPXo7X4Hk"
                            target="_blank"
                        >
                            QmdUXVtRxKhdVhjPXCUxZGyXNHn5e2oS6pt8enPXo7X4Hk
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default ProvenanceHashArea;
