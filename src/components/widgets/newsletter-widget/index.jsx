import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";

const NewsletterWidget = ({ data }) => {
    const [email, setEmail] = useState("");
    const handleSubscribe = () => {
        toast.success("Subscribed succesfully.");
        setEmail("");
    };
    return (
        <div className="widget-bottom mt--40 pt--40">
            <h6 className="title">{data.title}</h6>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control bg-color--2"
                    placeholder="Your email"
                    aria-label="Recipient's email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-primary-alta btn-outline-secondary"
                        type="button"
                        onClick={handleSubscribe}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
            {data?.note && (
                <div className="newsletter-dsc">
                    <p>{data.note}</p>
                </div>
            )}
        </div>
    );
};

NewsletterWidget.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        note: PropTypes.string,
    }),
};
export default NewsletterWidget;
