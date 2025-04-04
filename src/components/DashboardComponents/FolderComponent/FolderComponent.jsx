import React, { useEffect } from 'react';
import ShowItems from '../ShowItems/ShowItems';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const FolderComponent = () => {
  const { folderId = 'root' } = useParams(); // Default to root

  // Enhanced selector with proper data extraction
  const { childFolders, childFiles } = useSelector((state) => {
    // Debugging logs
    console.log('Full Redux State:', state.filefolders);
    console.log('All Folders:', state.filefolders.userFolders);
    console.log('All Files:', state.filefolders.userFiles);

    return {
      childFolders: Array.isArray(state.filefolders.userFolders)
        ? state.filefolders.userFolders.filter((folder) => folder?.data?.parent === folderId)
        : [],
      childFiles: Array.isArray(state.filefolders.userFiles)
        ? state.filefolders.userFiles.filter((file) => file?.data?.parent === folderId)
        : [],
    };
  }, shallowEqual);

  // Debug render information
  console.log('Render Data:', {
    folderId,
    childFolders: childFolders?.length,
    childFiles: childFiles?.length,
  });

  // Safely check for content
  const hasFolders = childFolders && childFolders.length > 0;
  const hasFiles = childFiles && childFiles.length > 0;
  const hasContent = hasFolders || hasFiles;

  if (!hasContent) {
    return <p className="text-center my-5">Empty Folder</p>;
  }

  return (
    <div>
      {hasFolders && <ShowItems title="Folders" type="folder" items={childFolders} />}

      {hasFiles && (
        <>
          <ShowItems title="Files" type="file" items={childFiles.filter((f) => !f.data.url)} />
          <ShowItems
            title="Uploaded Files"
            type="file"
            items={childFiles.filter((f) => f.data.url)}
          />
        </>
      )}
    </div>
  );
};

export default FolderComponent;
