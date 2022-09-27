import PropTypes from "prop-types";
import Anchor from "@ui/anchor";

const Steps = ({ steps }) => {
    return (
        <div className="d-flex justify-content-center">
            {steps.map((step, index) => (
                <div className="steps" key={index}>
                    <div className="step-name">{step.name}</div>
                    <div className="step-description">{step.description}</div>
                    <Anchor className="read-more-button" path={step.path}>
                        <i className="feather-arrow-right" />
                    </Anchor>
                </div>
            ))}
        </div>
    );
};

Steps.displayName = "Steps";

Steps.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ),
};

export default Steps;
