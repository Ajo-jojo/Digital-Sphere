import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import Swal from 'sweetalert2';
import Nav1 from '../../../components/HomePageComponents/Nav1';

const ExtractPDFPages = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfURL, setPdfURL] = useState('');
  const [fromPage, setFromPage] = useState('');
  const [toPage, setToPage] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file || file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a valid PDF file.',
        confirmButtonColor: 'crimson',
      });
      return;
    }

    setPdfFile(file);
    setPdfURL(URL.createObjectURL(file)); // Create URL for viewing
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    multiple: false,
  });

  const extractPages = async () => {
    if (!pdfFile) {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please upload a PDF file first.',
        confirmButtonColor: 'crimson',
      });
      return;
    }

    const from = parseInt(fromPage, 10);
    const to = parseInt(toPage, 10);

    if (isNaN(from) || isNaN(to) || from < 1 || to < from) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Page Numbers',
        text: "Please enter valid 'From' and 'To' page numbers.",
        confirmButtonColor: 'crimson',
      });
      return;
    }

    const fileData = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileData);

    if (to > pdfDoc.getPageCount()) {
      Swal.fire({
        icon: 'error',
        title: 'Page Range Exceeded',
        text: `This PDF has only ${pdfDoc.getPageCount()} pages.`,
        confirmButtonColor: 'crimson',
      });
      return;
    }

    const extractedPdf = await PDFDocument.create();
    const pagesToExtract = await extractedPdf.copyPages(
      pdfDoc,
      Array.from({ length: to - from + 1 }, (_, i) => i + from - 1)
    );

    pagesToExtract.forEach((page) => extractedPdf.addPage(page));

    const extractedPdfBytes = await extractedPdf.save();
    const blob = new Blob([extractedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Auto-download extracted PDF
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_pages.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Pages Extracted!',
      text: 'Your extracted PDF will be downloaded shortly.',
      confirmButtonColor: 'green',
    });

    setPdfFile(null);
    setPdfURL('');
    setFromPage('');
    setToPage('');
  };

  return (
    <div>
      <Nav1 />
      <nav style={navStyle}>
        <h1>Extract PDF Pages</h1>
      </nav>

      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop a PDF file here, or click to select</p>
      </div>

      {pdfFile && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'blue', fontWeight: 'bold' }}>Selected File: {pdfFile.name}</h3>
          <button onClick={() => window.open(pdfURL, '_blank')} style={styles.viewButton}>
            View PDF
          </button>
          <div style={inputContainer}>
            <label>
              From Page:{' '}
              <input
                type="number"
                value={fromPage}
                onChange={(e) => setFromPage(e.target.value)}
                min="1"
              />
            </label>
            <label>
              To Page:{' '}
              <input
                type="number"
                value={toPage}
                onChange={(e) => setToPage(e.target.value)}
                min="1"
              />
            </label>
          </div>
          <button onClick={extractPages} style={styles.button}>
            Extract Pages
          </button>
        </div>
      )}
    </div>
  );
};

// 🖌️ Styles
const navStyle = {
  padding: '1rem',
  backgroundColor: 'crimson',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'uppercase',
  marginBottom: '1rem',
  borderRadius: '0.5rem',
};

const dropzoneStyle = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: '20px',
};

const inputContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '15px',
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  viewButton: {
    padding: '8px 15px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
};

export default ExtractPDFPages;
