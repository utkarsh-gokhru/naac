// import mongoose from "mongoose";
// import ExcelJS from "exceljs";
// import Criteria1Model from "./models/criteria1.js";
// import dotenv from 'dotenv';

// async function generateExcel() {
//   try {
//     dotenv.config();

//     // Connect to MongoDB
//     const db_url = process.env.DATABASE_URL;
//     await mongoose.connect(db_url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('DB connected!');

//     // Fetch all documents from the database
//     const data = await Criteria1Model.find({});
//     console.log(data[0]);
//     const exc_data = data[0]; // Access the entire document

//     // Create a new Excel workbook
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Criteria1 Data");

//     // Define headers for the Excel file
//     const headers = Object.keys(exc_data.criteria11); // Use keys from criteria11 object
//     headers.unshift('department', 'academicYear'); // Add department and academicYear to headers
//     worksheet.addRow(headers);

//     // Add data to the Excel file
//     const rowData = [];
//     rowData.push(exc_data.department, exc_data.academicYear); // Add department and academicYear to rowData
//     headers.shift();
//     headers.shift();
//     headers.forEach((header) => {
//       // Check if the field exists in the document
//       if (exc_data.criteria11[header] !== undefined && exc_data.criteria11[header] !== null) {
//         rowData.push(exc_data.criteria11[header]);
//       } else {
//         // If the field is null or not present, save as "pending"
//         rowData.push("pending");
//       }
//     });
//     worksheet.addRow(rowData);

//     // Save the Excel file
//     await workbook.xlsx.writeFile("criteria1_data.xlsx");

//     console.log("Excel file generated successfully.");
//   } catch (error) {
//     console.error("Error generating Excel file:", error);
//   } finally {
//     // Close the MongoDB connection
//     await mongoose.disconnect();
//     console.log('DB disconnected!');
//   }
// }

// // Call the function to generate the Excel file
// generateExcel();
