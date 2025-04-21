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
//   const [fileData, setFileData] = useState('');
//   const [prevFileData, setPrevFileData] = useState('');

//   const { currentFile } = useSelector(
//     (state) => ({
//       currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId),
//     }),
//     shallowEqual
//   );

//   useEffect(() => {
//     if (currentFile) {
//       setFileData(currentFile.data?.data || '');
//       setPrevFileData(currentFile.data?.data || '');
//     }
//   }, [currentFile]);

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this file?')) {
//       dispatch(deleteFile(fileId));
//       navigate('/dashboard');
//     }
//   };

//   if (!currentFile || !currentFile.data) {
//     return <div>Loading...</div>;
//   }

//   const downloadFile = () => {
//     const element = document.createElement('a');
//     element.setAttribute('href', currentFile.data.url);
//     element.setAttribute('download', currentFile.data.name);
//     element.setAttribute('target', '_blank');
//     element.style.display = 'none';
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   const renderFileContent = () => {
//     const { extension, type, url, name } = currentFile.data;
//     const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension.toLowerCase());
//     const isPDF = extension.toLowerCase() === 'pdf';
//     const isText = ['txt', 'log', 'md', 'markdown'].includes(extension.toLowerCase());
//     const isCode = ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml'].includes(
//       extension.toLowerCase()
//     );
//     const isOfficeDoc = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(
//       extension.toLowerCase()
//     );
//     const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(extension.toLowerCase());
//     const isAudio = ['mp3', 'wav', 'ogg'].includes(extension.toLowerCase());

//     if (fileData !== null && (isCode || isText)) {
//       return (
//         <>
//           <Header
//             fileName={currentFile.data.name}
//             fileData={fileData}
//             prevFileData={prevFileData}
//             fileId={fileId}
//           />
//           <CodeEditor fileName={currentFile.data.name} data={fileData} setData={setFileData} />
//         </>
//       );
//     }

//     return (
//       <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
//         <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
//           <p title={name} className="my-0">
//             {name.length > 40 ? `${name.slice(0, 40)}... .${extension}` : `${name}.${extension}`}
//           </p>
//           <div className="d-flex align-items-center me-5">
//             <button className="btn btn-sm btn-outline-light mr-2" onClick={() => navigate(-1)}>
//               <i className="fas fa-arrow-left"></i>
//               &nbsp; Go Back
//             </button>
//             <button className="btn btn-sm btn-primary mx-2" onClick={downloadFile}>
//               <i className="fas fa-download"></i> Download
//             </button>
//             <button className="btn btn-sm btn-danger" onClick={handleDelete}>
//               <i className="fas fa-trash"></i> Delete
//             </button>
//           </div>
//         </div>
//         <div className="w-100 mt-4" style={{ height: 'calc(100vh - 100px)' }}>
//           {isImage ? (
//             <img
//               src={url}
//               alt={name}
//               className="w-100 h-100 img-fluid"
//               style={{ objectFit: 'contain' }}
//             />
//           ) : isPDF ? (
//             <iframe
//               src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
//               className="w-100 h-100"
//               title={name}
//               frameBorder="0"
//             ></iframe>
//           ) : isVideo ? (
//             <video controls className="w-100 h-100">
//               <source src={url} type={`video/${extension}`} />
//               Your browser does not support the video tag.
//             </video>
//           ) : isAudio ? (
//             <div className="d-flex justify-content-center align-items-center h-100">
//               <audio controls>
//                 <source src={url} type={`audio/${extension}`} />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           ) : isOfficeDoc ? (
//             <iframe
//               src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
//               className="w-100 h-100"
//               title={name}
//               frameBorder="0"
//             ></iframe>
//           ) : isText || isCode ? (
//             <div className="w-100 h-100 p-3 bg-dark text-white overflow-auto">
//               <pre>{fileData || 'File content is empty'}</pre>
//             </div>
//           ) : (
//             <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
//               <p className="text-center mb-4">
//                 File type not directly viewable. Please download the file to view it.
//               </p>
//               <button className="btn btn-primary" onClick={downloadFile}>
//                 <i className="fas fa-download me-2"></i> Download File
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return <div>{renderFileContent()}</div>;
// };

// export default FileComponent;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Header from './Header';
import CodeEditor from './CodeEditor';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { deleteUploadedFile } from '../../../redux/actionCreators/fileFoldersActionCreator';

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
      setFileData(currentFile.data?.data || '');
      setPrevFileData(currentFile.data?.data || '');
    }
  }, [currentFile]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      console.log('Current File Path:', currentFile.data.path);
      dispatch(deleteUploadedFile(currentFile.docId, currentFile.data.path));
      navigate('/dashboard');
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

  const renderFileContent = () => {
    const { extension, type, url, name } = currentFile.data;
    const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension.toLowerCase());
    const isPDF = extension.toLowerCase() === 'pdf';
    const isText = ['txt', 'log', 'md', 'markdown'].includes(extension.toLowerCase());
    const isCode = ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml'].includes(
      extension.toLowerCase()
    );
    const isOfficeDoc = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(
      extension.toLowerCase()
    );
    const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(extension.toLowerCase());
    const isAudio = ['mp3', 'wav', 'ogg'].includes(extension.toLowerCase());

    if (fileData !== null && (isCode || isText)) {
      return (
        <>
          <Header
            fileName={currentFile.data.name}
            fileData={fileData}
            prevFileData={prevFileData}
            fileId={fileId}
          />
          {/* <CodeEditor fileName={currentFile.data.name} data={fileData} setData={setFileData} /> */}
          <CodeEditor
            fileName={currentFile.data.name}
            data={fileData?.data}
            onChange={(newValue) =>
              setFileData((prev) => ({
                ...prev,
                data: newValue,
              }))
            }
          />
        </>
      );
    }

    return (
      <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
        <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
          <p title={name} className="my-0">
            {name.length > 40 ? `${name.slice(0, 40)}... .${extension}` : `${name}.${extension}`}
          </p>
          <div className="d-flex align-items-center me-5">
            <button className="btn btn-sm btn-outline-light mr-2" onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i> &nbsp; Go Back
            </button>
            <button className="btn btn-sm btn-primary mx-2" onClick={downloadFile}>
              <i className="fas fa-download"></i> Download
            </button>
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
        <div className="w-100 mt-4" style={{ height: 'calc(100vh - 100px)' }}>
          {isImage ? (
            <img
              src={url}
              alt={name}
              className="w-100 h-100 img-fluid"
              style={{ objectFit: 'contain' }}
            />
          ) : isPDF ? (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
              className="w-100 h-100"
              title={name}
              frameBorder="0"
            ></iframe>
          ) : isVideo ? (
            <video controls className="w-100 h-100">
              <source src={url} type={`video/${extension}`} />
              Your browser does not support the video tag.
            </video>
          ) : isAudio ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <audio controls>
                <source src={url} type={`audio/${extension}`} />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : isOfficeDoc ? (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
              className="w-100 h-100"
              title={name}
              frameBorder="0"
            ></iframe>
          ) : (
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
              <p className="text-center mb-4">
                File type not directly viewable. Please download the file to view it.
              </p>
              <button className="btn btn-primary" onClick={downloadFile}>
                <i className="fas fa-download me-2"></i> Download File
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div>{renderFileContent()}</div>;
};

export default FileComponent;
