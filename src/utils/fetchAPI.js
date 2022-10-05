export const fetchAPI = async (url, cookies) => {
    const baseURL = process.env.API_URL || "https://the-backend.fly.dev";

    try {
        const token = cookies["token"];
        const fetchedJson = await fetch(`${baseURL}/${url}`, {
            method: "GET",
            headers: {
                "x-auth-token": token,
            },
        });
        const response = await fetchedJson.json();
        return { response };
    } catch (error) {
        return { error: error.message || error };
    }
};
