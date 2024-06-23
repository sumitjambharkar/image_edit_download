import React, { useState, useRef } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ticks, setTicks] = useState([]);
  const [isTicking, setIsTicking] = useState(false);
  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleTick = (e) => {
    if (!isTicking) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTicks([...ticks, { x, y }]);
  };

  const handleUndo = () => {
    setTicks(ticks.slice(0, -1));
  };

  const toggleTicking = () => {
    setIsTicking(!isTicking);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
  
      ticks.forEach(tick => {
        context.font = '24px Arial';
        context.fillStyle = 'green';
        const text = '✓';
        const textWidth = context.measureText(text).width;
        const textHeight = 24; // font size
  
        const posX = (tick.x / 100) * canvas.width;
        const posY = (tick.y / 100) * canvas.height;
  
        context.save();
        context.translate(posX, posY);
        context.fillText(text, -textWidth / 2, textHeight / 2);
        context.restore();
      });
      const dataURL = canvas.toDataURL('image/png');
      const baseImage = dataURL.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      console.log('Base64 Data URL without prefix:', baseImage);
    };
    img.src = preview;
  };

  return (
    <div className='main'>
      <div>
        <input onChange={handleFileChange} type="file" />
      </div>
      <div className='section'>
        <div>
          {preview ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                ref={imageRef}
                src={preview} 
                alt="Selected" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                onClick={handleTick} 
              />
              {ticks.map((tick, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${tick.x}%`,
                    top: `${tick.y}%`,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '-10px',
                      color: 'green',
                      fontSize: '24px',
                    }}
                  >
                     <DoneIcon/>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No image selected</p>
          )}
        </div>
        <div>
          <button onClick={toggleTicking} disabled={isTicking} className={isTicking ? 'disabled-button' : 'enabled-button'}>
            <DoneIcon/>
          </button>
          <button onClick={handleUndo} className="undo-button">
          <ReplayIcon/>
          </button>
          <button onClick={handleDownload} className="download-button" disabled={!preview}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
