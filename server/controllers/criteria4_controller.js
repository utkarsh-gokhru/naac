import Criterion4Model from "../models/Criteria4.js";
import { handleFileUploadAndDatabase } from "../controllers/handle_file_uploads.js";

const submitCriterion4Data = async (req, res) => {
  try {
    
    console.log(req)
    // const { department, academicYear, questions } = req.body;

    // const existingEntry = await Criterion4Model.findOne({ department });
    // if (existingEntry) {
    //   return res
    //     .status(400)
    //     .json({ error: "Department entry already exists." });
    // }

    // console.log("questions and answer: ", JSON.stringify(questions));

    // let documentURLs = [];
    // for (const [key, value] of Object.entries(questions)) {
    //   if (typeof value === "object" && value.documents) {
    //     let tempDocumentURLs = [];
    //     for (const document of value.documents) {
    //       console.log("m i being called ? ");
    //       console.log("this is the document: " + JSON.stringify(document));
    //       const fieldName = `${key}_${document.name}`;

    //       const file = document.file;
    //       console.log("this is the file: " + typeof file);
    //       const additionalData = { department, academicYear };
    //       const fileURL = await handleFileUploadAndDatabase(
    //         department,
    //         academicYear,
    //         fieldName,
    //         file,
    //         additionalData,
    //         Criterion4Model
    //       );
    //       tempDocumentURLs.push(fileURL);
    //     }

    //     documentURLs.push(tempDocumentURLs);
    //   } else {
    //     console.log("the else block is working!");
    //   }
    // }

    // const questionsWithoutDocuments = { ...questions };
    // for (const key in questionsWithoutDocuments) {
    //   delete questionsWithoutDocuments[key].documents;
    // }

    // const newData = new Criterion4Model({
    //   department,
    //   academicYear,
    //   questions: questionsWithoutDocuments,
    // });

    // await newData.save();
    // console.log(documentURLs)

    // res.status(201).json({ message: "Data saved successfully!", documentURLs: documentURLs });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { submitCriterion4Data };
