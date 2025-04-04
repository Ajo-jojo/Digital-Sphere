import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';
import './App.css';

// Page imports (organized by category)
import { Login, Register, HomePage, DashboardPage } from './pages';
import MainPage from './pages/MainPage/MainPage';

// File Conversion Pages
import FileConversionPage from './pages/FileConversionPage/FileConversionPage';
import ImageConverter from './pages/FileConversionPage/ImageConverter/ImageConverter';
import PDFMerger from './pages/FileConversionPage/PDFMerger/PDFMerger';
import PDFExtractor from './pages/FileConversionPage/PDFExtractor/PDFExtractor';
import ImageToPDFConverter from './pages/FileConversionPage/ImageToPDFConverter/ImageToPDFConverter';
import PassportSizePhotoConverter from './pages/FileConversionPage/PassportSizePhotoConverter/PassportSizePhotoConverter';
import VideoToMP3Converter from './pages/FileConversionPage/VideoToMP3Converter/VideoToMP3Converter';
import PdfToWordConverter from './pages/FileConversionPage/PdfToWordConverter/PdfToWordConverter';

// Multimedia Pages
import Multimedia from './pages/Multimedia/Multimedia';
import ImageEditor from './pages/Multimedia/ImageEditor/ImageEditor';
import MainImageCropper from './pages/Multimedia/ImageCropper/MainImageCropper';
import ImageSizeReducer from './pages/Multimedia/ImageSizeReducer/ImageSizeReducer';
import BlackNWhiteConverter from './pages/Multimedia/BlackNWhiteConverter/BlackNWhiteConverter';
import VideoTrimmer from './pages/Multimedia/VideoTrimmer/VideoTrimmer';
import AudioTrimmer from './pages/Multimedia/AudioTrimmer/AudioTrimmer';
import GradientGenerator from './pages/Multimedia/GradientGenerator/GradientGenerator';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <div className="App">
      <Router
        future={{
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />

          {/* Dashboard */}
          <Route path="/dashboard/*" element={<DashboardPage />} />

          {/* File Conversion Routes */}
          <Route path="/file-conversion" element={<FileConversionPage />} />
          <Route path="ImageConverter" element={<ImageConverter />} />
          <Route path="pdf-merger" element={<PDFMerger />} />
          <Route path="pdf-extractor" element={<PDFExtractor />} />
          <Route path="image-to-pdf" element={<ImageToPDFConverter />} />
          <Route path="PassportSizePhotoConverter" element={<PassportSizePhotoConverter />} />
          <Route path="video-to-mp3" element={<VideoToMP3Converter />} />
          <Route path="pdf-to-word" element={<PdfToWordConverter />} />
          {/* </Route> */}

          {/* <Route path="/multimedia/video-trimmer" element={<VideoTrimmer />} /> */}

          {/* Multimedia Routes */}
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="image-editor" element={<ImageEditor />} />
          <Route path="image-cropper" element={<MainImageCropper />} />
          <Route path="image-resizer" element={<ImageSizeReducer />} />
          <Route path="BlackNWhiteConverter" element={<BlackNWhiteConverter />} />
          <Route path="video-trimmer" element={<VideoTrimmer />} />
          <Route path="audio-trimmer" element={<AudioTrimmer />} />
          <Route path="gradient-generator" element={<GradientGenerator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
