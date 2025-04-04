import { db, storage } from '../../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import * as types from '../actionsTypes/fileFoldersActionTypes';
import { DELETE_FILE } from '../actionsTypes/fileFoldersActionTypes';

// Action Creators
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

// Create Folder
export const createFolder = (data) => async (dispatch) => {
  try {
    const folderRef = await addDoc(collection(db, 'folders'), data);
    const folderData = (await getDoc(folderRef)).data();
    dispatch(addFolder({ data: folderData, docId: folderRef.id }));
    alert('Folder Created Successfully');
  } catch (error) {
    console.error('Error creating folder:', error);
    alert('An error occurred while creating the folder.');
  }
};

// Get Folders
export const getFolders = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const foldersQuery = query(collection(db, 'folders'), where('userId', '==', userId));
    const foldersSnapshot = await getDocs(foldersQuery);
    const foldersData = foldersSnapshot.docs.map((folder) => ({
      data: folder.data(),
      docId: folder.id,
    }));
    console.log('Fetched folders:', foldersData); // Add this line
    dispatch(addFolders(foldersData));
  } catch (error) {
    console.error('Error getting folders:', error);
  }
  dispatch(setLoading(false));
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// Get Files
export const getFiles = (userId) => async (dispatch) => {
  try {
    const filesQuery = query(collection(db, 'files'), where('userId', '==', userId));
    const filesSnapshot = await getDocs(filesQuery);
    const filesData = filesSnapshot.docs.map((file) => ({
      data: file.data(),
      docId: file.id,
    }));
    dispatch(addFiles(filesData));
  } catch (error) {
    console.error('Error getting files:', error);
  }
};

// Create File
export const createFile =
  (data, setSuccess = () => {}) =>
  async (dispatch) => {
    try {
      const fileRef = await addDoc(collection(db, 'files'), data);
      const fileData = (await getDoc(fileRef)).data();
      alert('File created successfully');
      dispatch(addFile({ data: fileData, docId: fileRef.id }));
      setSuccess(true);
    } catch (error) {
      console.error('Error creating file:', error);
      alert('An error occurred while creating the file.');
      setSuccess(false);
    }
  };

export const uploadFile = (formData, setSuccess, setError, setProgress) => async (dispatch) => {
  try {
    const file = formData.get('file');
    const userId = formData.get('userId');
    const folderId = formData.get('folderId');
    const path = formData.get('path');
    const createdAt = formData.get('createdAt');

    if (!file) {
      setError('No file provided');
      return;
    }

    // Prepare file metadata
    const fileData = {
      name: file.name,
      userId: userId,
      parent: folderId,
      path: path,
      createdAt: createdAt,
      updatedAt: new Date().toISOString(),
      extension: file.name.split('.').pop(),
      size: file.size,
      type: file.type,
    };

    // Create storage reference
    const storageRef = ref(storage, `files/${userId}/${folderId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        setError(error.message);
        setSuccess(false);
        setProgress(0);
      },
      async () => {
        try {
          // Get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Add file data to Firestore
          const fileRef = await addDoc(collection(db, 'files'), {
            ...fileData,
            url: downloadURL,
          });

          // Get the created document data
          const createdFile = (await getDoc(fileRef)).data();

          // Dispatch action to update Redux store
          dispatch(
            addFile({
              data: createdFile,
              docId: fileRef.id,
            })
          );

          setSuccess(true);
          setProgress(100);
        } catch (error) {
          console.error('Error handling uploaded file:', error);
          setError(error.message);
          setSuccess(false);
          setProgress(0);
        }
      }
    );
  } catch (error) {
    console.error('Error in upload process:', error);
    setError(error.message);
    setSuccess(false);
    setProgress(0);
  }
};

// Delete File
export const deleteFile = (fileId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'files', fileId));
    dispatch({ type: DELETE_FILE, payload: fileId });
  } catch (error) {
    console.error('Error deleting file:', error);
    alert('An error occurred while deleting the file.');
  }
};

// Delete Uploaded File
export const deleteUploadedFile = (fileId, filePath) => async (dispatch) => {
  try {
    await deleteObject(ref(storage, filePath));
    await deleteDoc(doc(db, 'files', fileId));
    dispatch({ type: types.DELETE_FILE, payload: fileId });
  } catch (error) {
    console.error('Error deleting uploaded file:', error);
    alert('An error occurred while deleting the file.');
  }
};
