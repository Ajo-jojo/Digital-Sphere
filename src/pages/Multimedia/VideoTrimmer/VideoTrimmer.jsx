import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Nav1 from '../../../components/HomePageComponents/Nav1';
import Swal from 'sweetalert2';

const VideoTrimmer = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      const fileURL = URL.createObjectURL(file);
      setVideoSrc(fileURL);
      setStartTime(0);
      setEndTime(0);
      Swal.fire({
        icon: 'info',
        title: 'How to Trim?',
        html: `
          <p>1️⃣ Play the video and pause at the desired start point, then click <b>"Set Start Time"</b>.</p>
          <p>2️⃣ Resume playing, pause at the desired end point, then click <b>"Set End Time"</b>.</p>
          <p>3️⃣ Click <b>"Trim & Download"</b> to get the trimmed video.</p>
        `,
        confirmButtonColor: '#007bff',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '❌ Please upload a valid video file.',
        confirmButtonColor: 'crimson',
      });
    }
  }, []);

  // ✅ Restrict file types to only videos
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'video/ogg': ['.ogg'],
      'video/x-matroska': ['.mkv'],
    },
  });

  const startTrim = () => {
    setStartTime(document.getElementById('videoPlayer').currentTime);
    Swal.fire({
      icon: 'success',
      title: 'Start Time Set!',
      text: `Start time set at ${formatTime(document.getElementById('videoPlayer').currentTime)}`,
      confirmButtonColor: '#28a745',
    });
  };

  const endTrim = () => {
    setEndTime(document.getElementById('videoPlayer').currentTime);
    Swal.fire({
      icon: 'success',
      title: 'End Time Set!',
      text: `End time set at ${formatTime(document.getElementById('videoPlayer').currentTime)}`,
      confirmButtonColor: '#dc3545',
    });
  };

  const trimVideo = async () => {
    if (startTime < endTime) {
      const trimmedBlob = await recordTrim(videoSrc, startTime, endTime);
      downloadVideo(trimmedBlob);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Time Selection',
        text: 'Please ensure the start time is before the end time.',
        confirmButtonColor: 'crimson',
      });
    }
  };

  const recordTrim = (videoUrl, startTime, endTime) => {
    return new Promise((resolve) => {
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      videoElement.currentTime = startTime;

      videoElement.onloadedmetadata = () => {
        const stream = videoElement.captureStream();
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const trimmedBlob = new Blob(chunks, { type: 'video/webm' });
          resolve(trimmedBlob);
        };

        mediaRecorder.start();
        videoElement.play();

        setTimeout(
          () => {
            mediaRecorder.stop();
            videoElement.pause();
          },
          (endTime - startTime) * 1000
        );
      };
    });
  };

  const downloadVideo = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'trimmed_video.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      margin: 0,
      padding: 0,
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    },
    videoPlayer: {
      width: '100%',
      maxWidth: '800px',
      height: 'auto',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
    },
    dropzoneStyle: {
      border: '2px dashed #007bff',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      marginBottom: '2rem',
    },
    videoContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '-2vh',
    },
    timeDisplay: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '18px',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.body}>
      <Nav1 />
      <nav
        style={{
          padding: '1rem',
          backgroundColor: 'crimson',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          borderRadius: '0.5rem',
        }}
      >
        <h1>Video Trimmer</h1>
      </nav>

      <div {...getRootProps()} style={styles.dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop a video file here, or click to select one</p>
      </div>

      {videoSrc && (
        <>
          <div style={styles.videoContainer}>
            <video id="videoPlayer" controls src={videoSrc} style={styles.videoPlayer}></video>
          </div>
          <p style={styles.timeDisplay}>
            Start Time: <strong>{formatTime(startTime)}</strong> | End Time:{' '}
            <strong>{formatTime(endTime)}</strong>
          </p>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={startTrim}>
              Set Start Time
            </button>
            <button style={styles.button} onClick={endTrim}>
              Set End Time
            </button>
            <button style={styles.button} onClick={trimVideo}>
              Trim & Download
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoTrimmer;
