// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux/es/hooks/useSelector'
// import Header from './Header'
// import { shallowEqual } from 'react-redux'
// import CodeEditor from './CodeEditor'

// const FileComponent = () => {

//     const {fileId} = useParams();
//     const [fileData, setFileData] = useState("");
//     const [prevFileData, setPrevFileData] = useState("");

//     const navigate = useNavigate();

//     const { currentFile } = useSelector((state) => ({
//       currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId),
//     }), shallowEqual);

//     useEffect(()=>{
//       if(currentFile){
//         setFileData(currentFile.data.data);
//         setPrevFileData(currentFile.data.data);
//       }
//     }, [currentFile, currentFile.data.data]);

//     // useEffect(() => {
//     //   if (currentFile && currentFile.data) {
//     //     setFileData(currentFile.data.data);
//     //     setPrevFileData(currentFile.data.data);
//     //   }
//     // }, [currentFile]);

//       if (!currentFile || !currentFile.data) {
//         return <div>Loading...</div>;
//     }

//     return (
//       <div>
//             {
//               fileData !== null  ? (
//                 <><Header fileName={currentFile.data.name} fileData={fileData} prevFileData = {prevFileData} fileId={fileId}/>
//                   <CodeEditor fileName={currentFile.data.name} data={fileData} setData={setFileData} />
//                 </>

//               ):(
//                 <div className=" position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
//                   <div className='d-flex py-4 mt-4 px-5 justify-content-between align-items-center'>
//                     <p title={currentFile.data.name} className='my-0'>
//                       {currentFile.data.name.length > 40
//                         ? currentFile.data.name.slice(0, 40) + "... ." + currentFile.data.extension
//                         : currentFile.data.name}
//                     </p>

//                     <div className='d-flex align-items-center me-5'>
//                       <button className='btn btn-sm btn-outline-light mr-2' onClick={()=> navigate(-1)}>
//                         <i className='fas fa-arrow-left'></i>
//                         Go Back
//                       </button>

//                       <button className='btn btn-sm btn-primary' onClick={()=> navigate(-1)}>Download</button>
//                     </div>

//                   </div>

//                   <div className='w-100 mt-4'>
//                     {
//                       currentFile.data.extension.includes("png") ||
//                       currentFile.data.extension.includes("jpg") ||
//                       currentFile.data.extension.includes("jpeg") ||
//                       currentFile.data.extension.includes("gif") ? (
//                         <img src={currentFile.data.url} alt={currentFile.data.name} className='w-100 h-100' />
//                       ) : (
//                         <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
//                           <p className='text-center'>
//                             File type not supported. Please download the file to view it.
//                           </p>
//                         </div>
//                       )

//                     }
//                   </div>
//                 </div>
//               )
//             }

//       </div>
//     );

// };

// export default FileComponent;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux/es/hooks/useSelector';
// import Header from './Header';
// import { shallowEqual } from 'react-redux';
// import CodeEditor from './CodeEditor';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { useDispatch } from 'react-redux';

// const FileComponent = () => {

//   const dispatch = useDispatch();

//     const handleDelete = () => {
//         if (window.confirm("Are you sure you want to delete this file?")) {
//             dispatch(deleteFile(fileId));
//         }
//     };

//   const { fileId } = useParams();
//   const [fileData, setFileData] = useState("");
//   const [prevFileData, setPrevFileData] = useState("");
//   const navigate = useNavigate();

//   const { currentFile } = useSelector((state) => ({
//     currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId),
//   }), shallowEqual);

//   useEffect(() => {
//     if (currentFile) {
//       setFileData(currentFile.data.data);
//       setPrevFileData(currentFile.data.data);
//     }
//   }, [currentFile]);

//   if (!currentFile || !currentFile.data) {
//     return <div>Loading...</div>;
//   }

//   const downloadFile = () => {
//     const element = document.createElement("a");
//     element.setAttribute("href", currentFile.data.url);
//     element.setAttribute("download", currentFile.data.name);
//     element.setAttribute("target", "_blank");
//     element.style.display = "none";
//     document.body.appendChild(element);

//     element.click();

//     document.body.removeChild(element);
//   };

//   return (
//     <div>
//       {fileData !== null ? (
//         <>
//           <Header
//             fileName={currentFile.data.name}
//             fileData={fileData}
//             prevFileData={prevFileData}
//             fileId={fileId}
//           />
//           <CodeEditor
//             fileName={currentFile.data.name}
//             data={fileData}
//             setData={setFileData}
//           />
//         </>
//       ) : (
//         <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
//           <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
//             <p title={currentFile.data.name} className="my-0">
//               {currentFile.data.name.length > 40
//                 ? currentFile.data.name.slice(0, 40) + "... ." + currentFile.data.extension
//                 : currentFile.data.name}
//             </p>

//             <div className="d-flex align-items-center me-5">
//               <button className="btn btn-sm btn-outline-light mr-2" onClick={() => navigate(-1)}>
//                 <i className="fas fa-arrow-left"></i>
//                 &nbsp; Go Back
//               </button> &nbsp;&nbsp;

//               <button className="btn btn-sm btn-primary" onClick={()=> downloadFile()}>
//                 Download
//               </button>

//             </div>
//           </div>

//           <div className="w-100 mt-4" style={{height:"550px"}}>
//             {currentFile.data.extension.includes("png") ||
//             currentFile.data.extension.includes("jpg") ||
//             currentFile.data.extension.includes("jpeg") ||
//             currentFile.data.extension.includes("gif") ? (
//               <img src={currentFile.data.url} alt={currentFile.data.name} className="w-100 h-100 img-fluid" />
//             ) : (
//               <div className="w-100 h-100 d-flex justify-content-center align-items-center">
//                 <p className="text-center">
//                   File type not supported. Please download the file to view it.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileComponent;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Header from './Header';
// import { shallowEqual } from 'react-redux';
// import CodeEditor from './CodeEditor';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { useDispatch } from 'react-redux';
// import { deleteFile } from '../../../redux/actionCreators/fileFoldersActionCreator';

// const FileComponent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { fileId } = useParams();
//   const [fileData, setFileData] = useState("");
//   const [prevFileData, setPrevFileData] = useState("");

//   const { currentFile } = useSelector((state) => ({
//     currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId),
//   }), shallowEqual);

//   useEffect(() => {
//     if (currentFile) {
//       setFileData(currentFile.data.data);
//       setPrevFileData(currentFile.data.data);
//     }
//   }, [currentFile]);

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this file?")) {
//       dispatch(deleteFile(fileId));
//       navigate("/dashboard"); // Redirect to dashboard after deletion
//     }
//   };

//   if (!currentFile || !currentFile.data) {
//     return <div>Loading...</div>;
//   }

//   const downloadFile = () => {
//     const element = document.createElement("a");
//     element.setAttribute("href", currentFile.data.url);
//     element.setAttribute("download", currentFile.data.name);
//     element.setAttribute("target", "_blank");
//     element.style.display = "none";
//     document.body.appendChild(element);

//     element.click();

//     document.body.removeChild(element);
//   };

//   return (
//     <div>
//       {fileData !== null ? (
//         <>
//           <Header
//             fileName={currentFile.data.name}
//             fileData={fileData}
//             prevFileData={prevFileData}
//             fileId={fileId}
//           />
//           <CodeEditor
//             fileName={currentFile.data.name}
//             data={fileData}
//             setData={setFileData}
//           />
//           <button onClick={handleDelete}>Delete File</button> {/* Delete button */}
//         </>
//       ) : (
//         <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
//           <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
//             <p title={currentFile.data.name} className="my-0">
//               {currentFile.data.name.length > 40
//                 ? currentFile.data.name.slice(0, 40) + "... ." + currentFile.data.extension
//                 : currentFile.data.name}
//             </p>
//             <div className="d-flex align-items-center me-5">
//               <button className="btn btn-sm btn-outline-light mr-2" onClick={() => navigate(-1)}>
//                 <i className="fas fa-arrow-left"></i>
//                 &nbsp; Go Back
//               </button> &nbsp;&nbsp;
//               <button className="btn btn-sm btn-primary" onClick={downloadFile}>
//                 Download
//               </button>
//             </div>
//           </div>
//           <div className="w-100 mt-4" style={{ height: "550px" }}>
//             {currentFile.data.extension.includes("png") ||
//               currentFile.data.extension.includes("jpg") ||
//               currentFile.data.extension.includes("jpeg") ||
//               currentFile.data.extension.includes("gif") ? (
//               <img src={currentFile.data.url} alt={currentFile.data.name} className="w-100 h-100 img-fluid" />
//             ) : (
//               <div className="w-100 h-100 d-flex justify-content-center align-items-center">
//                 <p className="text-center">
//                   File type not supported. Please download the file to view it.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileComponent;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import { shallowEqual } from 'react-redux';
import CodeEditor from './CodeEditor';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { deleteFile } from '../../../redux/actionCreators/fileFoldersActionCreator';

const FileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [fileData, setFileData] = useState('');
  const [prevFileData, setPrevFileData] = useState('');

  const { currentFile } = useSelector(
    (state) => ({
      currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId),
    }),
    shallowEqual
  );

  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile.data.data);
      setPrevFileData(currentFile.data.data);
    }
  }, [currentFile]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      dispatch(deleteFile(fileId));
      navigate('/dashboard'); // Redirect to dashboard after deletion
    }
  };

  if (!currentFile || !currentFile.data) {
    return <div>Loading...</div>;
  }

  const downloadFile = () => {
    const element = document.createElement('a');
    element.setAttribute('href', currentFile.data.url);
    element.setAttribute('download', currentFile.data.name);
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div>
      {fileData !== null ? (
        <>
          <button
            className="btn btn-sm btn-primary  btn-danger"
            onClick={handleDelete}
            style={{ marginLeft: '90%' }}
          >
            Delete File
          </button>
          <Header
            fileName={currentFile.data.name}
            fileData={fileData}
            prevFileData={prevFileData}
            fileId={fileId}
          />
          <CodeEditor fileName={currentFile.data.name} data={fileData} setData={setFileData} />
        </>
      ) : (
        <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
          <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
            <p title={currentFile.data.name} className="my-0">
              {currentFile.data.name.length > 40
                ? currentFile.data.name.slice(0, 40) + '... .' + currentFile.data.extension
                : currentFile.data.name}
            </p>
            <div className="d-flex align-items-center me-5">
              <button className="btn btn-sm btn-outline-light mr-2" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i>
                &nbsp; Go Back
              </button>{' '}
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-primary" onClick={downloadFile}>
                Download
              </button>{' '}
              &nbsp;
              <button className="btn btn-sm btn-primary  btn-danger" onClick={handleDelete}>
                Delete File
              </button>{' '}
              {/* Delete button */}
            </div>
          </div>
          <div className="w-100 mt-4" style={{ height: '550px' }}>
            {currentFile.data.extension.includes('png') ||
            currentFile.data.extension.includes('jpg') ||
            currentFile.data.extension.includes('jpeg') ||
            currentFile.data.extension.includes('gif') ? (
              <img
                src={currentFile.data.url}
                alt={currentFile.data.name}
                className="w-100 h-100 img-fluid"
              />
            ) : (
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <p className="text-center">
                  File type not supported. Please download the file to view it.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileComponent;
