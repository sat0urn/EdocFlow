import {upload} from "../../../http/docsApi.js";

const PDFEditor = ({formData, handleInputChange, updatedPdfBytes, pdfFile}) => {

    const savePdfToDatabase = async (e) => {
        e.preventDefault()
        const blob = new Blob([updatedPdfBytes], {type: 'application/pdf'});
        const pdfName = pdfFile.substring(pdfFile.lastIndexOf("/") + 1, pdfFile.length - 4)
        const createdDate = (new Date()).toISOString().split('T')[0]

        const formDataPdf = new FormData();
        formDataPdf.append('name', pdfName)
        formDataPdf.append('fileData', blob);
        formDataPdf.append('createdTime', createdDate)
        formDataPdf.append('status', 'pending')

        try {
            const response = await upload(formDataPdf)
            alert("Document: " + pdfName + '\n' + response.data)
        } catch (e) {
            console.error(e.response);
        }
    };

    return (
        <form onSubmit={savePdfToDatabase}>
            {Object.entries(formData).map(([key, {name, value}]) => {
                return (
                    <div key={key} className="mb-2">
                        <label className="form-label opacity-75">
                            {name}
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
            })}
            <button
                type={"submit"}
                className="btn btn-primary w-100 rounded-2 mt-3"
            >
                Send
            </button>
        </form>
    )
}

export default PDFEditor