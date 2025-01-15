import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DownloadButton from "../../components/download/download";
import Form from "./form";
import "../../pages/download/index.css";

const CriterionDownloadTable = () => {
    const criteriaData = {
        criteria1: [1, 2, 3, 4],
        criteria2: [1, 2, 3, 4, 5, 6, 7],
        criteria3: [1, 2, 3, 4, 5, 6, 7],
        criteria4: [1, 2, 3, 4],
        criteria5: [1, 2, 3, 4],
        criteria6: [1, 2, 3, 4, 5],
        criteria7: [1, 2, 3],
    };

    const [selectedCriteria, setSelectedCriteria] = useState("criteria1");
    const [sections, setSections] = useState(criteriaData[selectedCriteria]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const navigate = useNavigate(); // Hook for navigation

    const handleCriteriaChange = (event) => {
        const newCriteria = event.target.value;
        setSelectedCriteria(newCriteria);
        setSections(criteriaData[newCriteria]);
    };

    const handleFormSubmit = (formData) => {
        // Handle the form submission here
        console.log('Form submitted:', formData);
        // Add your download or authentication logic here
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear all local storage
        navigate("/"); // Navigate to the login page (or another page)
    };

    return (
        <div className="container mx-auto px-4">
            {/* Logout Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* Download Form Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                >
                    Add Department
                </button>
            </div>

            {/* Download Form */}
            <Form 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
            >
                <div></div>
            </Form>

            {/* Criterion Selection */}
            <div className="flex justify-center items-center mt-8">
                <div className="w-full max-w-md">
                    <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">
                        Select Criterion:
                    </label>
                    <select
                        id="criteria"
                        value={selectedCriteria}
                        onChange={handleCriteriaChange}
                        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {Object.keys(criteriaData).map((criteria) => (
                            <option key={criteria} value={criteria}>
                                {criteria}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="flex justify-center items-center mt-8">
                <div className="w-full max-w-md">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">No</th>
                                <th className="border p-2">Section</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((section, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">Section {section}</td>
                                    <td className="border p-2 text-center">
                                        <DownloadButton
                                            Criteria={selectedCriteria}
                                            Section={`criteria${selectedCriteria.slice(-1)}${section}`}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CriterionDownloadTable;
