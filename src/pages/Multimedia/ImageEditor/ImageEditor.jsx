// import React from 'react';
// import './ImageEditor.css'; // Import the CSS file

// const ImageEditor = () => {
//   return (
//     <div className="container">
//       {/* <h2>Easy Image Editor</h2> */}
//       <div className="wrapper">
//         <div className="editor-panel">
//           <label className="title">Filters</label>
//           <div className="options">
//             <button id="brightness" className="active">Brightness</button>
//             <button id="saturation">Saturation</button>
//             <button id="inversion">Inversion</button>
//             <button id="grayscale">Grayscale</button>
//           </div>
//           <div className="slider">
//             <div className="filter-info">
//               <p className="name">Brighteness</p>
//               <p className="value">100%</p>
//             </div>
//             <input type="range" value="100" min="0" max="200" />
//           </div>
//           <div className="rotate">
//             <label className="title">Rotate & Flip</label>
//             <div className="options">
//               <button id="left"><i className="fa-solid fa-rotate-left"></i></button>
//               <button id="right"><i className="fa-solid fa-rotate-right"></i></button>
//               <button id="horizontal"><i className='bx bx-reflect-vertical'></i></button>
//               <button id="vertical"><i className='bx bx-reflect-horizontal'></i></button>
//             </div>
//           </div>
//         </div>
//         <div className="preview-img">
//           <img src="image-placeholder.svg" alt="preview-img" />
//         </div>
//       </div>
//       <div className="controls" style={{marginBottom:'-70vh'}}>
//         <button className="reset-filter">Reset Filters</button>
//         <div className="row" >
//           <input type="file" className="file-input" accept="image/*" hidden />
//           <button className="choose-img">Choose Image</button>
//           <button className="save-img">Save Image</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;

// App.js
// ImageEditor.jsx
// ImageEditor.jsx
// ImageEditor.jsx
// import React, { useState, useEffect } from 'react';
// import './style.css'; // Import your CSS file here

// function ImageEditor() {
//   const [brightness, setBrightness] = useState("100");
//   const [saturation, setSaturation] = useState("100");
//   const [inversion, setInversion] = useState("0");
//   const [grayscale, setGrayscale] = useState("0");

//   useEffect(() => {
//     const fileInput = document.querySelector(".file-input");
//     const filterOptions = document.querySelectorAll(".filter button");
//     const filterName = document.querySelector(".filter-info .name");
//     const filterValue = document.querySelector(".filter-info .value");
//     const filterSlider = document.querySelector(".slider input");
//     const rotateOptions = document.querySelectorAll(".rotate button");
//     const previewImg = document.querySelector(".preview-img img");
//     const resetFilterBtn = document.querySelector(".reset-filter");
//     const chooseImgBtn = document.querySelector(".choose-img");
//     const saveImgBtn = document.querySelector(".save-img");

//     let rotate = 0,
//       flipHorizontal = 1,
//       flipVertical = 1;

//     const loadImage = () => {
//       let file = fileInput.files[0];
//       if (!file) return;
//       previewImg.src = URL.createObjectURL(file);
//       previewImg.addEventListener("load", () => {
//         resetFilterBtn.click();
//         document.querySelector(".container").classList.remove("disable");
//       });
//     };

//     const applyFilter = () => {
//       previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
//       previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//     };

//     const updateFilter = () => {
//       filterValue.innerText = `${filterSlider.value}%`;
//       const selectedFilter = document.querySelector(".filter .active");

//       if (selectedFilter.id === "brightness") {
//         setBrightness(filterSlider.value);
//       } else if (selectedFilter.id === "saturation") {
//         setSaturation(filterSlider.value);
//       } else if (selectedFilter.id === "inversion") {
//         setInversion(filterSlider.value);
//       } else {
//         setGrayscale(filterSlider.value);
//       }
//     };

//     const resetFilter = () => {
//       setBrightness("100");
//       setSaturation("100");
//       setInversion("0");
//       setGrayscale("0");
//       rotate = 0;
//       flipHorizontal = 1;
//       flipVertical = 1;
//       filterOptions[0].click();
//       applyFilter();
//     };

//     const saveImage = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = previewImg.naturalWidth;
//       canvas.height = previewImg.naturalHeight;

//       ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//       ctx.translate(canvas.width / 2, canvas.height / 2);
//       if (rotate !== 0) {
//         ctx.rotate((rotate * Math.PI) / 180);
//       }
//       ctx.scale(flipHorizontal, flipVertical);
//       ctx.drawImage(
//         previewImg,
//         -canvas.width / 2,
//         -canvas.height / 2,
//         canvas.width,
//         canvas.height
//       );

//       const link = document.createElement("a");
//       link.download = "image.jpg";
//       link.href = canvas.toDataURL();
//       link.click();
//     };

//     // Event listeners
//     filterSlider.addEventListener("input", updateFilter);
//     resetFilterBtn.addEventListener("click", resetFilter);
//     saveImgBtn.addEventListener("click", saveImage);
//     fileInput.addEventListener("change", loadImage);
//     chooseImgBtn.addEventListener("click", () => fileInput.click());

//     // Cleanup function to remove event listeners when component unmounts
//     return () => {
//       filterSlider.removeEventListener("input", updateFilter);
//       resetFilterBtn.removeEventListener("click", resetFilter);
//       saveImgBtn.removeEventListener("click", saveImage);
//       fileInput.removeEventListener("change", loadImage);
//       chooseImgBtn.removeEventListener("click", () => fileInput.click());
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on component mount

//   return (
//     <div className="App">
//       {/* Render your HTML content */}
//       <div className="container disable">
//         <h2>Easy Image Editor</h2>
//         <div className="wrapper">
//           <div className="editor-panel">
//             <div className="filter">
//               <label className="title">Filters</label>
//               <div className="options">
//                 <button id="brightness" className="active">Brightness</button>
//                 <button id="saturation">Saturation</button>
//                 <button id="inversion">Inversion</button>
//                 <button id="grayscale">Grayscale</button>
//               </div>
//               <div className="slider">
//                 <div className="filter-info">
//                   <p className="name">Brighteness</p>
//                   <p className="value">{brightness}%</p>
//                 </div>
//                 <input
//                   type="range"
//                   value={brightness}
//                   min="0"
//                   max="200"
//                   onChange={(e) => setBrightness(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="rotate">
//               <label className="title">Rotate & Flip</label>
//               <div className="options">
//                 <button id="left">Left</button>
//                 <button id="right">Right</button>
//                 <button id="horizontal">Horizontal</button>
//                 <button id="vertical">Vertical</button>
//               </div>
//             </div>
//           </div>
//           <div className="preview-img">
//             <img src="image-placeholder.svg" alt="preview-img" />
//           </div>
//         </div>
//         <div className="controls">
//           <button className="reset-filter">Reset Filters</button>
//           <div className="row">
//             <input type="file" className="file-input" accept="image/*" hidden />
//             <button className="choose-img">Choose Image</button>
//             <button className="save-img">Save Image</button>
//           </div>
//         </div>
//       </div>
//       <p>Welcome to my React App!</p>
//     </div>
//   );
// }

// export default ImageEditor;

import React, { useState, useRef, useEffect } from 'react';
import './style.css'; // Import your CSS file here
import Nav1 from '../../../components/HomePageComponents/Nav1';

function ImageEditor() {
  // State variables to manage image editing
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);

  // Function to apply filters to the image
  const applyFilters = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    };
  };

  // UseEffect hook to apply filters whenever state changes
  useEffect(() => {
    if (imageSrc) {
      applyFilters();
    }
  }, [brightness, saturation, inversion, grayscale, rotation, imageSrc]);

  // Event handlers for adjusting filter values
  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const handleSaturationChange = (event) => {
    setSaturation(event.target.value);
  };

  const handleInversionChange = (event) => {
    setInversion(event.target.value);
  };

  const handleGrayscaleChange = (event) => {
    setGrayscale(event.target.value);
  };

  // Event handler for choosing a new image
  const handleChooseImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Event handler for rotating the image left
  const handleRotateLeft = () => {
    setRotation((rotation - 90) % 360);
  };

  // Event handler for rotating the image right
  const handleRotateRight = () => {
    setRotation((rotation + 90) % 360);
  };

  // Event handler for resetting filters
  const handleResetFilters = () => {
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setRotation(0);
  };

  // Event handler for saving the edited image
  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const imageURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = imageURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rendered JSX
  return (
    <div style={{ boxSizing: 'border-box' }}>
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
          fontSize: '1vh',
        }}
      >
        <h1>Image Editor</h1>
      </nav>
      <div
        className="App"
        style={{
          display: 'flex',
          padding: '10px',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="container ">
          <div className="wrapper">
            <div className="editor-panel">
              {/* Sliders for adjusting filters */}
              <div className="filter">
                <label className="title">Brightness</label>
                <div className="slider">
                  <input
                    type="range"
                    value={brightness}
                    min="0"
                    max="200"
                    onChange={handleBrightnessChange}
                  />
                </div>
              </div>
              <div className="filter">
                <label className="title">Saturation</label>
                <div className="slider">
                  <input
                    type="range"
                    value={saturation}
                    min="0"
                    max="200"
                    onChange={handleSaturationChange}
                  />
                </div>
              </div>
              <div className="filter">
                <label className="title">Inversion</label>
                <div className="slider">
                  <input
                    type="range"
                    value={inversion}
                    min="0"
                    max="100"
                    onChange={handleInversionChange}
                  />
                </div>
              </div>
              <div className="filter">
                <label className="title">Grayscale</label>
                <div className="slider">
                  <input
                    type="range"
                    value={grayscale}
                    min="0"
                    max="100"
                    onChange={handleGrayscaleChange}
                  />
                </div>
              </div>
              <br />
              <div className="filter">
                <label className="title">Rotation</label>
                <div className="rotate-buttons">
                  <button onClick={handleRotateLeft}>Rotate Left</button> &nbsp;
                  <button onClick={handleRotateRight}>Rotate Right</button>
                </div>
              </div>
              <br />
              <button
                className="reset-filter"
                onClick={handleResetFilters}
                style={{
                  width: '50%',
                  color: '#fff',
                  background: '#5372F0',
                  borderColor: '#5372F0',
                }}
              >
                Reset Filters
              </button>
            </div>
            {/* Display image preview */}
            <div
              className="preview-img"
              style={{
                marginLeft: '4vh',
                maxWidth: '790px',
                maxHeight: '535px',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            >
              <div className="image-box" style={{ width: '100%' }}>
                <canvas ref={canvasRef} style={{ width: '800px' }}></canvas>
              </div>
            </div>
          </div>
          {/* Control buttons for resetting, choosing image, and saving */}
          <div
            className="controls"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '40vh' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '-100vh' }}>
                <input
                  type="file"
                  className="choose-img"
                  accept="image/*"
                  onChange={handleChooseImage}
                  hidden
                />
                <button
                  className="choose-img"
                  onClick={() => document.querySelector('.choose-img').click()}
                  style={{}}
                >
                  Choose Image
                </button>
                <button className="save-img" onClick={handleSaveImage}>
                  Save Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;
