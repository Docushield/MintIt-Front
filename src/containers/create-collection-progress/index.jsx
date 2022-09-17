import ProgressBar from "react-bootstrap/ProgressBar";

const CreateCollectionProgressArea = () => {
    return (
        <div className="container mt-5 text-center">
            <h2>Collection Name Initialization Progress</h2>
            <ProgressBar now={60} variant="success" />
            <p className="mt-5">Status: Loading</p>

            <h2>Collection Information</h2>
            <table>
                <tr>
                    <td>Collection Page</td>
                    <td>
                        https://silly-pithivier-17a081.netlify.app/mycollection
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default CreateCollectionProgressArea;
