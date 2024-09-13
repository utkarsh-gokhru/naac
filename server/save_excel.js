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

        data.forEach(document => {
            const baseData = {
                department: document._doc.department || "Pending",
                academicYear: document._doc.academicYear || "Pending"
            };

            let rowData;
            if (nestedObjectName && document._doc[nestedObjectName]) {
                rowData = headerArray.map(header => {
                    if (header in baseData) {
                        return baseData[header];
                    }
                    const value = document._doc[nestedObjectName][header];
                    return value !== undefined && value !== null ? value : "Pending";
                });
            } else {
                rowData = headerArray.map(header => {
                    const value = document._doc[header];
                    return value !== undefined && value !== null ? value : "Pending";
                });
            }
            worksheet.addRow(rowData);
        });

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
