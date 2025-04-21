// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateFileData } from '../../../redux/actionCreators/fileFoldersActionCreator';

// const Header = ({ fileName, fileId, fileData, prevFileData }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSave = () => {
//     // Check if fileData and prevFileData are defined and not equal
//     if (fileData && prevFileData && JSON.stringify(fileData) !== JSON.stringify(prevFileData)) {
//       dispatch(updateFileData(fileId, fileData));
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-light shadow-sm">
//         <p className="navbar-brand my-0 fw-bold ms-5">{fileName}</p>

//         {fileData !== prevFileData && (
//           <h5 className="my-0 fw-bold ms-2 text-danger ">*[modified]</h5>
//         )}

//         <ul className="navbar-nav ms-auto me-5">
//           <li className="nav-item mx-2">
//             <button
//               className="btn btn-success"
//               disabled={fileData === prevFileData}
//               onClick={() => {
//                 dispatch(updateFileData(fileId, fileData));
//               }}
//               // onClick={handleSave}
//             >
//               <FontAwesomeIcon icon={faSave} /> &nbsp;Save
//             </button>
//           </li>

//           <li className="nav-item">
//             <button className="btn btn-dark" onClick={() => navigate(-1)}>
//               <FontAwesomeIcon icon={faArrowLeftLong} /> &nbsp;Go Back
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Header;

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave, faArrowLeftLong, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateFileData, deleteFile } from '../../../redux/actionCreators/fileFoldersActionCreator';

// const Header = ({ fileName, fileId, fileData, prevFileData }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSave = () => {
//     if (fileData && prevFileData) {
//       const contentChanged = fileData.data !== prevFileData.data;

//       if (contentChanged) {
//         dispatch(updateFileData(fileId, fileData));
//         console.log('✅ Changes saved to Firestore.');
//       } else {
//         console.log('ℹ️ No changes detected. Nothing was saved.');
//       }
//     }
//   };

//   const handleDelete = () => {
//     const confirmDelete = window.confirm(`Are you sure you want to delete "${fileName}"?`);
//     if (confirmDelete) {
//       dispatch(deleteFile(fileId));
//       navigate(-1); // Navigate back after deletion
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-light shadow-sm">
//         <p className="navbar-brand my-0 fw-bold ms-5">{fileName}</p>

//         {fileData !== prevFileData && (
//           <h5 className="my-0 fw-bold ms-2 text-danger">*[modified]</h5>
//         )}

//         <ul className="navbar-nav ms-auto me-5">
//           <li className="nav-item mx-2">
//             <button
//               className="btn btn-success"
//               disabled={fileData?.data === prevFileData?.data}
//               onClick={handleSave}
//             >
//               <FontAwesomeIcon icon={faSave} /> &nbsp;Save
//             </button>
//           </li>

//           <li className="nav-item mx-2">
//             <button className="btn btn-danger" onClick={handleDelete}>
//               <FontAwesomeIcon icon={faTrash} /> &nbsp;Delete
//             </button>
//           </li>

//           <li className="nav-item">
//             <button className="btn btn-dark" onClick={() => navigate(-1)}>
//               <FontAwesomeIcon icon={faArrowLeftLong} /> &nbsp;Go Back
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeftLong, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateFileData, deleteFile } from '../../../redux/actionCreators/fileFoldersActionCreator';

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Define the loading state here
  const [loading, setLoading] = useState(false); // Loading state to track save progress

  const handleSave = () => {
    console.log('Save button clicked');
    if (fileData && prevFileData) {
      const contentChanged = fileData.data !== prevFileData.data;
      console.log('🟡 Save button clicked!');

      if (contentChanged) {
        setLoading(true); // Start loading
        dispatch(updateFileData(fileId, fileData))
          .then(() => {
            console.log('✅ Changes saved to Firestore.');
            setLoading(false); // Stop loading
          })
          .catch((error) => {
            console.error('Error saving changes:', error);
            setLoading(false); // Stop loading on error
          });
      } else {
        console.log('ℹ️ No changes detected. Nothing was saved.');
      }
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${fileName}"?`);
    if (confirmDelete) {
      dispatch(deleteFile(fileId));
      navigate(-1); // Navigate back after deletion
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-light shadow-sm">
        <p className="navbar-brand my-0 fw-bold ms-5">{fileName}</p>

        {fileData !== prevFileData && (
          <h5 className="my-0 fw-bold ms-2 text-danger">*[modified]</h5>
        )}

        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item mx-2">
            <button
              className="btn btn-success"
              disabled={fileData?.data === prevFileData?.data || loading} // Disable button during loading
              onClick={handleSave}
            >
              {loading ? 'Saving...' : <FontAwesomeIcon icon={faSave} />} &nbsp;Save
            </button>
          </li>

          <li className="nav-item mx-2">
            <button className="btn btn-danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> &nbsp;Delete
            </button>
          </li>

          <li className="nav-item">
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeftLong} /> &nbsp;Go Back
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
