import PropTypes from "prop-types";
import Image from "next/image";

const SocialWidget = ({ socials }) => (
    <ul className="social-copyright">
        {socials?.map((social) => (
            <li key={social.id}>
                <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.title}
                >
                <Image src={social.src} height={100} width={100}></Image>
                    {/* <i className={social.icon} /> */}
                </a>
            </li>
        ))}
    </ul>
);

SocialWidget.propTypes = {
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
};

export default SocialWidget;
