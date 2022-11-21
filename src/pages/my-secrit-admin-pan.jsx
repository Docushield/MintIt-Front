import { useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import AdminLogin from "@components/admin";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Admin = () => {
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
                        <AdminLogin />
                    </div>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Admin;
