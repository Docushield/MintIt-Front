import SEO from "@components/seo";
import { useState } from "react";
import Button from "@ui/button";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
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

export async function getServerSideProps() {
    let status = await checkStatus();
    console.log(status);
    return { props: { className: "template-color-1", status: status } };
}

const Admin = ({ status }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");
    const [checkM, setCheckM] = useState(status.minting);
    const [checkC, setCheckC] = useState(status.collection);
    const [disableB, setdisableB] = useState(false);
    const baseURL =
        process.env.NEXT_PUBLIC_API_URL || "https://the-backend.fly.dev";
    const onSubmit = async () => {
        if (user == "" || pass == "") {
            setError("please provide username and password.");
        } else {
            setError("");
        }
        setdisableB(true);
        const response = await fetch(`${baseURL}/api/auth/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ username: user, password: pass }),
        });
        if (response.status == 400) {
            setError("invalid username or password.");
            setToken("");
            setdisableB(false);
            return;
        } else if (response.status == 200) {
            const resJson = await response.json();
            setToken(resJson.token);
            setdisableB(false);
            return;
        }
    };

    const onSubmit2 = async () => {
        setdisableB(true);
        const response = await fetch(
            `${baseURL}/api/collections/update-status`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    collection: checkC,
                    minting: checkM,
                    token: token,
                }),
            }
        );
        if (response.status == 400) {
            const resJson = await response.json();
            setError2(resJson.error);
            setdisableB(false);
            return;
        } else if (response.status == 200) {
            setError2("Successfully updated setting.");
            setdisableB(false);
            return;
        }
    };
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
                        {token ? (
                            <div className="form-wrapper-one registration-area">
                                <h3 className="mb-5 text-center">
                                    change Site Settings
                                </h3>
                                {error2 && (
                                    <p
                                        style={{
                                            color: "#ff6262",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {error2}
                                    </p>
                                )}
                                <div className="mb-5">
                                    <h6>Allow minting?</h6>
                                    <input
                                        type="checkbox"
                                        id="themeSwitch"
                                        name="theme-switch"
                                        checked={checkM}
                                        className="theme-switch__input"
                                        onChange={() => setCheckM(!checkM)}
                                    />
                                    <label
                                        htmlFor="themeSwitch"
                                        className="theme-switch__label"
                                        style={{ margin: 0 }}
                                    >
                                        <span></span>
                                    </label>
                                </div>
                                <hr />
                                <div className="mb-5">
                                    <h6>Allow init Collection?</h6>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            id="themeSwitch1"
                                            checked={checkC}
                                            name="theme-switch"
                                            className="theme-switch__input"
                                            onChange={() => setCheckC(!checkC)}
                                        />
                                        <label
                                            htmlFor="themeSwitch1"
                                            className="theme-switch__label"
                                            style={{ margin: 0 }}
                                        >
                                            <span></span>
                                        </label>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    size="medium"
                                    disabled={disableB}
                                    onClick={onSubmit2}
                                >
                                    Change Setting
                                </Button>
                            </div>
                        ) : (
                            <div className="form-wrapper-one registration-area">
                                <h3 className="mb-5 text-center">
                                    Admin Login
                                </h3>
                                {error && (
                                    <p
                                        style={{
                                            color: "#ff6262",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {error}
                                    </p>
                                )}

                                <div className="mb-5">
                                    <label
                                        htmlFor="contact-name"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={user}
                                        onChange={(e) => {
                                            setUser(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="contact-email"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        name="contact-email"
                                        type="password"
                                        value={pass}
                                        onChange={(e) => {
                                            setPass(e.target.value);
                                        }}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="medium"
                                    disabled={disableB}
                                    onClick={onSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Admin;
