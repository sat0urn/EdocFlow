import {useContext, useEffect, useState} from 'react'
import {allDocFormData} from "../../data/docFormData.js";
import PDFViewer from './createDocumentParts/PDFViewer.jsx';
import {PDFDocument, rgb, StandardFonts} from 'pdf-lib'
import PDFEditor from './createDocumentParts/PDFEditor.jsx';
import PageTitle from "../PageTitle.jsx";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";

const ProfileCreateDocument = observer(({title}) => {
  const {searchData, user} = useContext(AuthContext)
  const userRole = user.role
  const userEmployees = user.employees

  const [originalPdfBytes, setOriginalPdfBytes] = useState(null)
  const [updatedPdfBytes, setUpdatedPdfBytes] = useState(null)

  const [pdfFile, setPdfFile] = useState(allDocFormData[0].pdf)
  const [pdfTitle, setPdfTitle] = useState(allDocFormData[0].title)
  const [formData, setFormData] = useState(allDocFormData[0].data)

  const [receiversEmail, setReceiversEmail] = useState([])
  const [remark, setRemark] = useState('')

  const [isNextStep, setIsNextStep] = useState(false)

  useEffect(() => {
    fetch(pdfFile)
      .then((response) => {
        response.arrayBuffer()
          .then((buffer) => setOriginalPdfBytes(buffer.slice(0)))
          .catch((e) => console.error(e))
      })
      .catch((e) => console.error(e))
  }, [pdfFile])

  const updatePdf = async (updatedFormData) => {
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

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

    const newPdfBytes = await pdfDoc.save()
    setUpdatedPdfBytes(newPdfBytes)
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    formData[name].value = value
    updatePdf(formData).then().catch((e) => console.error(e))
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
    <>
      <PageTitle title={title}/>
      <div className={"row mb-4"}>
        <div className={"col-lg-9"}>
          <PDFViewer
            isNextStep={isNextStep}
            searchData={searchData}
            userRole={userRole}
            employees={userEmployees}
            pdfTitle={pdfTitle}
            pdfFile={pdfFile}
            handleSelectChange={handleSelectChange}
            receiversEmail={receiversEmail}
            setReceiversEmail={setReceiversEmail}
            setRemark={setRemark}
            pdfBytes={updatedPdfBytes || originalPdfBytes}
          />
        </div>
        <div className={"col-lg-3"}>
          <PDFEditor
            isNextStep={isNextStep}
            setIsNextStep={setIsNextStep}
            userRole={userRole}
            remark={remark}
            receiversEmail={receiversEmail}
            formData={formData}
            handleInputChange={handleInputChange}
            updatedPdfBytes={updatedPdfBytes}
            pdfFile={pdfFile}
          />
        </div>
      </div>
    </>
  )
})

export default ProfileCreateDocument