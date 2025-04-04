// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import { saveAs } from "file-saver";
// import Nav1 from "../../../components/HomePageComponents/Nav1";

// // ✅ Properly load the PDF.js worker in Vite
// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   "/pdf.worker.min.js",
//   import.meta.url
// ).href;

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     textAlign: "center",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     boxShadow: "2px 2px 12px rgba(0, 0, 0, 0.1)",
//   },
//   input: {
//     padding: "10px",
//     border: "2px dashed #007bff",
//     borderRadius: "5px",
//     cursor: "pointer",
//     width: "100%",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   buttonDisabled: {
//     backgroundColor: "#ccc",
//     cursor: "not-allowed",
//   },
//   textArea: {
//     width: "100%",
//     height: "200px",
//     padding: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     marginTop: "10px",
//     fontSize: "14px",
//   },
// };

// const PdfToWordConverter = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pdfText, setPdfText] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle PDF file upload
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setPdfFile(file);
//       extractTextFromPdf(file);
//     } else {
//       alert("❌ Please upload a valid PDF file.");
//     }
//   };

//   // Extract text from PDF
//   const extractTextFromPdf = async (file) => {
//     setLoading(true);
//     setPdfText("");

//     const reader = new FileReader();
//     reader.readAsArrayBuffer(file);

//     reader.onload = async () => {
//       try {
//         const pdfData = new Uint8Array(reader.result);
//         const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//         let text = "";

//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const textContent = await page.getTextContent();
//           const pageText = textContent.items.map((item) => item.str).join(" ");
//           text += pageText + "\n\n";
//         }

//         setPdfText(text);
//       } catch (error) {
//         alert("❌ Error extracting text from PDF.");
//         console.error("PDF Extraction Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//   };

//   // Convert extracted text to a Word document
//   const convertToWord = () => {
//     if (!pdfText) {
//       alert("⚠ No text extracted from the PDF.");
//       return;
//     }

//     const blob = new Blob([pdfText], { type: "application/msword" });
//     saveAs(blob, "converted_document.doc");
//   };

//   return (
//     <div>
//       <Nav1 />
//       <nav
//         style={{
//           padding: "1rem",
//           backgroundColor: "crimson",
//           color: "white",
//           fontWeight: "bold",
//           textAlign: "center",
//           textTransform: "uppercase",
//           marginBottom: "1rem",
//           borderRadius: "0.5rem",
//         }}
//       >
//         <h1>PDF to Word Converter</h1>
//       </nav>

//       <div style={styles.container}>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           style={styles.input}
//         />

//         {loading && <p>🔄 Extracting text... Please wait.</p>}

//         {pdfText && (
//           <>
//             <textarea
//               value={pdfText}
//               readOnly
//               style={styles.textArea}
//               placeholder="Extracted text will appear here..."
//             />

//             <button
//               onClick={convertToWord}
//               style={pdfText ? styles.button : { ...styles.button, ...styles.buttonDisabled }}
//               disabled={!pdfText}
//             >
//               Convert to Word 📄
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PdfToWordConverter;

// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import { saveAs } from "file-saver";
// import { Document, Paragraph, Packer, TextRun } from "docx";

// // Set worker path - works in both dev and production
// pdfjsLib.GlobalWorkerOptions.workerSrc = "/node_modules/pdfjs-dist/build/pdf.worker.min.js";

// const PdfToWordConverter = () => {
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       setStatus("❌ Please upload a valid PDF file");
//       return;
//     }

//     setStatus("🔄 Processing PDF...");
//     setLoading(true);

//     try {
//       const text = await extractTextFromPdf(file);
//       await createWordDoc(text, file.name.replace(".pdf", ""));
//       setStatus("✅ Conversion successful!");
//     } catch (error) {
//       setStatus(`❌ Error: ${error.message}`);
//       console.error("Conversion error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const extractTextFromPdf = async (file) => {
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
//       let text = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map(item => item.str).join(" ") + "\n\n";
//       }

//       return text;
//     } catch (error) {
//       throw new Error("Failed to extract text from PDF");
//     }
//   };

//   const createWordDoc = async (text, filename) => {
//     try {
//       const doc = new Document({
//         sections: [{
//           children: text.split("\n\n")
//             .filter(para => para.trim())
//             .map(para => new Paragraph({ children: [new TextRun(para)] }))
//         }]
//       });

//       const blob = await Packer.toBlob(doc);
//       saveAs(blob, `${filename || "converted"}.docx`);
//     } catch (error) {
//       throw new Error("Failed to create Word document");
//     }
//   };

//   return (
//     <div style={{
//       padding: "2rem",
//       maxWidth: "600px",
//       margin: "0 auto",
//       fontFamily: "Arial, sans-serif"
//     }}>
//       <h1 style={{ color: "#2c3e50", textAlign: "center" }}>PDF to Word Converter</h1>

//       <div style={{
//         margin: "2rem 0",
//         padding: "1.5rem",
//         border: "2px dashed #3498db",
//         borderRadius: "8px",
//         textAlign: "center"
//       }}>
//         <input
//           type="file"
//           id="pdf-upload"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           disabled={loading}
//           style={{ display: "none" }}
//         />
//         <label
//           htmlFor="pdf-upload"
//           style={{
//             display: "inline-block",
//             padding: "0.75rem 1.5rem",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "1rem",
//             transition: "background-color 0.3s"
//           }}
//         >
//           {loading ? "Processing..." : "Choose PDF File"}
//         </label>
//       </div>

//       {status && (
//         <div style={{
//           padding: "1rem",
//           margin: "1rem 0",
//           borderRadius: "4px",
//           backgroundColor: status.includes("❌") ? "#fdecea" :
//                          status.includes("🔄") ? "#fff8e1" : "#e8f5e9",
//           color: status.includes("❌") ? "#c62828" :
//                 status.includes("🔄") ? "#f9a825" : "#2e7d32",
//           borderLeft: `4px solid ${
//             status.includes("❌") ? "#c62828" :
//             status.includes("🔄") ? "#f9a825" : "#2e7d32"
//           }`
//         }}>
//           {status}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfToWordConverter;

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import { Document, Paragraph, TextRun, Packer, AlignmentType } from 'docx';
import Nav1 from '../../../components/HomePageComponents/Nav1';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToWordConverter = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setStatus('❌ Please upload a valid PDF file');
      return;
    }

    setStatus('🔄 Processing PDF...');
    setLoading(true);

    try {
      const pdfContent = await extractPdfContent(file);
      await createWordDocument(pdfContent, file.name.replace('.pdf', ''));
      setStatus('✅ Conversion successful!');
    } catch (error) {
      console.error('Conversion error details:', error);
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractPdfContent = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const content = { text: '', items: [] };

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let prevY = null;
        let pageText = '';

        textContent.items.forEach((item) => {
          const { str, transform } = item;
          const y = transform[5]; // Y-coordinate of text

          // If there is a significant Y difference, assume a new line
          if (prevY !== null && Math.abs(prevY - y) > 5) {
            pageText += '\n';
          }

          pageText += str + ' ';
          prevY = y;
        });

        content.text += pageText.trim() + '\n\n'; // Page separator
      }

      return content;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract content from PDF');
    }
  };

  const createWordDocument = async (content, filename) => {
    try {
      const paragraphs = content.text
        .split('\n\n')
        .filter((text) => text.trim())
        .map(
          (text) =>
            new Paragraph({
              children: [new TextRun({ text, font: 'Arial', size: 24 })],
              alignment: AlignmentType.LEFT,
              spacing: { line: 300 },
            })
        );

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
              },
            },
            children: paragraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${filename || 'converted'}.docx`);
    } catch (error) {
      console.error('DOCX creation error:', error);
      throw new Error('Failed to create Word document');
    }
  };

  return (
    <div>
      <Nav1 />
      <nav style={navStyle}>
        <h1>PDF to Word Converter</h1>
      </nav>

      <div style={styles.uploadArea}>
        <input
          type="file"
          id="pdf-upload"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={loading}
          style={styles.fileInput}
        />
        <label htmlFor="pdf-upload" style={styles.uploadButton}>
          {loading ? 'Processing...' : 'Choose PDF File'}
        </label>
      </div>

      {status && (
        <div
          style={{
            ...styles.status,
            backgroundColor: status.includes('❌')
              ? '#fdecea'
              : status.includes('🔄')
                ? '#fff8e1'
                : '#e8f5e9',
            color: status.includes('❌')
              ? '#c62828'
              : status.includes('🔄')
                ? '#f9a825'
                : '#2e7d32',
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

// Styles (Same as Merge PDFs page)
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

const styles = {
  uploadArea: {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  status: {
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '4px',
  },
};

export default PdfToWordConverter;

// import React from 'react'

// const PdfToWordConverter = () => {
//   return (
//     <div>PdfToWordConverter</div>
//   )
// }

// export default PdfToWordConverter
