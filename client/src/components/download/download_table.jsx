import { useState } from "react";
import DownloadButton from "../../components/download/download"

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

    const handleCriteriaChange = (event) => {
        const newCriteria = event.target.value;
        setSelectedCriteria(newCriteria);
        setSections(criteriaData[newCriteria]);
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-4">
                <div className="w-1/2 max-w-md">
                    <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">Select Criterion:</label>
                    <select
                        id="criteria"
                        value={selectedCriteria}
                        onChange={handleCriteriaChange}
                        className="mt-1 block w-[50%] p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {Object.keys(criteriaData).map((criteria) => (
                            <option key={criteria} value={criteria}>
                                {criteria}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <table className="w-1/2 max-w-md text-xs border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-1 w-[10%]">No</th>
                            <th className="border p-1 w-[60%]">Section</th>
                            <th className="border p-1 w-[30%]">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-1 text-center">{index + 1}</td>
                                <td className="border p-1">Section {section}</td>
                                <td className="border p-1 text-center">
                                    <DownloadButton Criteria={selectedCriteria} Section={`criteria${selectedCriteria.slice(-1)}${section}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CriterionDownloadTable;

