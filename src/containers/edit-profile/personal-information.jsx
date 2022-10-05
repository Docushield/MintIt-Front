import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";

const PersonalInformation = () => (
    <div className="Doc-information">
        {/* <div className="profile-form-wrapper">
            <div className="email-area">
                <label htmlFor="Email" className="form-label">
                    Edit Your Email
                </label>
                <input
                    name="email"
                    id="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={(e) => e}
                />
            </div>
        </div> */}
        <div className="edit-bio-area mt--30">
            <label htmlFor="Discription" className="form-label">
                Edit Your Bio
            </label>
            <textarea
                id="Discription"
                placeholder="Hello, I am Alamin, A Front-end Developer..."
                onChange={(e) => e}
            ></textarea>
        </div>
        <div className="input-two-wrapper mb--15">
            {/* <div className="first-name half-wid">
                <label htmlFor="contact-name" className="form-label">
                    Facebook
                </label>
                <input
                    name="contact-name"
                    id="contact-name"
                    type="text"
                    placeholder="https://facebook.com"
                    onChange={(e) => e}
                />
            </div> */}
            <div className="last-name half-wid">
                <label htmlFor="contact-name-last" className="form-label">
                    Twitter
                </label>
                <input
                    name="contact-name"
                    id="contact-name-last"
                    type="text"
                    placeholder="https://twitter.com"
                    onChange={(e) => e}
                />
            </div>
            {/* <div className="last-name half-wid">
                <label htmlFor="contact-name-last" className="form-label">
                    Instagram
                </label>
                <input
                    name="contact-name"
                    id="contact-name-last"
                    type="text"
                    placeholder="https://instagram.com"
                    onChange={(e) => e}
                />
            </div> */}
        </div>

        {/* <div className="input-two-wrapper mt--15">
            <div className="half-wid role-area">
                <label htmlFor="Role" className="form-label mb--10">
                    Your Role
                </label>
                <input
                    name="Role"
                    id="Role"
                    type="text"
                    value="Front-end Developer"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid gender">
                <NiceSelect
                    options={[
                        { value: "male", text: "male" },
                        { value: "female", text: "female" },
                    ]}
                    placeholder="Select Your Gender"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
        </div>

        <div className="input-two-wrapper mt--15">
            <div className="half-wid currency">
                <NiceSelect
                    options={[
                        { value: "($)USD", text: "($)USD" },
                        { value: " KDA", text: " KDA" },
                        { value: "BIT Coin", text: "BIT Coin" },
                    ]}
                    placeholder="Currency"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid phone-number">
                <label htmlFor="PhoneNumber" className="form-label mb--10">
                    Phone Number
                </label>
                <input
                    name="contact-name"
                    id="PhoneNumber"
                    type="text"
                    value="+880100000000"
                    onChange={(e) => e}
                />
            </div>
        </div>
        <div className="input-two-wrapper mt--15">
            <div className="half-wid currency">
                <NiceSelect
                    options={[
                        { value: "United State", text: "United State" },
                        { value: "Katar", text: "Katar" },
                        { value: "Canada", text: "Canada" },
                    ]}
                    placeholder="Location"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid phone-number">
                <label htmlFor="PhoneNumber" className="form-label mb--10">
                    Address
                </label>
                <input
                    name="contact-name"
                    id="PhoneNumber"
                    type="text"
                    value="USA Cidni"
                    onChange={(e) => e}
                />
            </div>
        </div> */}
        <div className="button-area save-btn-edit">
            <Button className="mr--15" color="primary-alta" size="medium">
                Cancel
            </Button>
            <Button size="medium">Save</Button>
        </div>
    </div>
);

export default PersonalInformation;
