import React from 'react';
import { useState } from 'react';

export default function Home() {

  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className='pick-perfect-home'>
      <div className='pick-perfect-header'>
        <h1 className='pick-perfect-title'>Pick Perfect</h1>
        <div>
          <h2>Upload an image of a plant to begin</h2>
        </div>
      </div>
      <div className="input-container">
        <input 
          type="file" 
          id="fileInput" 
          onChange={handleFile} 
          style={{ display: "none" }}
        />
        <label htmlFor="fileInput" className="file-upload-button">
          Choose File
        </label>
      </div>
      {preview &&
        <div className="bottom-container">
          <text>Huge</text>
          <img className="uploaded-picture" src={preview} alt="Uploaded Preview"/>
        </div>
      }
    </div>
  );
}