import { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import CreateMultipleArea from "@containers/create-multiple";
import CreateCollectionProgressArea from "@containers/create-collection-progress";
import { toast } from "react-toastify";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const CreateMultiple = () => {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [json, setJson] = useState({});
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [status, setStatus] = useState("");
    const cookies = parseCookies();
    const baseURL =
        process.env.NEXT_PUBLIC_API_URL || "https://the-backend.fly.dev";

    const apiGet = async (route, headers) => {
        const response = await fetch(`${baseURL}/api/${route}`, {
            method: "GET",
            headers,
        });
        return response;
    };

    const apiPost = async (route, payload, headers) => {
        const response = await fetch(`${baseURL}/api/${route}`, {
            method: "POST",
            headers: {
                ...headers,
            },
            body: payload,
        });
        return response;
    };

    const handleSend = async (
        selectedImage,
        selectedBanner,
        selectedJson,
        slug
    ) => {
        if (!selectedImage) {
            toast.error("Please select the image to upload");
            return;
        }
        if (!selectedBanner) {
            toast.error("Please select the banner to upload");
            return;
        }
        if (!selectedJson) {
            toast.error("Please select the json to upload");
        }
        setJson(selectedJson);
        setUploading(true);
        setStatus("Verifying to create a new collection...");
        try {
            const token = cookies["token"];
            // Check slug availability
            const collection = await apiGet(`collections/${slug}`, {
                "x-auth-token": token,
            });
            if (collection.status === 200) {
                setStatus(
                    "Collection slug already exists. Please use another one."
                );
                throw new Error("Collection slug exists. Please change it.");
            }

            // Create collection
            const form = new FormData();
            Object.keys(selectedJson).map((key) => {
                const value = selectedJson[key];
                form.append(
                    key,
                    typeof value !== "string" ? JSON.stringify(value) : value
                );
            });
            form.append("slug", slug);
            form.append("collection_image", selectedImage);
            form.append("collection_banner", selectedBanner);
            setStatus("Creating a new collection...");
            const response = await apiPost("collections", form, {
                "x-auth-token": token,
            });
            if (response.status !== 200) {
                const result = await response.json();
                setStatus("Failed to create a collection");
                throw new Error(result.error);
            }

            setStatus(
                "Initializing and deploying a collection... Please wait."
            );
            const interval = setInterval(async () => {
                try {
                    const result = await apiGet(`collections/${slug}`, {
                        "x-auth-token": token,
                    });
                    if (result.status === 200) {
                        const data = await result.json();
                        if (data.status !== "pending") {
                            clearInterval(interval);
                            setIsSuccess(true);
                            toast.success(
                                `Successfully created a collection - ${data.name}`
                            );
                            router.push({
                                pathname: `/collections/${slug}`,
                            });
                            setStatus(
                                `Successfully created a collection - ${data.name}`
                            );
                        } else if (data.status === "failure") {
                            setStatus(
                                `Failed to create a collection: ${data.statusMessage}`
                            );
                            toast.error(
                                `Failed to create a collection: ${data.statusMessage}`
                            );
                            clearInterval(interval);
                            setIsError(true);
                        }
                    } else {
                        setStatus("Failed to create a collection");
                        toast.error("Failed to create a collection");
                        clearInterval(interval);
                        setIsError(true);
                    }
                } catch (err) {
                    setStatus("Failed to create a collection");
                    toast.error(`Error: ${err.message}`);
                    setIsError(true);
                }
            }, 3000);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
            setIsError(true);
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle="Create New" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Create New File"
                    pageTitle1=""
                    currentPage="create"
                />
                {!uploading ? (
                    <CreateMultipleArea handleSend={handleSend} />
                ) : (
                    <CreateCollectionProgressArea
                        name={json.name}
                        slug={json.slug}
                        error={isError}
                        status={status}
                        success={isSuccess}
                    />
                )}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default CreateMultiple;
