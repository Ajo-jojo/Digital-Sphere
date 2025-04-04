import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import Nav1 from '../../../components/HomePageComponents/Nav1';

const PassportSizePhotoConverter = () => {
  const [imageURL, setImageURL] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload an image file.',
        confirmButtonColor: 'crimson',
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleConvertToPassportSize = () => {
    if (imageURL) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        const width = 210; // Passport photo width in mm (standard A4 size)
        const height = 297; // Passport photo height in mm (standard A4 size)
        canvas.width = width * 3.78; // Convert mm to pixels at 300 dpi (1mm = 3.78 pixels at 300 dpi)
        canvas.height = height * 3.78; // Convert mm to pixels at 300 dpi (1mm = 3.78 pixels at 300 dpi)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'passport_photo.jpg'; // JPG file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          },
          'image/jpeg',
          1.0
        ); // Maximum quality
      };
      img.src = imageURL;
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
        <h1>Passport Size Photo Converter</h1>
      </nav>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag 'n' drop an image here, or click to select one</p>
      </div>
      {imageURL && (
        <div style={{ textAlign: 'center' }}>
          <img src={imageURL} alt="Uploaded" style={imageStyle} />
          <br />
          <button onClick={handleConvertToPassportSize} style={styles.button}>
            Convert to Passport Size
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
  },
};

export default PassportSizePhotoConverter;
