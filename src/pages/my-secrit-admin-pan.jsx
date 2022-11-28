import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import AdminLogin from "@components/admin";
const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "https://the-backend.fly.dev";

const checkStatus = async () => {
    const response = await fetch(`${baseURL}/api/collections/get-status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (response.status == 400) {
        return false;
    } else if (response.status == 200) {
        const resJson = await response.json();
        return resJson;
    }
};

export async function getStaticProps() {
    let status = await checkStatus();
    return { props: { className: "template-color-1", status: status } };
}

const Admin = ({ status }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Admin" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Admin"
                    pageTitle1=""
                    currentPage="Admin"
                />
            </main>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <AdminLogin status={status} />
                    </div>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Admin;
