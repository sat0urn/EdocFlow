import {useState, useEffect, useContext} from 'react'
import empContract from '../assets/pdfs/Employment_Contract.pdf'
import { templates } from '../data/data';
import PDFViewer from './PDFViewer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { upload } from '../http/docsApi'
import PDFEditor from './PDFEditor';
import {observer} from "mobx-react-lite";
import {AuthContext} from "../context/index.js";

const ProfileDash = () => {
  const [originalPdfBytes, setOriginalPdfBytes] = useState(null);
  const [updatedPdfBytes, setUpdatedPdfBytes] = useState(null);
  const [pdfFile, setPdfFile] = useState(empContract)
  const [formData, setFormData] = useState({
    contractNo: '',
    date: '',
    fullName: '',
    companyName: '',
    position: '',
    salary: '',
    responsibilites: '',
    startDate: '',
    signDateCompany: '',
    signDateEmployee: ''
  });

  const loadPdf = async () => {
    // Fetch the PDF from a server or generate it
    const response = await fetch(pdfFile);

    // Replace with your PDF fetch URL
    const buffer = await response.arrayBuffer();

    // Set the PDF bytes into state
    setOriginalPdfBytes(buffer.slice(0));
  }

  // Call this function when the component mounts or when you need to load a new PDF
  useEffect(() => {
    loadPdf()
  }, [pdfFile])

  const updatePdf = async (updatedFormData) => {
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Iterate over all fields and add their text to the PDF
    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (value) {
        // The position where the text is drawn should depend on the key
        // You need to map the field names to their positions on the PDF
        const position = getPositionForKey(key);
        firstPage.drawText(value, {
          x: position.x,
          y: position.y,
          size: 12,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      }
    });

    const newPdfBytes = await pdfDoc.save();
    setUpdatedPdfBytes(newPdfBytes);
  }

  // Function to return the correct position for each field
  const getPositionForKey = (key) => {
    // You will need to define these positions based on your PDF structure
    const positions = {
      contractNo: { x: 375, y: 796 },
      date: { x: 250, y: 698 },
      fullName: { x: 400, y: 698 },
      companyName: { x: 75, y: 670 },
      position: { x: 95, y: 627 },
      salary: { x: 88, y: 585 },
      responsibilites: { x: 89, y: 541 },
      startDate: { x: 318, y: 500 },
      signDateCompany: { x: 258, y: 386 },
      signDateEmployee: { x: 319, y: 343 }
    };
    return positions[key] || { x: 0, y: 0 };
  };

  // Handlers for input changes
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    await updatePdf(updatedFormData);
  };

  const savePdfToDatabase = async () => {
    const blob = new Blob(
      [updatedPdfBytes],
      {
        type: 'application/pdf'
      }
    );
    const formDataPdf = new FormData();
    formDataPdf.append('name', pdfFile.substring(pdfFile.lastIndexOf("/") + 1, pdfFile.length - 4))
    formDataPdf.append('file', blob);

    try {
      const response = await upload(formDataPdf)
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSelectChange = async (e) => {
    setFormData({
      contractNo: '',
      date: '',
      fullName: '',
      companyName: '',
      position: '',
      salary: '',
      responsibilites: '',
      startDate: '',
      signDateCompany: '',
      signDateEmployee: ''
    })
    setPdfFile(e.target.value)
  };

  return (
    <div className="row">
      <div className="col-6">
        <div className="card border-0 rounded-4 shadow-sm p-5 ms-auto">
          <select className='form-select mb-4' value={pdfFile} onChange={handleSelectChange}>
            {templates.map(template =>
            (<option
              key={template.id}
              value={template.pdf}
            >
              {template.title}
            </option>)
            )}
          </select>
          <div
            className="card rounded-5"
            style={{ height: '500px' }}
          >
            <PDFViewer pdfBytes={updatedPdfBytes || originalPdfBytes} />
          </div>
        </div>
      </div>
      <div className="col-6">
        <form
          className="w-50 ms-4 overflow-y-auto"
          style={{ height: '600px' }}
        >
          <PDFEditor formData={formData} handleInputChange={handleInputChange} />
          <button
            onClick={savePdfToDatabase}
            className="btn btn-primary w-100 rounded-4"
          >
            Save
          </button >
        </form >
      </div>
    </div >
  )
}

export default ProfileDash