import { useState } from "react";
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
    const [uploading, setUploading] = useState(false);
    const [json, setJson] = useState({});
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const apiGet = async (route, headers) => {
        const response = await fetch(
            `https://the-backend.fly.dev/api/${route}`,
            {
                method: "GET",
                headers,
            }
        );
        return response;
    };

    const apiPost = async (route, payload, headers) => {
        const response = await fetch(
            `https://the-backend.fly.dev/api/${route}`,
            {
                method: "POST",
                headers: {
                    ...headers,
                },
                body: payload,
            }
        );
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
        try {
            const token = localStorage.getItem("token");
            // Check slug availability
            const collection = await apiGet(`collections/${slug}`, {
                "x-auth-token": token,
            });
            if (collection.status === 200) {
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
            const response = await apiPost("collections", form, {
                "x-auth-token": token,
            });
            if (response.status !== 200) {
                const result = await response.json();
                throw new Error(result.error);
            }
            router.push({
                pathname: "/create-collection-progress",
            });
            notify();
            reset();
            setSelectedImage();
            setIsSuccess(true);
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
                <Breadcrumb pageTitle="Create New File" />
                {!uploading ? (
                    <CreateMultipleArea handleSend={handleSend} />
                ) : (
                    <CreateCollectionProgressArea
                        name={json.name}
                        slug={json.slug}
                        error={isError}
                        success={isSuccess}
                    />
                )}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default CreateMultiple;
