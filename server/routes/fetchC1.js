import express from 'express';
import Criteria1Model from '../models/criteria1.js';

const app = express();

app.get('/fetch', async (req, res) => {
    const { department } = req.query;
  
    try {
      const data = await Criteria1Model.findOne({ department });
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

export {app as fetchC1};
