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
  updateDoc,
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

// export const uploadFile = (formData, setSuccess, setError, setProgress) => async (dispatch) => {
//   try {
//     const file = formData.get('file');
//     const userId = formData.get('userId');
//     const folderId = formData.get('folderId');
//     const path = formData.get('path');
//     const createdAt = formData.get('createdAt');

//     if (!file) {
//       setError('No file provided');
//       return;
//     }

//     // Prepare file metadata
//     const fileData = {
//       name: file.name,
//       userId: userId,
//       parent: folderId,
//       path: path,
//       createdAt: createdAt,
//       updatedAt: new Date().toISOString(),
//       extension: file.name.split('.').pop(),
//       size: file.size,
//       type: file.type,
//     };

//     // Create storage reference
//     const storageRef = ref(storage, `files/${userId}/${folderId}/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgress(progress);
//       },
//       (error) => {
//         console.error('Upload error:', error);
//         setError(error.message);
//         setSuccess(false);
//         setProgress(0);
//       },
//       async () => {
//         try {
//           // Get download URL
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//           // Add file data to Firestore
//           const fileRef = await addDoc(collection(db, 'files'), {
//             ...fileData,
//             url: downloadURL,
//           });

//           // Get the created document data
//           const createdFile = (await getDoc(fileRef)).data();

//           // Dispatch action to update Redux store
//           dispatch(
//             addFile({
//               data: createdFile,
//               docId: fileRef.id,
//             })
//           );

//           setSuccess(true);
//           setProgress(100);
//         } catch (error) {
//           console.error('Error handling uploaded file:', error);
//           setError(error.message);
//           setSuccess(false);
//           setProgress(0);
//         }
//       }
//     );
//   } catch (error) {
//     console.error('Error in upload process:', error);
//     setError(error.message);
//     setSuccess(false);
//     setProgress(0);
//   }
// };
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

    const storagePath = `files/${userId}/${folderId}/${file.name}`; // ✅

    // Correct the fileData to use storagePath instead of path
    const fileData = {
      name: file.name,
      userId,
      parent: folderId,
      path: storagePath, // Use storagePath here
      storagePath, // ✅
      createdAt,
      updatedAt: new Date().toISOString(),
      extension: file.name.split('.').pop(),
      size: file.size,
      type: file.type,
    };

    const storageRef = ref(storage, storagePath); // ✅

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
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileRef = await addDoc(collection(db, 'files'), {
            ...fileData,
            url: downloadURL,
          });

          const createdFile = (await getDoc(fileRef)).data();

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
// export const deleteUploadedFile = (fileId, filePath) => async (dispatch) => {
//   try {
//     await deleteObject(ref(storage, filePath));
//     await deleteDoc(doc(db, 'files', fileId));
//     dispatch({ type: types.DELETE_FILE, payload: fileId });
//   } catch (error) {
//     console.error('Error deleting uploaded file:', error);
//     alert('An error occurred while deleting the file.');
//   }
// };

export const deleteUploadedFile = (fileId, filePath) => async (dispatch) => {
  try {
    // Delete the file from Firebase Storage
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log('✅ File deleted from Firebase Storage');

    // Delete the metadata from Firestore 'files' collection
    await deleteDoc(doc(db, 'files', fileId));
    console.log('✅ File metadata deleted from Firestore');

    // Dispatch Redux action to update state
    dispatch({ type: types.DELETE_FILE, payload: fileId });
  } catch (error) {
    console.error('❌ Error deleting uploaded file:', error);
    alert('An error occurred while deleting the file.');
  }
};

export const updateFileData = (fileId, data) => async (dispatch) => {
  try {
    const fileRef = doc(db, 'files', fileId);
    await updateDoc(fileRef, { data }); // only update file content
    dispatch(setFileData({ fileId, data }));
    alert('File saved successfully');
  } catch (error) {
    console.error('Error saving file data:', error);
    alert('Error saving file');
  }
};

// Delete Folder and its contents
export const deleteFolderAndSubfolders = (folderId, userId) => async (dispatch) => {
  try {
    // Query and delete all files within the folder from Firestore and Firebase Storage
    const filesQuery = query(collection(db, 'files'), where('parent', '==', folderId));
    const filesSnapshot = await getDocs(filesQuery);
    const filesToDelete = filesSnapshot.docs;

    // Delete each file
    for (let fileDoc of filesToDelete) {
      const fileData = fileDoc.data();
      const filePath = fileData.path; // Assuming 'path' contains the Firebase Storage path of the file

      // Delete the file from Firebase Storage
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      console.log(`✅ File deleted from Firebase Storage: ${filePath}`);

      // Delete the file document from Firestore
      await deleteDoc(doc(db, 'files', fileDoc.id));
      console.log(`✅ File metadata deleted from Firestore: ${fileDoc.id}`);
    }

    // Query and delete all subfolders within the folder
    const subfoldersQuery = query(collection(db, 'folders'), where('parent', '==', folderId));
    const subfoldersSnapshot = await getDocs(subfoldersQuery);
    const subfoldersData = subfoldersSnapshot.docs.map((doc) => doc.id);

    // Delete all subfolders
    for (let subfolderId of subfoldersData) {
      await deleteDoc(doc(db, 'folders', subfolderId));
      console.log(`✅ Subfolder deleted: ${subfolderId}`);
    }

    // Delete the folder itself
    await deleteDoc(doc(db, 'folders', folderId));
    console.log(`✅ Folder deleted: ${folderId}`);

    // Dispatch action to update state (optional)
    dispatch({ type: types.DELETE_FOLDER, payload: folderId });

    alert('Folder and its contents (files, subfolders) deleted successfully!');
  } catch (error) {
    console.error('Error deleting folder and subfolders:', error);
    alert('An error occurred while deleting the folder and its contents.');
  }
};
