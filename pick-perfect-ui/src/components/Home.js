import React from 'react';
import { useState } from 'react';

export default function Home() {

  const [file, setFile] = useState();

  function handleFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    e.target.value = null;
  }

  return (
    <div className='pick-perfect-home'>
      <h1 className='pick-perfect-header'>Pick Perfect</h1>
      <div>
        <h3>Add Image:</h3>
        <input type="file" onChange={handleFile}/>
      </div>
      <div>
        {file && <button onClick={() => setFile(null)}>X</button>}
        {file && <img src={file} alt="Uploaded picture of a plan" />}
      </div>
    </div>
  );
}