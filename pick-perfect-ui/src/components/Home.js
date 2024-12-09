import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [imageFile, setImageFile] = useState(null);
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

  async function handleUpload(){
    if(!imageFile) return;
    setIsLoading(true);
    setResponse("");
    console.log("upload started");

    const reader = new FileReader();
    reader.onloadend = async () => { // once image is fully uploaded
      const images = reader.result.split(',')[1]; // extracts actual image
      const imgType = imageFile.type; 
      console.log(images);
      console.log(imgType);
      try {
        const res = await axios.post('https://pick-perfect-api-image-736056241127.us-central1.run.app/api/generate', {
          base64image: images,
          img_type: imgType,
        });
        const responseData = JSON.parse(res.data.response);
        let ripe = '';
        console.log(responseData);
        console.log(responseData.ripe);
        ripe = "Plant: " + responseData.plant + "<br>Ripe: " + responseData.ripe + "<br>" + "Confidence: " + (responseData.confidence * 100) + "%" + "<br><br>" + responseData.msg;
        setResponse(ripe);
      } catch (e) {
        console.error('Error with image', e);
        setResponse({error: 'error with image'});
      } finally {
        setIsLoading(false);
        console.log("upload finished");
      }
    };

    reader.readAsDataURL(imageFile);
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
          {imageFile  === null
            ? "Choose File"
            : "Change File"
          }
        </label>
      </div>
      {preview &&
        <div className="bottom-container">
          <img className="uploaded-picture" src={preview} alt="Uploaded Preview"/>
        </div>
      }
      {imageFile && (
          <button onClick = {handleUpload} className = "file-upload-button">
            Ripe or Not?
          </button>          
      )}
      {isLoading && <p>Loading...</p>}
      {response && (
        <div className = "response-container">
          {response.error ? (
            <p> Error: {response.error} </p>
          ) : (
            <p dangerouslySetInnerHTML={{__html: response}}></p>
          )}
        </div>
      )}
      <br></br><br></br>
    </div>
  );
}