import Criterion4Model from "../models/Criteria4.js";
import { handleFileUploadAndDatabase } from "../controllers/handle_file_uploads.js";
import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const saveFileLocally = async (file) => {
  try {
    console.log("mit see the file: " + JSON.stringify(file));
    // console.log("hahah this is the dir name: " + __dirname);
    // const uploadDir = path.join(__dirname, "../public/Criteria4");
    // console.log("this is the uploadDIr path: " + uploadDir);
    // // Create the upload directory if it doesn't exist
    // // if (!fs.existsSync(uploadDir)) {
    // //   fs.mkdirSync(uploadDir, { recursive: true });
    // // }
    // const fileName = `${Date.now()}_${file.name}`;
    // const filePath = path.join(uploadDir, fileName);
    // console.log("this is the file name: " + fileName);
    // console.log("this is the data: " + file.data)
    // const fileStream = fs.createWriteStream(filePath);
    // await fileStream.write(file.data);
    // fileStream.end();
    // return fileName;
    const poster = file;
    // console.log(logoFile.name);
    const fileName1 = new Date().getTime().toString() + "-" + poster.name;
    const savePath1 = path.join(
      __dirname,
      "../public/",
      "Criteria4",
      fileName1
    );
    await poster.mv(savePath1);
    req.body.eventPoster = fileName1;
  } catch (error) {
    console.error("Error saving file locally:", error);
    throw error;
  }
};

const submitCriterion4Data = async (req, res) => {
  try {
    console.log("this is the data on server: " + JSON.stringify(req.body));
    const { department, academicYear, questions } = req.body;
    const existingEntry = await Criterion4Model.findOne({ department });
    if (existingEntry) {
      return res
        .status(400)
        .json({ error: "Department entry already exists." });
    }

    const documentURLs = [];
    for (const key in questions) {
      if (questions[key].documents) {
        const documents = Array.isArray(questions[key].documents)
          ? questions[key].documents
          : [questions[key].documents];
        const tempDocumentURLs = [];
        for (const document of documents) {
          const fileURL = await saveFileLocally(document);
          tempDocumentURLs.push(fileURL);
        }
        questions[key].documents = tempDocumentURLs.map((url) => ({
          name: path.basename(url),
          url,
        }));
        documentURLs.push(tempDocumentURLs);
      }
    }

    const newData = new Criterion4Model({
      department,
      academicYear,
      questions,
    });

    await newData.save();
    res.status(201).json({
      message: "Data saved successfully!",
      documentURLs,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const submitCriterion4Data = async (req, res) => {
//   try {
//     console.log(req);
//     const { department, academicYear, questions } = req.body;

//     const existingEntry = await Criterion4Model.findOne({ department });
//     if (existingEntry) {
//       return res
//         .status(400)
//         .json({ error: "Department entry already exists." });
//     }

//     console.log("questions and answer: ", JSON.stringify(questions));

//     let documentURLs = [];
//     for (const [key, value] of Object.entries(questions)) {
//       if (typeof value === "object" && value.documents) {
//         let tempDocumentURLs = [];
//         for (const document of value.documents) {
//           console.log("m i being called ? ");
//           console.log("this is the document: " + JSON.stringify(document));
//           const fieldName = `${key}_${document.name}`;

//           const file = document.file;
//           console.log("this is the file: " + typeof file);
//           const additionalData = { department, academicYear };
//           const fileURL = await handleFileUploadAndDatabase(
//             department,
//             academicYear,
//             fieldName,
//             file,
//             additionalData,
//             Criterion4Model
//           );
//           tempDocumentURLs.push(fileURL);
//         }

//         documentURLs.push(tempDocumentURLs);
//       } else {
//         console.log("the else block is working!");
//       }
//     }

//     const questionsWithoutDocuments = { ...questions };
//     for (const key in questionsWithoutDocuments) {
//       delete questionsWithoutDocuments[key].documents;
//     }

//     const newData = new Criterion4Model({
//       department,
//       academicYear,
//       questions: questionsWithoutDocuments,
//     });

//     await newData.save();
//     console.log(documentURLs);

//     res.status(201).json({
//       message: "Data saved successfully!",
//       documentURLs: documentURLs,
//     });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export { submitCriterion4Data };
