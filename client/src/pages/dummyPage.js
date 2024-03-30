// Frontend: Form.js

import React, { useState } from "react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import util from "util";
const DummyForm = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    console.log("this is the image file: " + imageFile);
    console.log("thi sis hope: ", util.inspect(imageFile));
    for (const prop in imageFile) {
      console.log(`${prop}: `, imageFile[prop]);
    }
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {}, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);

          setTimeout(() => {}, 4000);
        });
      }
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log("this is the name: " + name);
      console.log("this is the file: " + file);
      formData.append("name", name);
      formData.append("file", file);
      console.log("hhhhhhhhhhhhheeeeeeeeeeeeee");
      console.log(file, "is it the file: ");
      console.log("udmmy form: " + JSON.stringify(formData));
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>File:</label>
          <input
            type="file"
            name="uploadimage"
            accept="image/*"
            onChange={uploadImage}
            className="w-0 h-0"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DummyForm;
