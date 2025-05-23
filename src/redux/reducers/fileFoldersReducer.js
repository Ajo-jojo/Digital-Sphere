// import * as types from '../actionsTypes/fileFoldersActionTypes';
// import { DELETE_FILE } from '../actionsTypes/fileFoldersActionTypes';

// const initialState = {
//   isLoading: true,
//   currentFolder: 'root',
//   userFolders: [],
//   userFiles: [],
//   adminFolders: [],
//   adminFiles: [],
// };

// const fileFoldersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.CREATE_FOLDER:
//       return {
//         ...state,
//         userFolders: [...state.userFolders, action.payload],
//       };

//     case types.ADD_FOLDERS:
//       return {
//         ...state,
//         userFolders: action.payload, // Make sure this matches exactly
//       };

//     case types.SET_LOADING:
//       return {
//         ...state,
//         isLoading: action.payload,
//       };

//     case types.CHANGE_FOLDER:
//       return {
//         ...state,
//         currentFolder: action.payload,
//       };

//     case types.ADD_FILES:
//       return {
//         ...state,
//         userFiles: action.payload,
//       };

//     case types.CREATE_FILE:
//       return {
//         ...state,
//         userFiles: [...state.userFiles, action.payload],
//       };

//     case DELETE_FILE:
//       return {
//         ...state,
//         userFiles: state.userFiles.filter((file) => file.docId !== action.payload),
//       };

//     case types.DELETE_UPLOADED_FILE:
//       return {
//         ...state,
//         userFiles: state.userFiles.filter((file) => file.docId !== action.payload),
//       };

//     case types.SET_FILE_DATA:
//       const { fileId, data } = action.payload;
//       const allFiles = state.userFiles;
//       const currentFile = allFiles.find((file) => file.docId === fileId);
//       currentFile.data.data = data;
//       return {
//         ...state,
//         userFiles: state.userFiles.map((file) => (file.docId === fileId ? currentFile : file)),
//       };

//     default:
//       return state;
//   }
// };

// export default fileFoldersReducer;

import * as types from '../actionsTypes/fileFoldersActionTypes';
import { DELETE_FILE } from '../actionsTypes/fileFoldersActionTypes';

const initialState = {
  isLoading: true,
  currentFolder: 'root',
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const fileFoldersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };

    case types.ADD_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };

    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };

    case types.ADD_FILES:
      return {
        ...state,
        userFiles: action.payload,
      };

    case types.CREATE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };

    case DELETE_FILE:
    case types.DELETE_UPLOADED_FILE:
      return {
        ...state,
        userFiles: state.userFiles.filter((file) => file.docId !== action.payload),
      };

    case types.DELETE_FOLDER: // 🆕 Folder delete case
      return {
        ...state,
        userFolders: state.userFolders.filter((folder) => folder.docId !== action.payload),
      };

    case types.SET_FILE_DATA:
      const { fileId, data } = action.payload;
      const allFiles = state.userFiles;
      const currentFile = allFiles.find((file) => file.docId === fileId);
      currentFile.data.data = data;
      return {
        ...state,
        userFiles: state.userFiles.map((file) => (file.docId === fileId ? currentFile : file)),
      };

    default:
      return state;
  }
};

export default fileFoldersReducer;
