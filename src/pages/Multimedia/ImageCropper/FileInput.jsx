import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

const FileInput = ({ onImageSelected }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
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
        const imageDataURL = reader.result;
        onImageSelected(imageDataURL);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropzoneStyle = {
    border: '2px dashed #1895B0',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    background: isDragActive ? '#f0f0f0' : 'transparent',
  };

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ fontSize: '2vh' }}>Drop the image here...</p>
      ) : (
        <p style={{ fontSize: '2vh' }}>Drag 'n' drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default FileInput;
