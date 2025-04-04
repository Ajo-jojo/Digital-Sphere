import React, { useState } from 'react';
import './color.css';
import Nav1 from '../../../components/HomePageComponents/Nav1';

const GradientGenerator = () => {
  const [direction, setDirection] = useState('to left top');
  const [color1, setColor1] = useState('#5665E9');
  const [color2, setColor2] = useState('#A271F8');
  const [copied, setCopied] = useState(false);

  const getRandomColor = () => {
    // Generating a random color in hexadecimal format. Example: #5665E9
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${randomHex}`;
  };

  const generateGradient = (isRandom) => {
    if (isRandom) {
      setColor1(getRandomColor());
      setColor2(getRandomColor());
    }
  };

  const copyCode = () => {
    const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`;
    navigator.clipboard.writeText(`background: ${gradient};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const columnStyle = {
    width: 'calc(50% - 12px)',
  };

  return (
    <div>
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
        <h1>Gradient Generator</h1>
      </nav>
      <div className="mainbody">
        <div className="wrapper" style={styles.wrapper}>
          <div
            className="gradient-box"
            style={{
              ...styles.gradientBox,
              background: `linear-gradient(${direction}, ${color1}, ${color2})`,
            }}
          ></div>
          <div className="row options">
            <div className="column direction" style={columnStyle}>
              <p>Direction</p>
              <div className="select-box">
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  style={styles.select}
                >
                  <option value="to top">Top</option>
                  <option value="to right top">Right top</option>
                  <option value="to right">Right</option>
                  <option value="to right bottom">Right bottom</option>
                  <option value="to bottom">Bottom</option>
                  <option value="to left bottom">Left bottom</option>
                  <option value="to left">Left</option>
                  <option value="to left top">Left top</option>
                </select>
              </div>
            </div>
            <div className="column palette" style={columnStyle}>
              <p>Colors</p>
              <div className="colors">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  style={styles.colorInput}
                />
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  style={styles.colorInput}
                />
              </div>
            </div>
          </div>
          <textarea
            className="row1"
            disabled
            value={`background: linear-gradient(${direction}, ${color1}, ${color2});`}
            style={styles.textarea}
          ></textarea>
          <div className="row buttons">
            <button
              className="refresh"
              onClick={() => generateGradient(true)}
              style={{ ...styles.button, background: '#6C757D' }}
            >
              Refresh Colors
            </button>
            <button
              className="copy"
              onClick={copyCode}
              style={{ ...styles.button, background: '#8A6CFF', marginTop: '20px' }}
            >
              {copied ? 'Code Copied' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '450px',
    padding: '25px',
    background: '#fff',
    borderRadius: '7px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.06)',
  },
  gradientBox: {
    height: '220px',
    width: '100%',
    borderRadius: '7px',
  },
  //   select: {
  //     width: '100%',
  //     border: 'none',
  //     outline: 'none',
  //     fontSize: '1.12rem',
  //     background: 'none',
  //     borderRadius: '5px',
  //     padding: '10px 15px',
  //     border: '1px solid #aaa',
  //   },
  colorInput: {
    height: '41px',
    width: 'calc(50% - 10px)',
  },
  textarea: {
    width: '100%',
    color: '#333',
    fontSize: '1.05rem',
    resize: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '15px 0',
    border: 'none',
    outline: 'none',
    color: '#fff',
    margin: '0 0 -15px',
    fontSize: '1.09rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default GradientGenerator;
