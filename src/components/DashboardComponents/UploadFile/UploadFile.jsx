import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  uploadFile,
  deleteUploadedFile,
} from '../../../redux/actionCreators/fileFoldersActionCreator';

// const { uploadFile, deleteUploadedFile } = fileActions;
const UploadFile = ({ setIsFileUploadModalOpen }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.filefolders.userFiles,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const checkFileAlreadyPresent = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((fldr) => fldr.data.name === name);
    return filePresent ? true : false;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setSuccess(false);
  //   setUploadProgress(0);

  //   if (file) {
  //     if (!checkFileAlreadyPresent(file.name)) {
  //       const formData = new FormData();
  //       formData.append('file', file);
  //       formData.append('userId', user?.uid || '');
  //       formData.append('folderId', currentFolder || 'root');
  //       formData.append('path', currentFolder === 'root' ? [] : [currentFolder]);
  //       formData.append('createdAt', new Date().toISOString());

  //       dispatch(uploadFile(formData, setSuccess, setError, setUploadProgress));
  //     } else {
  //       setError('File already exists in this folder');
  //     }
  //   } else {
  //     setError('Please select a file to upload');
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUploadProgress(0);

    if (file) {
      if (!checkFileAlreadyPresent(file.name)) {
        const formData = new FormData();
        const storagePath = `uploads/${user?.uid || 'unknown'}/${file.name}`; // ✅ ADD THIS

        formData.append('file', file);
        formData.append('userId', user?.uid || '');
        formData.append('folderId', currentFolder || 'root');
        formData.append('path', currentFolder === 'root' ? [] : [currentFolder]);
        formData.append('createdAt', new Date().toISOString());
        formData.append('storagePath', storagePath); // ✅ ADD THIS

        dispatch(uploadFile(formData, setSuccess, setError, setUploadProgress));
      } else {
        setError('File already exists in this folder');
      }
    } else {
      setError('Please select a file to upload');
    }
  };

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: 'rgba(0, 0, 0, 0.4)', zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Upload File</h4>
            <button className="btn" onClick={() => setIsFileUploadModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} className="text-black" size="sm" />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="progress mb-3">
                  <div
                    className="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
                  </div>
                </div>
              )}
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5 form-control">
                {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Upload File'}
              </button>
            </form>
            {success && <div className="alert alert-success mt-3">File uploaded successfully!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
