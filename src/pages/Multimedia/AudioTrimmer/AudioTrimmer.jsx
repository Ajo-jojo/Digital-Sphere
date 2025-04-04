import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Nav1 from '../../../components/HomePageComponents/Nav1';
import Swal from 'sweetalert2';

const AudioTrimmer = () => {
  const [audioSrc, setAudioSrc] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAudioSrc(fileURL);
      setStartTime(0);
      setEndTime(0);

      Swal.fire({
        icon: 'info',
        title: 'How to Trim?',
        html: `
          <p>1️⃣ Play the audio and pause at the desired start point, then click <b>"Set Start Time"</b>.</p>
          <p>2️⃣ Resume playing, pause at the desired end point, then click <b>"Set End Time"</b>.</p>
          <p>3️⃣ Click <b>"Trim & Download"</b> to get the trimmed audio.</p>
        `,
        confirmButtonColor: '#007bff',
      });
    }
  }, []);

  // Restrict file types to only audio formats
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/ogg': ['.ogg'],
      'audio/flac': ['.flac'],
      'audio/aac': ['.aac'],
    },
    onDropRejected: () => {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File!',
        text: 'Please upload a valid audio file (MP3, WAV, OGG, FLAC, AAC).',
        confirmButtonColor: 'crimson',
      });
    },
  });

  const startTrim = () => {
    const audioPlayer = document.getElementById('audioPlayer');
    setStartTime(audioPlayer.currentTime);
    Swal.fire({
      icon: 'success',
      title: 'Start Time Set!',
      text: `Start time set at ${formatTime(audioPlayer.currentTime)}`,
      confirmButtonColor: '#28a745',
    });
  };

  const endTrim = () => {
    const audioPlayer = document.getElementById('audioPlayer');
    setEndTime(audioPlayer.currentTime);
    Swal.fire({
      icon: 'success',
      title: 'End Time Set!',
      text: `End time set at ${formatTime(audioPlayer.currentTime)}`,
      confirmButtonColor: '#dc3545',
    });
  };

  const trimAudio = async () => {
    if (startTime < endTime) {
      const trimmedBlob = await recordTrim(audioSrc, startTime, endTime);
      downloadAudio(trimmedBlob);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Time Selection',
        text: 'Please ensure the start time is before the end time.',
        confirmButtonColor: 'crimson',
      });
    }
  };

  const recordTrim = (audioUrl, startTime, endTime) => {
    return new Promise((resolve) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioElement = new Audio(audioUrl);

      audioElement.onloadedmetadata = () => {
        const source = audioContext.createMediaElementSource(audioElement);
        const destination = audioContext.createMediaStreamDestination();
        const mediaRecorder = new MediaRecorder(destination.stream);
        const chunks = [];

        source.connect(destination);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const trimmedBlob = new Blob(chunks, { type: 'audio/mp3' });
          resolve(trimmedBlob);
        };

        audioElement.currentTime = startTime;
        audioElement.play();

        mediaRecorder.start();

        setTimeout(
          () => {
            mediaRecorder.stop();
            audioElement.pause();
            audioContext.close();
          },
          (endTime - startTime) * 1000
        );
      };
    });
  };

  const downloadAudio = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'trimmed_audio.mp3';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return [hrs, mins, secs].map((t) => t.toString().padStart(2, '0')).join(':');
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
    dropzoneStyle: {
      border: '2px dashed #007bff',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      marginBottom: '2rem',
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
    audioContainer: {
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
        <h1>Audio Trimmer</h1>
      </nav>

      <div {...getRootProps()} style={styles.dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{ fontSize: '2vh' }}>Drag & drop an audio file here, or click to select one</p>
      </div>

      {audioSrc && (
        <>
          <div style={styles.audioContainer}>
            <audio
              id="audioPlayer"
              controls
              src={audioSrc}
              style={{ width: '100%', maxWidth: '500px' }}
            ></audio>
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
            <button style={styles.button} onClick={trimAudio}>
              Trim & Download
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioTrimmer;
