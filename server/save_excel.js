import mongoose from "mongoose";
import ExcelJS from "exceljs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateExcel(model, nestedObjectName) {
    try {
        dotenv.config();

        const db_url = process.env.DATABASE_URL;
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected! hurray');

        const data = await model.find({});
        if (data.length === 0) {
            console.log("No data found.");
            return null;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`${nestedObjectName} Data`);

        const headers = new Set(['department', 'academicYear']);
        data.forEach(document => {
            if (nestedObjectName && document._doc[nestedObjectName]) {
                Object.keys(document._doc[nestedObjectName]).forEach(key => {
                    headers.add(key);
                });
            } else {
                Object.keys(document._doc).forEach(key => {
                    headers.add(key);
                });
            }
        });

        const headerArray = Array.from(headers);
        worksheet.addRow(headerArray);

        const numericColumns = new Set();
        const sums = {};

        data.forEach(document => {
            const baseData = {
                department: document._doc.department || "Pending",
                academicYear: document._doc.academicYear || "Pending"
            };

            let rowData = headerArray.map(header => {
                // If header is part of baseData, take it directly
                if (header in baseData) {
                    return baseData[header];
                }

                let value;
                if (nestedObjectName && document._doc[nestedObjectName]) {
                    value = document._doc[nestedObjectName][header];
                } else {
                    value = document._doc[header];
                }

                if (typeof value === 'number') {
                    numericColumns.add(header);
                    sums[header] = (sums[header] || 0) + value;
                }

                return value !== undefined && value !== null ? value : "Pending";
            });

            worksheet.addRow(rowData);
        });

        console.log("Numeric Columns Identified: ", Array.from(numericColumns));  // Debugging line

        // Initialize the sumRow with "Pending" for non-numeric columns
        const sumRow = headerArray.map(header => {
            if (numericColumns.has(header)) {
                return sums[header] || "Pending";
            }
            return ""; // For non-numeric columns, we can set "Pending" or empty
        });

        // Add the sum row with a "SUM" label in the first cell
        sumRow[0] = "SUM"; // Label for the sum row
        worksheet.addRow(sumRow);

        const directory = path.join(process.cwd(), 'files');
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }
        const filePath = path.join(directory, `${nestedObjectName}_data.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        console.log("Excel file generated successfully.");
        return filePath;
    } catch (error) {
        console.error("Error generating Excel file:", error);
        return null;
    }
}



import Criteria1Model from "./models/criteria1.js";
// generateExcel(Criteria1Model, "criteria13");

export default generateExcel;
