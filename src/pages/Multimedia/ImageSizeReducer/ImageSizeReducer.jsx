import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Nav1 from '../../../components/HomePageComponents/Nav1';
import Swal from 'sweetalert2';

const ImageSizeReducer = () => {
  const [imageURL, setImageURL] = useState('');
  const [resizedURL, setResizedURL] = useState('');
  const [resizePercentage, setResizePercentage] = useState(90); // Default is 90%

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result);
        setResizedURL('');
        Swal.fire({
          icon: 'success',
          title: 'Image Uploaded!',
          text: 'Adjust the resize percentage and click "Resize Image".',
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

  const handleResize = () => {
    if (imageURL) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const percentage = resizePercentage / 100;
        const width = img.width * percentage;
        const height = img.height * percentage;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const url = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality as needed
        setResizedURL(url);

        Swal.fire({
          icon: 'success',
          title: 'Image Resized!',
          text: 'Click "Download Resized Image" to save it.',
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

  const handleDownload = () => {
    if (resizedURL) {
      const a = document.createElement('a');
      a.href = resizedURL;
      a.download = 'resized_image.jpg'; // JPG file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <Nav1 />
      <nav style={styles.navbar}>
        <h1>Image Size Reducer</h1>
      </nav>

      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop an image here, or click to select one</p>
      </div>

      {imageURL && (
        <div style={{ textAlign: 'center' }}>
          <img src={imageURL} alt="Uploaded" style={styles.image} />
          <br />
          <br />
          <label style={{ fontSize: '2.5vh' }}>
            Resize Percentage: &nbsp;
            <input
              type="number"
              min="1"
              max="100"
              value={resizePercentage}
              onChange={(e) => setResizePercentage(e.target.value)}
              style={styles.input}
            />
          </label>
          <button onClick={handleResize} style={styles.button}>
            Resize Image
          </button>
        </div>
      )}

      {resizedURL && (
        <div style={{ textAlign: 'center' }}>
          <img src={resizedURL} alt="Resized" style={styles.image} />
          <br />
          <br />
          <button onClick={handleDownload} style={styles.button}>
            Download Resized Image
          </button>
          <br />
          <br />
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
  input: {
    padding: '5px',
    fontSize: '16px',
    width: '60px',
    textAlign: 'center',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
};

export default ImageSizeReducer;
