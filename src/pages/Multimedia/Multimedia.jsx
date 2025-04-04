// FileConversionPage.js

import React from 'react';
import Nav1 from '../../components/HomePageComponents/Nav1';
import Cards from './Cards';
import { Outlet } from 'react-router-dom';

const FileConversionPage = () => {
  return (
    <div>
      <Nav1 />
      <Cards />
      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
};

export default FileConversionPage;
