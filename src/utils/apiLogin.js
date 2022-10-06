export const apiPost = async (route, payload) => {
    const baseURL = process.env.API_URL || "https://the-backend.fly.dev";
    return fetch(`${baseURL}/api/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};

export const apiLogin = async (loginSignature) => {
    const { cmd, sigs } = loginSignature;

    const {
        meta: { sender: account },
    } = JSON.parse(cmd);

    return apiPost("auth", {
        account,
        command: cmd,
        signature: sigs[0].sig,
    });
};
