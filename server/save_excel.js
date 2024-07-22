// import mongoose from "mongoose";
// import ExcelJS from "exceljs";
// import dotenv from 'dotenv';

// async function generateExcel(model, nestedObjectName) {
//     try {
//         dotenv.config();

//         // Connect to MongoDB
//         const db_url = process.env.DATABASE_URL;
//         await mongoose.connect(db_url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('DB connected!');

//         // Fetch all documents from the database
//         const data = await model.find({});

//         if (data.length === 0) {
//             console.log("No data found.");
//             return;
//         }

//         // Create a new Excel workbook
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet(`${nestedObjectName} Data`);

//         // Define headers dynamically
//         const headers = new Set(['department', 'academicYear']); // Always include department and academicYear
//         data.forEach(document => {
//             if (nestedObjectName && document._doc[nestedObjectName]) {
//                 Object.keys(document._doc[nestedObjectName]).forEach(key => {
//                     headers.add(key);
//                 });
//             } else {
//                 Object.keys(document._doc).forEach(key => {
//                     headers.add(key);
//                 });
//             }
//         });
//         const headerArray = Array.from(headers);
//         worksheet.addRow(headerArray);

//         // Add data to the Excel file
//         data.forEach(document => {
//             const baseData = {
//                 department: document._doc.department || "Pending",
//                 academicYear: document._doc.academicYear || "Pending"
//             };

//             let rowData;
//             if (nestedObjectName && document._doc[nestedObjectName]) {
//                 rowData = headerArray.map(header => {
//                     if (header in baseData) {
//                         return baseData[header];
//                     }
//                     const value = document._doc[nestedObjectName][header];
//                     return value !== undefined && value !== null ? value : "Pending";
//                 });
//             } else {
//                 rowData = headerArray.map(header => {
//                     const value = document._doc[header];
//                     return value !== undefined && value !== null ? value : "Pending";
//                 });
//             }
//             worksheet.addRow(rowData);
//         });

//         // Save the Excel file
//         await workbook.xlsx.writeFile(`${nestedObjectName}_data.xlsx`);

//         console.log("Excel file generated successfully.");
//     } catch (error) {
//         console.error("Error generating Excel file:", error);
//     } finally {
//         // Close the MongoDB connection
//         await mongoose.disconnect();
//         console.log('DB disconnected!');
//     }
// }

// // Example usage with Criteria1Model
// import Criteria1Model from "./models/criteria1.js";
// generateExcel(Criteria1Model, "criteria11");

// export default generateExcel;
