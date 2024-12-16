import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { generateUniqueFileName } from '../utils/updateData.js';

export const uploadFilesToFirebase = async (files, storage) => {
    const filePaths = {};

    for (const fieldName in files) {
        const field = files[fieldName][0];
        const uniqueFilename = generateUniqueFileName(field.originalname);
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);

        const metadata = {
            contentType: field.mimetype,
        };

        try {
            await uploadBytes(fileRef, field.buffer, metadata);
            filePaths[fieldName] = await getDownloadURL(fileRef);
        } catch (error) {
            console.error(`Error uploading or getting download URL for ${fieldName}:`, error);
        }
    }

    return filePaths;
};
