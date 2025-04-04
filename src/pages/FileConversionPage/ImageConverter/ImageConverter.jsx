import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import Nav1 from '../../../components/HomePageComponents/Nav1';

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('jpg'); // Default target format is JPG

  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: handleFileChange,
  });

  const convertImage = () => {
    if (!selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select a file first!',
        confirmButtonColor: 'crimson',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        let link = document.createElement('a');
        link.download = `image.${targetFormat}`;

        if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
          link.href = canvas.toDataURL('image/jpeg');
        } else if (targetFormat === 'png') {
          link.href = canvas.toDataURL('image/png');
        } else if (targetFormat === 'webp') {
          link.href = canvas.toDataURL('image/webp');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid target format specified.',
            confirmButtonColor: 'crimson',
          });
          return;
        }

        link.click();
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
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
    },

    dropzoneStyle: {
      border: '2px dashed #ccc',
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: '30px',
    },
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
        <h1>File Converter</h1>
      </nav>
      <div {...getRootProps()} style={styles.dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '15px' }}>Drag 'n' drop an image here, or click to select one</p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '30px',
        }}
      >
        <div style={{ fontSize: 'large', marginTop: '2vh', alignItems: 'center' }}>
          <label>Select target format: &nbsp;</label>
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="jpeg">JPEG</option>
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
        <button className="button" onClick={convertImage} style={styles.button}>
          Convert
        </button>
      </div>
    </div>
  );
};

export default ImageConverter;
