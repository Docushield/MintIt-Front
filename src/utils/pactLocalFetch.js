import Pact from "pact-lang-api";

export const pactLocalFetch = async (pactCode) => {
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    const networkId = process.env.NEXT_PUBLIC_NETWORK_ID;
    const pactHost = process.env.NEXT_PUBLIC_CHAIN_API_HOST;
    const pactGasLimit = 150000;
    const pactGasPrice = 0.00000001;
    const apiHost = `${pactHost}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
    try {
        let command = await Pact.api.prepareExecCmd(
            [],
            new Date().toISOString(),
            pactCode,
            {},
            Pact.lang.mkMeta(
                "",
                chainId,
                pactGasPrice,
                pactGasLimit,
                Math.floor(Date.now() / 1000),
                86400
            ),
            networkId
        );

        const response = await fetch(`${apiHost}/api/v1/local`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(command),
        });

        const respObject = await response.json();

        if (
            !respObject ||
            !respObject.result ||
            respObject.result.status !== "success"
        )
            return null;
        return respObject;
    } catch (error) {
        console.log(error);
        return { error: error.message || error };
    }
};
