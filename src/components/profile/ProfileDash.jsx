import {useEffect, useState} from 'react'
import {allDocFormData} from "../../data/docFormData.js";
import PDFViewer from './PDFViewer.jsx';
import {PDFDocument, rgb, StandardFonts} from 'pdf-lib'
import PDFEditor from './PDFEditor.jsx';

const ProfileDash = () => {
    const [originalPdfBytes, setOriginalPdfBytes] = useState(null);
    const [updatedPdfBytes, setUpdatedPdfBytes] = useState(null);
    const [pdfFile, setPdfFile] = useState(allDocFormData[0].pdf)
    const [pdfTitle, setPdfTitle] = useState(allDocFormData[0].title)
    const [formData, setFormData] = useState(allDocFormData[0].data);

    useEffect(() => {
        const loadPdf = async () => {
            const response = await fetch(pdfFile);
            const buffer = await response.arrayBuffer();
            setOriginalPdfBytes(buffer.slice(0));
        }

        loadPdf()
    }, [pdfFile])

    const updatePdf = async (updatedFormData) => {
        const pdfDoc = await PDFDocument.load(originalPdfBytes);
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Iterate over all fields and add their text to the PDF
        Object.values(updatedFormData).forEach(({value, positions}) => {
            if (value) {
                firstPage.drawText(value, {
                    x: positions.x,
                    y: positions.y,
                    size: 12,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                });
            }
        });

        const newPdfBytes = await pdfDoc.save();
        setUpdatedPdfBytes(newPdfBytes);
    }

    const handleInputChange = async (e) => {
        const {name, value} = e.target;
        formData[name].value = value
        await updatePdf(formData);
    };

    const handleSelectChange = async (e) => {
        const value = e.target.value
        const {title, data} = allDocFormData.find((doc) => doc.pdf === value)

        Object.keys(formData).forEach(key => formData[key].value = '')

        setPdfFile(value)
        setPdfTitle(title)
        setFormData(data)

        const response = await fetch(value);
        const buffer = await response.arrayBuffer();
        const pdfNewDoc = await PDFDocument.load(buffer.slice(0));
        const pdfNewBytes = await pdfNewDoc.save()
        setUpdatedPdfBytes(pdfNewBytes)
    };

    return (
        <div className={"container w-75"}>
            <div className={"row mx-auto my-5"}>
                <div className={"col-9 ps-0"}>
                    <div className={"card border-0 rounded-4 shadow-sm p-5"}>
                        <h3 className={"text-primary"}>
                            Document: {pdfTitle}
                        </h3>

                        <select
                            className={"form-select my-4"}
                            value={pdfFile}
                            onChange={handleSelectChange}
                        >
                            {allDocFormData.map(({id, pdf, title}) =>
                                (
                                    <option key={id} value={pdf}>
                                        {title}
                                    </option>
                                )
                            )}
                        </select>
                        <PDFViewer pdfBytes={updatedPdfBytes || originalPdfBytes}/>
                    </div>
                </div>
                <div className={"col-3 pe-0"}>
                    <PDFEditor
                        formData={formData}
                        handleInputChange={handleInputChange}
                        updatedPdfBytes={updatedPdfBytes}
                        pdfFile={pdfFile}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileDash