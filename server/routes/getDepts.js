import express from 'express';
import { userModel } from '../models/users.js';

const app = express();

app.get('/depts', async (req, res) => {
    try {
        const departments = await userModel.distinct('department');
        // console.log(departments);
        res.status(200).json({ departments });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

export { app as getDepts };
