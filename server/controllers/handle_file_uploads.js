import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { getStorage } from "../firebase.js";

const storage = getStorage();

const handleFileUploadAndDatabase = async (
  department,
  academicYear,
  fieldName,
  file,
  additionalData,
  Model
) => {
  if (!file) {
    throw new Error("File is missing");
  }

  const fileRef = ref(storage, `uploads/${Date.now()}-${file.originalname}`);
  const metadata = { contentType: file.mimetype };

  try {
    await uploadBytes(fileRef, file.buffer, metadata);
    const filePath = await getDownloadURL(fileRef);

    let existingData = await Model.findOne({ department, academicYear });

    if (existingData && existingData[fieldName]) {
      const existingFilePath = existingData[fieldName];
      const existingFileRef = ref(storage, existingFilePath);
      await deleteObject(existingFileRef);
    }

    if (!existingData) {
      existingData = new Model({
        department,
        academicYear,
        [fieldName]: filePath,
        ...additionalData,
      });
    } else {
      existingData[fieldName] = filePath;
      Object.assign(existingData, additionalData);
    }

    console.log("This is the existingData: ", existingData);

    await existingData.save();

    return filePath;
  } catch (error) {
    console.error(
      "Error handling file upload and database interaction:",
      error
    );
    throw new Error("Internal Server Error");
  }
};
export { handleFileUploadAndDatabase };
