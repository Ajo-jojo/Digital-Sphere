// import React from 'react';
// import ShowItems from '../ShowItems/ShowItems';
// import { shallowEqual, useSelector } from 'react-redux';

// const HomeComponent = () => {
//   const { isLoading, userFolders, userFiles } = useSelector(
//     (state) => ({
//       isLoading: state.filefolders.isLoading,
//       userFolders: state.filefolders.userFolders.filter((folder) => folder.data.parent === 'root'),
//       userFiles: state.filefolders.userFiles.filter((file) => file.data.parent === 'root'),
//     }),
//     shallowEqual
//   );

//   return (
//     <div className="col-md-12 w-100">
//       {isLoading ? (
//         <h1 className="display-1 my-5 text-center">Loading ...</h1>
//       ) : (
//         <>
//           <ShowItems title={'Created Folders'} type={'folder'} items={userFolders} />
//           <ShowItems title={'Created Files'} type={'file'} items={userFiles} />
//           <ShowItems
//             title={'Uploaded Files'}
//             type={'file'}
//             items={userFiles.filter((file) => file.data.data)}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default HomeComponent;

import React, { useEffect, useState } from 'react';
import ShowItems from '../ShowItems/ShowItems';
import { shallowEqual, useSelector } from 'react-redux';
import { getStorage, ref, listAll } from 'firebase/storage';

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders.filter((folder) => folder.data.parent === 'root'),
      userFiles: state.filefolders.userFiles.filter((file) => file.data.parent === 'root'),
    }),
    shallowEqual
  );

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [createdFiles, setCreatedFiles] = useState([]);

  useEffect(() => {
    const fetchStorageFiles = async () => {
      try {
        const storage = getStorage();
        const allFiles = [];
        const listRef = ref(storage, `files/${userFiles[0]?.data.userId}/root`);

        const res = await listAll(listRef);
        res.items.forEach((itemRef) => {
          allFiles.push(itemRef.name);
        });

        const uploaded = [];
        const created = [];

        userFiles.forEach((file) => {
          const fileName = file.data.name;
          if (allFiles.includes(fileName)) {
            uploaded.push(file);
          } else {
            created.push(file);
          }
        });

        setUploadedFiles(uploaded);
        setCreatedFiles(created);
      } catch (error) {
        console.error('Error fetching storage files:', error);
      }
    };

    if (userFiles.length > 0) {
      fetchStorageFiles();
    }
  }, [userFiles]);

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading ...</h1>
      ) : (
        <>
          <ShowItems title="Created Folders" type="folder" items={userFolders} />
          <ShowItems title="Created Files" type="file" items={createdFiles} />
          <ShowItems title="Uploaded Files" type="file" items={uploadedFiles} />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
