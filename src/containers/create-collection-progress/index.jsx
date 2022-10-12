import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from "prop-types";
const App_url = process.env.NEXT_PUBLIC_APP_URL || "https://testnet.mintit.studio";

const CreateCollectionProgressArea = ({
    name,
    slug,
    error,
    success,
    status,
}) => {
    const [progress, setProgress] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(timer);
            }
            setProgress((oldState) => oldState + 1);
        }, 300);
        setTimer(interval);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (error || success) {
            setProgress(100);
            clearInterval(timer);
        }
    }, [error, success]);

    return (
        <div className="container mt-5 text-center">
            <h2>{name} Initialization Progress</h2>
            <ProgressBar
                now={progress}
                variant={error ? "danger" : success ? "success" : "primary"}
            />
            <p className="mt-5">Status: {status}</p>

            {/*<h2>Collection Information</h2>
            <table>
                <tr>
                    <td>Collection Page</td>
                    <td>
                        <Link href={`/collections/${slug}`}>
                            <a href="">{`${App_url}/${slug}`}</a>
                        </Link>
                    </td>
                </tr>
            </table>*/}
        </div>
    );
};

CreateCollectionProgressArea.propTypes = {
    name: PropTypes.string,
    slug: PropTypes.string,
    error: PropTypes.bool,
    status: PropTypes.string,
    success: PropTypes.bool,
};

export default CreateCollectionProgressArea;
