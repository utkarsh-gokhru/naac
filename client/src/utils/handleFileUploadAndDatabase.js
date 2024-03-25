import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getStorage } from "../firebase.js";

const storage = getStorage();

const handleFileUploadAndDatabase = async (file) => {
console.log("m i being called ? ");
  if (!file) {
    throw new Error("File is missing");
  }

  const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
  const metadata = { contentType: file.type };

  try {
    await uploadBytes(fileRef, file, metadata);
    const filePath = await getDownloadURL(fileRef);
    return filePath; // Return the download URL of the uploaded file
  } catch (error) {
    console.error("Error handling file upload:", error);
    throw new Error("Internal Server Error");
  }
};

export { handleFileUploadAndDatabase };
