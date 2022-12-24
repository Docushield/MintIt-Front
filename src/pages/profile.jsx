import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro/layout-02";
import AuthorProfileArea from "@containers/author-profile/layout-02";
import { pactLocalFetch } from "@utils/pactLocalFetch";
import { parseCookies } from "nookies";

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        const account = cookies["userAccount"];
        const smartContract = process.env.NEXT_PUBLIC_CONTRACT;

        //fetch acp tokens form marmalade
        let acp_tokens = [];
        const acp_manifest_pact = `(marmalade.ledger.get-manifest "t:mintit-creator-access-pass")`;
        const acp_manifest_res = await pactLocalFetch(acp_manifest_pact);
        const acp_detail_pact = `(marmalade.ledger.details "t:mintit-creator-access-pass" "${account}")`;
        const acp_detail_res = await pactLocalFetch(acp_detail_pact);
        if (acp_detail_res != null && acp_manifest_res != null) {
            acp_tokens = Array(
                parseInt(acp_detail_res.result.data.balance)
            ).fill(acp_manifest_res.result.data.data[0]);
        }

        //fetch doc_bond tokens form marmalade
        let bond_tokens = [];
        const bond_manifest_pact = `(marmalade.ledger.get-manifest "t:doc-bond-nft")`;
        const bond_manifest_res = await pactLocalFetch(bond_manifest_pact);
        const bond_detail_pact = `(marmalade.ledger.details "t:doc-bond-nft" "${account}")`;
        const bond_detail_res = await pactLocalFetch(bond_detail_pact);
        if (bond_detail_res != null && bond_manifest_res != null) {
            bond_tokens = Array(
                parseInt(bond_detail_res.result.data.balance)
            ).fill(bond_manifest_res.result.data.data[0]);
        }

        const token_pact = `(${smartContract}.search-nfts-by-owner "${account}")`;
        const token_res = await pactLocalFetch(token_pact);
        let token_nfts = [];
        if (token_res != null) token_nfts = token_res.result.data;
        return {
            props: {
                account: account,
                tokens: token_nfts,
                others: acp_tokens.concat(bond_tokens),
                className: "template-color-1",
            },
        };
    } catch (error) {
        return {
            props: {
                className: "template-color-1",
                error: error.message,
                tokens: [],
                others: [],
                account: "",
            },
        };
    }
}

const Author = ({ tokens, account, others }) => (
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            <AuthorIntroArea data={account} />
            <AuthorProfileArea data={{ products: tokens, others: others }} />
        </main>
        <Footer />
    </Wrapper>
);

export default Author;
