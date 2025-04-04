import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import Nav1 from '../../../components/HomePageComponents/Nav1';

let ffmpeg = null;
let fetchFile = null;

const styles = {
  dropzoneStyle: {
    border: '2px dashed #007bff',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  videoContainer: { display: 'flex', justifyContent: 'center' },
  video: { width: '100%', maxWidth: '800px', height: 'auto', marginBottom: '10px' },
  buttonContainer: { display: 'flex', justifyContent: 'center', marginTop: '10px' },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: 'large',
  },
  buttonHover: { backgroundColor: '#0056b3' },
};

const VideoToMP3Converter = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [outputURL, setOutputURL] = useState('');
  const [quality, setQuality] = useState('192k'); // Default quality: Medium
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg) {
        const ffmpegModule = await import('@ffmpeg/ffmpeg');
        ffmpeg = ffmpegModule.default.createFFmpeg({ log: true });
        fetchFile = ffmpegModule.default.fetchFile;
        await ffmpeg.load();
        setIsFFmpegLoaded(true);
      }
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles[0].type.startsWith('video/')) {
        Swal.fire({ icon: 'error', title: 'Invalid File', text: 'Upload a valid video file.' });
        return;
      }
      setFile(acceptedFiles[0]);
    },
  });

  const handleConvert = async () => {
    if (!isFFmpegLoaded) {
      Swal.fire({ icon: 'error', title: 'FFmpeg Not Ready', text: 'Please wait and try again.' });
      return;
    }
    if (!file) {
      Swal.fire({ icon: 'error', title: 'No File Selected', text: 'Upload a video first.' });
      return;
    }

    setProcessing(true);

    try {
      // Load file into FFmpeg
      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));

      // Run FFmpeg conversion command
      await ffmpeg.run('-i', 'input.mp4', '-vn', '-b:a', quality, '-f', 'mp3', 'output.mp3');

      // Retrieve output file
      const data = ffmpeg.FS('readFile', 'output.mp3');
      const blob = new Blob([data.buffer], { type: 'audio/mp3' });

      setOutputURL(URL.createObjectURL(blob));
    } catch (error) {
      console.error('FFmpeg Conversion Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Conversion Failed',
        text: 'An error occurred while converting.',
      });
    }

    setProcessing(false);
  };

  return (
    <div>
      <Nav1 />
      <nav
        style={{ padding: '1rem', backgroundColor: 'crimson', color: 'white', textAlign: 'center' }}
      >
        <h1>Video To MP3 Converter</h1>
      </nav>

      <div {...getRootProps()} style={styles.dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop a video file here, or click to select one</p>
      </div>

      {file && (
        <div style={styles.videoContainer}>
          <video controls style={styles.video} src={URL.createObjectURL(file)} />
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <label htmlFor="quality">Select Quality: </label>
        <select
          id="quality"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}
        >
          <option value="128k">Low (128kbps)</option>
          <option value="192k">Medium (192kbps) - Default</option>
          <option value="320k">High (320kbps)</option>
        </select>
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={handleConvert}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          disabled={processing || !isFFmpegLoaded}
        >
          {processing ? 'Processing...' : 'Convert to MP3'}
        </button>
      </div>

      {outputURL && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <a href={outputURL} download="output.mp3" style={{ fontSize: '18px', color: '#007bff' }}>
            🎵 Download MP3
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoToMP3Converter;
