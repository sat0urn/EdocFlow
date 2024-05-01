import {upload} from "../../http/docsApi.js";

const PDFEditor = ({formData, handleInputChange, updatedPdfBytes, pdfFile}) => {

    const savePdfToDatabase = async () => {
        const blob = new Blob(
            [updatedPdfBytes],
            {
                type: 'application/pdf'
            }
        );

        const formDataPdf = new FormData();
        formDataPdf.append('name', pdfFile.substring(pdfFile.lastIndexOf("/") + 1, pdfFile.length - 4))
        formDataPdf.append('fileData', blob);
        formDataPdf.append('createdTime', (new Date()).toISOString().split('T')[0])
        formDataPdf.append('status', 'pending')

        try {
            const response = await upload(formDataPdf)
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    return (
        <form className="w-50">
            {
                Object.entries(formData).map(([key, value]) => {
                    return (
                        <div key={key} className="mb-2">
                            <label
                                className="form-label opacity-75"
                            >
                                {key}
                            </label>
                            <input
                                type="text"
                                name={key}
                                className="form-control form-control-sm rounded-2 border-0 shadow-sm"
                                value={value}
                                onChange={handleInputChange}
                            />
                        </div>
                    )
                })
            }
            <button
                onClick={savePdfToDatabase}
                className="btn btn-primary w-100 rounded-2 mt-3"
            >
                Send
            </button>
        </form>
    )
}

export default PDFEditor