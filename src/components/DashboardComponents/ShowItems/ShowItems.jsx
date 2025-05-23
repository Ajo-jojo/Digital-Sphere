// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { changeFolder } from '../../../redux/actionCreators/fileFoldersActionCreator';
// // import { deleteDoc, doc } from 'firebase/firestore'; // Uncomment if using Firestore
// // import { deleteObject, ref } from 'firebase/storage'; // Uncomment if deleting files from Firebase Storage
// // import { db, storage } from '../../../firebase'; // Your Firebase config

// const ShowItems = ({ title, items, type }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleDblClick = (itemId) => {
//     console.log('called', itemId);
//     if (type === 'folder') {
//       dispatch(changeFolder(itemId));
//       navigate(`/dashboard/folder/${itemId}`);
//     } else {
//       navigate(`/dashboard/file/${itemId}`);
//     }
//   };

//   if (!items || items.length === 0) return null;

//   return (
//     <div className="w-100">
//       <h4 className="text-center border-bottom p-2">{title}</h4>
//       <div className="row gap-2 p-4 flex-wrap">
//         {items.map((item, index) => {
//           const itemName = item?.data?.name || item?.name || 'Untitled';
//           const itemId = item?.docId || item?.id || index;

//           return (
//             <p
//               key={`${type}-${itemId}`}
//               className="col-md-2 py-3 text-center flex-column border position-relative"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleDblClick(itemId)}
//             >
//               {type === 'folder' ? (
//                 <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
//               ) : (
//                 <FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />
//               )}
//               <br />
//               {itemName}

//               {/* Action Icons
//               <div className="mt-2 d-flex justify-content-center gap-3">
//                 {type === 'file' && (
//                   <FontAwesomeIcon
//                     // icon={faDownload}
//                     title="Download"
//                     className="text-primary cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       console.log('Download clicked for', itemId);
//                       // handleDownload(itemId);
//                     }}
//                   />
//                 )}
//                 <FontAwesomeIcon
//                   // icon={faTrashAlt}
//                   title="Delete"
//                   className="text-danger cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(item);
//                   }}
//                 />
//               </div> */}
//             </p>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ShowItems;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeFolder } from '../../../redux/actionCreators/fileFoldersActionCreator';
import { deleteFolderAndSubfolders } from '../../../redux/actionCreators/fileFoldersActionCreator';

const ShowItems = ({ title, items, type, userId }) => {
  // Added userId as a prop
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type === 'folder') {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  const handleDelete = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder and all its contents?')) {
      dispatch(deleteFolderAndSubfolders(folderId, userId)); // Call the delete action with folderId and userId
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom p-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          const itemName = item?.data?.name || item?.name || 'Untitled';
          const itemId = item?.docId || item?.id || index;

          return (
            <div
              key={`${type}-${itemId}`}
              className="col-md-2 py-3 text-center flex-column border position-relative"
              style={{ cursor: 'pointer' }}
              onClick={() => handleDblClick(itemId)}
            >
              {/* Delete icon */}
              {type === 'folder' && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="position-absolute text-danger"
                  style={{ top: '8px', right: '10px', zIndex: 2, cursor: 'pointer' }}
                  title="Delete folder"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening the folder
                    handleDelete(itemId); // pass folderId to delete
                  }}
                />
              )}

              {type === 'folder' ? (
                <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
              ) : (
                <FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />
              )}
              <br />
              {itemName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
