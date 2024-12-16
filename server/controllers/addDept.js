import { userModel } from "../models/users.js";

export const addDept = async (req, res) => {
    try {
        // const { formData } = req.body;

        const { departmentName, email, id, password } = req.body;

        const dept = new userModel({ department: departmentName, email, id, password });

        await dept.save();
        res.status(201).json({ message: 'Deparment added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};