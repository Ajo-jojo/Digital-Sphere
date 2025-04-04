import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import jsPDF from 'jspdf';
import Nav1 from '../../../components/HomePageComponents/Nav1';

const ImageToPDFConverter = () => {
  const [imageURL, setImageURL] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleConvertToPDF = () => {
    if (imageURL) {
      const pdf = new jsPDF();
      pdf.addImage(imageURL, 'JPEG', 10, 10, 180, 160);
      pdf.save('converted.pdf');
    }
  };

  return (
    <div>
      <Nav1 />
      <nav
        style={{
          padding: '1rem',
          backgroundColor: 'crimson',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          borderRadius: '0.5rem',
        }}
      >
        <h1>Image - PDF Converter</h1>
      </nav>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag 'n' drop an image here, or click to select one</p>
      </div>
      {imageURL && (
        <div style={{ textAlign: 'center' }}>
          <img src={imageURL} alt="Uploaded" style={imageStyle} />
          <br />
          <button onClick={handleConvertToPDF} style={styles.button}>
            Convert to PDF
          </button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '400px',
  marginTop: '20px',
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
    margin: '10px',
    textAlign: 'center',
  },
};

export default ImageToPDFConverter;
