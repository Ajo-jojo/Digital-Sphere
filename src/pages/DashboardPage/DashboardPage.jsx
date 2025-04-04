import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/DashboardComponents/Navbar/Navbar';
import SubBar from '../../components/DashboardComponents/SubBar/SubBar';
import HomeComponent from '../../components/DashboardComponents/HomeComponent/HomeComponent';
import CreateFolder from '../../components/DashboardComponents/CreateFolder/CreateFolder';
import CreateFile from '../../components/DashboardComponents/CreateFile/CreateFile';
import UploadFile from '../../components/DashboardComponents/UploadFile/UploadFile';
import { getFolders, getFiles } from '../../redux/actionCreators/fileFoldersActionCreator';
import FolderComponent from '../../components/DashboardComponents/FolderComponent/FolderComponent';
import FileComponent from '../../components/DashboardComponents/FileComponent/FileComponent';

const DashboardPage = () => {
  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();

  const [modals, setModals] = useState({
    isCreateFolderModalOpen: false,
    isCreateFileModalOpen: false,
    isFileUploadModalOpen: false,
  });

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.filefolders.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shouldRedirect = useMemo(() => !isLoggedIn || !userId, [isLoggedIn, userId]);

  const toggleModal = useCallback((modalName, isOpen) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: isOpen,
    }));
  }, []);

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     setTimeout(()=>{
  //       navigate("/");
  //     },200)
  //   }
  // }, [shouldRedirect, navigate]);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch]);

  useEffect(() => {
    setShowSubBar(!pathname.includes('/file/'));
  }, [pathname]);

  // Render modals more cleanly
  const renderModals = () => (
    <>
      {modals.isCreateFolderModalOpen && (
        <CreateFolder
          setIsCreateFolderModalOpen={() => toggleModal('isCreateFolderModalOpen', false)}
        />
      )}
      {modals.isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={() => toggleModal('isCreateFileModalOpen', false)} />
      )}
      {modals.isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen={() => toggleModal('isFileUploadModalOpen', false)} />
      )}
    </>
  );

  return (
    <>
      {renderModals()}
      <Navbar />
      <div style={{ marginTop: '40px' }}>
        {showSubBar && (
          <SubBar
            onCreateFolder={() => toggleModal('isCreateFolderModalOpen', true)}
            onCreateFile={() => toggleModal('isCreateFileModalOpen', true)}
            onUploadFile={() => toggleModal('isFileUploadModalOpen', true)}
          />
        )}
      </div>
      <Routes>
        <Route path="" element={<HomeComponent />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
        <Route path="file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
};

export default React.memo(DashboardPage);
