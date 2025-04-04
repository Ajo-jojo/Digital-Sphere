// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { PDFDocument } from 'pdf-lib';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
// import Swal from 'sweetalert2';
// import Nav1 from '../../../components/HomePageComponents/Nav1';

// const SortableItem = SortableElement(({ file, index }) => (
//   <div style={styles.listItem}>
//     {index + 1}. {file.name}
//   </div>
// ));

// const SortableList = SortableContainer(({ pdfFiles }) => {
//   return (
//     <div style={styles.fileListContainer}>
//       {pdfFiles.map((file, index) => (
//         <SortableItem key={`item-${index}`} index={index} file={file} />
//       ))}
//     </div>
//   );
// });

// const MergePDFs = () => {
//   const [pdfFiles, setPdfFiles] = useState([]);

//   const onDrop = (acceptedFiles) => {
//     const newPdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');

//     if (newPdfFiles.length === 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please upload only PDF files.',
//         confirmButtonColor: 'crimson'
//       });
//       return;
//     }

//     setPdfFiles([...pdfFiles, ...newPdfFiles]);
//   };

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setPdfFiles(arrayMove(pdfFiles, oldIndex, newIndex));
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

//   const mergePDFs = async () => {
//     if (pdfFiles.length < 2) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Not enough files',
//         text: 'Please upload at least two PDF files to merge.',
//         confirmButtonColor: 'crimson'
//       });
//       return;
//     }

//     const mergedPdf = await PDFDocument.create();

//     for (let file of pdfFiles) {
//       const fileData = await file.arrayBuffer();
//       const pdf = await PDFDocument.load(fileData);
//       const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
//       copiedPages.forEach(page => mergedPdf.addPage(page));
//     }

//     const mergedPdfBytes = await mergedPdf.save();
//     const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);

//     // Auto-download merged PDF
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'merged.pdf';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);

//     Swal.fire({
//       icon: 'success',
//       title: 'PDF Merged!',
//       text: 'Your merged PDF will be downloaded shortly.',
//       confirmButtonColor: 'green'
//     });

//     // Reset file list after merging
//     setPdfFiles([]);
//   };

//   return (
//     <div>
//       <Nav1 />
//       <nav style={navStyle}>
//         <h1>Merge Multiple PDFs</h1>
//       </nav>

//       <div {...getRootProps()} style={dropzoneStyle}>
//         <input {...getInputProps()} />
//         <p style={{ fontSize: '2vh' }}>Drag & drop PDF files here, or click to select</p>
//       </div>

//       {pdfFiles.length > 0 && (
//         <div style={{ textAlign: 'center' }}>
//           <h3>Uploaded PDFs (Drag to Reorder):</h3>
//           <SortableList pdfFiles={pdfFiles} onSortEnd={onSortEnd} axis="y" />
//           <button onClick={mergePDFs} style={styles.button}>Merge PDFs</button>
//         </div>
//       )}
//     </div>
//   );
// };

// // 🖌️ Styles
// const navStyle = {
//   padding: '1rem',
//   backgroundColor: 'crimson',
//   color: 'white',
//   fontWeight: 'bold',
//   textAlign: 'center',
//   textTransform: 'uppercase',
//   marginBottom: '1rem',
//   borderRadius: '0.5rem'
// };

// const dropzoneStyle = {
//   border: '2px dashed #ccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
//   marginBottom: '20px'
// };

// const styles = {
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginTop: '10px',
//   },
//   fileListContainer: {
//     border: '2px solid #ccc',
//     borderRadius: '4px',
//     padding: '10px',
//     margin: '10px auto',
//     width: '60%',
//     backgroundColor: '#f9f9f9',
//     textAlign: 'left',
//   },
//   listItem: {
//     padding: '8px',
//     borderBottom: '1px solid #ddd',
//     cursor: 'grab',
//   }
// };

// export default MergePDFs;

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import Swal from 'sweetalert2';
import Nav1 from '../../../components/HomePageComponents/Nav1';

// ✅ Correctly passes index to display file number properly
const SortableItem = SortableElement(({ file, fileIndex }) => (
  <div style={styles.listItem}>
    {fileIndex + 1}. {file.name} {/* 🔹 Fix: Correctly show file number */}
  </div>
));

const SortableList = SortableContainer(({ pdfFiles }) => {
  return (
    <div style={styles.fileListContainer}>
      {pdfFiles.map((file, index) => (
        <SortableItem key={`item-${index}`} index={index} file={file} fileIndex={index} />
      ))}
    </div>
  );
});

const MergePDFs = () => {
  const [pdfFiles, setPdfFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newPdfFiles = acceptedFiles.filter((file) => file.type === 'application/pdf');

    if (newPdfFiles.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload only PDF files.',
        confirmButtonColor: 'crimson',
      });
      return;
    }

    setPdfFiles([...pdfFiles, ...newPdfFiles]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setPdfFiles(arrayMove(pdfFiles, oldIndex, newIndex));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      Swal.fire({
        icon: 'warning',
        title: 'Not enough files',
        text: 'Please upload at least two PDF files to merge.',
        confirmButtonColor: 'crimson',
      });
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (let file of pdfFiles) {
      const fileData = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileData);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Auto-download merged PDF
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'PDF Merged!',
      text: 'Your merged PDF will be downloaded shortly.',
      confirmButtonColor: 'green',
    });

    // Reset file list after merging
    setPdfFiles([]);
  };

  return (
    <div>
      <Nav1 />
      <nav style={navStyle}>
        <h1>Merge Multiple PDFs</h1>
      </nav>

      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop PDF files here, or click to select</p>
      </div>

      {pdfFiles.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <h3>Uploaded PDFs ({pdfFiles.length}): Drag to Reorder</h3>
          <SortableList pdfFiles={pdfFiles} onSortEnd={onSortEnd} axis="y" />
          <button onClick={mergePDFs} style={styles.button}>
            Merge PDFs
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
  fileListContainer: {
    border: '2px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    margin: '10px auto',
    width: '60%',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  listItem: {
    padding: '8px',
    borderBottom: '1px solid #ddd',
    cursor: 'grab',
  },
};

export default MergePDFs;
