import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Nav1 from '../../../components/HomePageComponents/Nav1';
import Swal from 'sweetalert2';

const BlackNWhiteConverter = () => {
  const [imageURL, setImageURL] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result);
        Swal.fire({
          icon: 'success',
          title: 'Image Uploaded!',
          text: 'Click "Convert & Download" to get the black & white version.',
          confirmButtonColor: '#007bff',
        });
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File!',
        text: 'Please upload a valid image file (JPG, PNG, GIF, WebP).',
        confirmButtonColor: 'crimson',
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop,
  });

  const handleConvertToGrayscale = () => {
    if (imageURL) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL('image/jpeg', 1.0);

        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BlackNWhite.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        Swal.fire({
          icon: 'success',
          title: 'Conversion Complete!',
          text: 'Your black & white image has been downloaded.',
          confirmButtonColor: '#28a745',
        });
      };
      img.src = imageURL;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Image Found!',
        text: 'Please upload an image first.',
        confirmButtonColor: '#ffc107',
      });
    }
  };

  return (
    <div>
      <Nav1 />
      <nav style={styles.navbar}>
        <h1>Black & White Image Converter</h1>
      </nav>

      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop an image here, or click to select one</p>
      </div>

      {imageURL && (
        <div style={{ textAlign: 'center' }}>
          <img src={imageURL} alt="Uploaded Preview" style={styles.image} />
          <br />
          <button onClick={handleConvertToGrayscale} style={styles.button}>
            Convert & Download
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    padding: '1rem',
    backgroundColor: 'crimson',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    borderRadius: '0.5rem',
  },
  dropzone: {
    border: '2px dashed #007bff',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '2rem',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '400px',
    marginTop: '20px',
  },
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

export default BlackNWhiteConverter;
