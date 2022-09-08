import Anchor from "@ui/anchor";
import Sticky from "@ui/sticky";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import EditProfileImage from "./edit-profile-image";
import FrontPage from "./front-page";
import StandardFeature from "./standard-feature";
import TitleBanner from "./title-banner";
import FooterBanner from "./footer-banner";
import FooterFeature from "./footer-feature";
import FeaturePartner from "./feature-partner";
// import PersonalInformation from "./personal-information";
// import ChangePassword from "./change-password";
// import NotificationSetting from "./notification-setting";

const AddManager = () => (
    <div className="edit-profile-area rn-section-gapTop">
        <div className="container">
            <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
                <div className="col-12 d-flex justify-content-between mb--30 align-items-center">
                    <h4 className="title-left">Ad Manager</h4>
                    <Anchor
                        path="/myprofile"
                        className="btn btn-gray align-items-right"
                    >
                        <i className="feather-eye mr--5" /> Spec Sheet
                    </Anchor>
                    <Anchor path="/myprofile" className="btn btn-primary ">
                        <i className="feather-eye mr--5" /> Preview
                    </Anchor>
                </div>
            </div>
            <TabContainer defaultActiveKey="nav-front">
                <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <Sticky>
                            <nav className="left-nav rbt-sticky-top-adjust-five">
                                <Nav className="nav nav-tabs">
                                    <Nav.Link eventKey="nav-front" as="button">
                                        <i className="feather-edit" />
                                        Front Page
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey="nav-standard"
                                        as="button"
                                    >
                                        <i className="feather-user" />
                                        Standard Feature
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey="nav-titlebnr"
                                        as="button"
                                    >
                                        <i className="feather-unlock" />
                                        Title Banner
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey="nav-footerbnr"
                                        as="button"
                                    >
                                        <i className="feather-unlock" />
                                        Footer Banner
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey="nav-ftrfeatured"
                                        as="button"
                                    >
                                        <i className="feather-bell" />
                                        Footer Featured
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey="nav-partners"
                                        as="button"
                                    >
                                        <i className="feather-bell" />
                                        Feature Partners
                                    </Nav.Link>
                                    <Nav.Link
                                        eventKey="nav-blogContent"
                                        as="button"
                                    >
                                        <i className="feather-bell" />
                                        Blog Content
                                    </Nav.Link>
                                </Nav>
                            </nav>
                        </Sticky>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
                        <TabContent className="tab-content-edit-wrapepr">
                            <TabPane eventKey="nav-front">
                                <FrontPage />
                            </TabPane>
                            <TabPane eventKey="nav-standard">
                                <StandardFeature />
                            </TabPane>
                            <TabPane eventKey="nav-titlebnr">
                                <TitleBanner />
                            </TabPane>
                            <TabPane eventKey="nav-footerbnr">
                                <FooterBanner />
                            </TabPane>
                            <TabPane eventKey="nav-ftrfeatured">
                                <FooterFeature />
                            </TabPane>
                            <TabPane eventKey="nav-partners">
                                <FeaturePartner />
                            </TabPane>
                            <TabPane eventKey="nav-blogContent">
                                <EditProfileImage />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </TabContainer>
        </div>
    </div>
);

export default AddManager;
