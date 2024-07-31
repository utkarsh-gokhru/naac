import express from 'express';
import bodyParser from 'body-parser';
import Criteria1Model from '../models/criteria1.js';
import Criteria2Model from '../models/criteria2.js';
import Criteria3Model from '../models/criteria3.js';
import Criteria4Model from '../models/criteria4.js';
import Criteria5Model from '../models/criteria5.js';
import Criteria6Model from '../models/criteria6.js';
import Criteria7Model from '../models/criteria7.js';

const app = express();
app.use(bodyParser.json());

import generateExcel from "../save_excel.js"; // Adjust the path as needed
import ExtendedProfileModel from '../models/extended_profile.js';

// Mapping criteria numbers to their corresponding models
const criteriaModels = {
    'criteria1': Criteria1Model,
    'criteria2': Criteria2Model,
    'criteria3': Criteria3Model,
    'criteria4': Criteria4Model,
    'criteria5': Criteria5Model,
    'criteria6': Criteria6Model,
    'criteria7': Criteria7Model,
    'ep' : ExtendedProfileModel
};

export const downloadCriteriaSection = async (req, res) => {
    console.log("Am I being called?");
    const { criteria, section } = req.params;
     console.log(criteria,section+" check krra hu bhai");
    const model = criteriaModels[criteria];
    if (!model) {
        return res.status(400).json({ error: "Invalid criteria specified." });
    }

    try {
        const filePath = await generateExcel(model, section);
        if (!filePath) {
            return res.status(404).json({ error: "No data found." });
        }

        res.download(filePath, `${section}_data.xlsx`, (err) => {
            if (err) {
                console.error("Error downloading the file:", err);
                res.status(500).json({ error: "Error downloading the file." });
            }
        });
    } catch (error) {
        console.error("Error generating Excel file:", error);
        res.status(500).json({ error: "Error generating Excel file." });
    }
};