import React, { useState } from 'react';
import './ImageCropper.css';
import FileInput from './FileInput';
import ImageCropper from './ImageCropper';
import Nav1 from '../../../components/HomePageComponents/Nav1';

const MainImageCropper = () => {
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [imgAfterCrop, setImageAfterCrop] = useState('');

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage('crop-img');
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement('canvas');
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext('2d');
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataURL = canvasEle.toDataURL('image/jpeg');
      setImageAfterCrop(dataURL);
      setCurrentPage('img-cropped');
    };
  };

  const onCropCancel = () => {
    setCurrentPage('choose-img');
    setImage('');
  };

  const downloadCroppedImage = () => {
    const a = document.createElement('a');
    a.href = imgAfterCrop;
    a.download = 'cropped-image.jpeg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        <h1>Image Cropper</h1>
      </nav>
      <div className="container" style={{ marginTop: '-5vh' }}>
        {currentPage === 'choose-img' ? (
          <FileInput onImageSelected={onImageSelected} />
        ) : currentPage === 'crop-img' ? (
          <ImageCropper image={image} onCropDone={onCropDone} onCropCancel={onCropCancel} />
        ) : (
          <div>
            <div style={{ marginTop: '-15vh' }}>
              <img src={imgAfterCrop} alt="cropped-image" />
            </div>

            <button
              onClick={downloadCroppedImage}
              style={{
                fontSize: 'large',
                width: 'auto',
                height: 'auto',
                padding: '5px 10px',
                marginLeft: '7vh',
                marginTop: '4vh',
              }}
            >
              Download Cropped Image
            </button>

            <button
              onClick={() => {
                setCurrentPage('crop-img');
              }}
              style={{
                fontSize: 'large',
                width: 'auto',
                height: 'auto',
                padding: '5px 10px',
                marginLeft: '3vh',
                marginTop: '4vh',
              }}
            >
              Crop Again
            </button>

            <button
              onClick={() => {
                setCurrentPage('choose-img');
                setImage('');
              }}
              style={{
                fontSize: 'large',
                width: 'auto',
                height: 'auto',
                padding: '5px 10px',
                marginLeft: '3vh',
                marginTop: '4vh',
              }}
            >
              New Image
            </button>
          </div>
        )}
      </div>{' '}
    </div>
  );
};

export default MainImageCropper;
