
import React from 'react';
import axios from 'axios';
import "../../pages/download/index.css"
const DownloadButton = ({Criteria,Section}) => {
    const downloadFile = async () => {
        try {
            const criteria =Criteria 
            const section = Section 
          
            const response = await axios({
                url: `https://naacserver.onrender.com/admin/download/${criteria}/${section}`,
                method: 'GET',
                responseType: 'blob', 
            });
            console.log(section)
            console.log(response.data+"wowwww")
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${criteria+"_"+section}_data.xlsx`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    return (
        <button
          onClick={downloadFile}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Download
        </button>
      );
};

export default DownloadButton;
