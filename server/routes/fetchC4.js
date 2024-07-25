import express from 'express';
import Criteria4Model from '../models/criteria4.js';

const app = express();

app.get('/fetchC4', async (req, res) => {
  try {
    const { department, academicYear } = req.query;
    console.log(department, academicYear);

    if (!department || !academicYear) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const data = await Criteria4Model.findOne({ department, academicYear });

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(200).json({ message: 'No data found', data: {} });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export { app as fetchC4 };
