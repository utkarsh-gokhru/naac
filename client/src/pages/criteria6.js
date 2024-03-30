import React, { useState } from "react";
import firebase from 'firebase/compat/app'; // Note the use of 'compat' for Firebase v9+
import 'firebase/compat/storage'; // Import specific Firebase services as needed

const CriterionForm = () => {
  return (
    <>
    <div>
      <h1 className="text-center text-semibold">Criterion 4-Infrastructure and Learning resources</h1>
    </div>
    <div>
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">4.1 - Physical facilty</h2>
      <div className="bg-gray-100 p-4">
      
      <div className="bg-white rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">4.1.1 - The insititute has adequate facilities to teaching -learning viz,classroom,laborataries and computing lab</h2>
       <input type="text"  className=" p-6 mx-8 h-6"/>
       <table className="w-full mt-4">
  <thead>
    <tr>
      <th className="text-left font-semibold">File Description</th>
      <th className="text-left font-semibold">Template</th>
      <th className="text-left font-semibold">Documents</th>
      <th className="text-left font-semibold">File Types/Size Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2">Upload the data template</td>
      <td className="py-2">Data Template</td>
      <td className="py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View File
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove File
        </button>
      </td>
      <td className="py-2">xls, xlsx, File Size: 6MB</td>
    </tr>
  </tbody>
</table>

      </div>
      <div>
      <div className="bg-white rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">4.1.2 - The institute has adequte facilities for cultural activities ,yoga,games and sports</h2>
       <input type="text"  className=" p-6 mx-8 h-6"/>
       <table className="w-full mt-4">
  <thead>
    <tr>
      <th className="text-left font-semibold">File Description</th>
      <th className="text-left font-semibold">Template</th>
      <th className="text-left font-semibold">Documents</th>
      <th className="text-left font-semibold">File Types/Size Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2">Upload the data template</td>
      <td className="py-2">Data Template</td>
      <td className="py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View File
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove File
        </button>
      </td>
      <td className="py-2">xls, xlsx, File Size: 6MB</td>
    </tr>
  </tbody>
</table>

      </div>
      <div>
      <div className="bg-white rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">4.1.3 - Availability of General campus facilities and Overall ambience</h2>
       <input type="text"  className=" p-6 mx-8 h-6"/>
       <table className="w-full mt-4">
  <thead>
    <tr>
      <th className="text-left font-semibold">File Description</th>
      <th className="text-left font-semibold">Template</th>
      <th className="text-left font-semibold">Documents</th>
      <th className="text-left font-semibold">File Types/Size Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2">Upload the data template</td>
      <td className="py-2">Data Template</td>
      <td className="py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View File
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove File
        </button>
      </td>
      <td className="py-2">xls, xlsx, File Size: 6MB</td>
    </tr>
  </tbody>
</table>

      </div>
      <div>
     
      <div>
      <div className="bg-white rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">4.1.4 - Total Expenditure excluding salary for Infrastructure augmentaion during the year(INR in Lakhs)</h2>
       <input type="text"  className="  p-6 "
       placeholder="650"
       />
       <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left font-semibold">File Description</th>
              <th className="text-left font-semibold">Template</th>
              <th className="text-left font-semibold">Documents</th>
              <th className="text-left font-semibold">File Types/Size Supported</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Upload the data template</td>
              <td className="py-2">Data Template</td>
              <td className="py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  View File
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Remove File
                </button>
              </td>
              <td className="py-2">xls, xlsx, File Size: 6MB</td>
            </tr>
            <tr>
              <td className="py-2">Upload relevant supporting document</td>
              <td className="py-2"></td>
              <td className="py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <input type="file" className="bg-blue-500 " />
                </button>
              </td>
              <td className="py-2">xls, xlsx, doc, docx, pdf, File Size: 6MB</td>
            </tr>
          </tbody>
        </table> 

      </div>
      <div>
      <div className="bg-white rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">4.2 - Library as a learning Source </h2>
      <h2 className="text-xl font-bold mb-4">4.2.1 - Library is Automated Using intgrated Library Management System (ILMS) has digitisation Facility</h2>
       <input type="text"  className=" p-6 mx-8 h-6"/>
       <table className="w-full mt-4">
  <thead>
    <tr>
      <th className="text-left font-semibold">File Description</th>
      <th className="text-left font-semibold">Template</th>
      <th className="text-left font-semibold">Documents</th>
      <th className="text-left font-semibold">File Types/Size Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2">Upload the data template</td>
      <td className="py-2">Data Template</td>
      <td className="py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View File
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove File
        </button>
      </td>
      <td className="py-2">xls, xlsx, File Size: 6MB</td>
    </tr>
  </tbody>
</table>

      </div>
      <div>
      <div>
      <div className="bg-white rounded-md p-4 mb-4">
      
      <h2 className="text-xl font-bold mb-4">4.2.2 -The institute has subscription for E-Library resources library has subscription for the following : </h2>
      <li>
       <ol>1.E-journal</ol>
       <ol>2.E-books</ol>
       <ol>3.E-shodhSindhu</ol>
       <ol>4.ShodGanga</ol>
       <ol>5.Databases</ol>
      </li>
      <li>
        
      </li>
       <table className="w-full mt-4">
  <thead>
    <tr>
      <th className="text-left font-semibold">File Description</th>
      <th className="text-left font-semibold">Template</th>
      <th className="text-left font-semibold">Documents</th>
      <th className="text-left font-semibold">File Types/Size Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2">Upload the data template</td>
      <td className="py-2">Data Template</td>
      <td className="py-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View File
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove File
        </button>
      </td>
      <td className="py-2">xls, xlsx, File Size: 6MB</td>
    </tr>
  </tbody>
</table>

      </div>
      </div>
      
      </div>
      </div>
      
      </div>
      </div>
    </div>

    

    </div>
    
    </div>
    </div>
    </div>
    </>
  )
}

export default CriterionForm;