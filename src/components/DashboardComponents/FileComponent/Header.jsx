import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { updateFileData } from '../../../redux/actionCreators/fileFoldersActionCreator'

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = () => {
    // Check if fileData and prevFileData are defined and not equal
    if (fileData && prevFileData && JSON.stringify(fileData) !== JSON.stringify(prevFileData)) {
      dispatch(updateFileData(fileId, fileData));
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-light shadow-sm">
        <p className="navbar-brand my-0 fw-bold ms-5">{fileName}</p>

        {fileData !== prevFileData && (
          <h5 className="my-0 fw-bold ms-2 text-danger ">*[modified]</h5>
        )}

        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item mx-2">
            <button
              className="btn btn-success"
              disabled={fileData === prevFileData}
              onClick={() => {
                dispatch(updateFileData(fileId, fileData));
              }}
              // onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} /> &nbsp;Save
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
