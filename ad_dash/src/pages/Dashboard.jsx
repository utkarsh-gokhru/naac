import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h1>Engineering Department</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Department Name</th>
                        <th>Criteria Number 1</th>
                        <th>Criteria Number 2</th>
                        <th>Criteria Number 3</th>
                       
                        <th>Criteria PDF</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2023-34</td>
                        <td>Engineering Department</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        
                        <td><a href="/path/to/pdf1.pdf">PDF Link 1</a></td>
                    </tr>
                    <tr>
                        <td>2022-23</td>
                        <td>Engineering Department</td>
                        <td>2</td>
                        <td>2</td>
                        <td>2</td>
                        
                        <td><a href="/path/to/pdf2.pdf">PDF Link 2</a></td>
                    </tr>
                    <tr>
                        <td>2021-22</td>
                        <td>Engineering Department</td>
                        <td>3</td>
                        <td>3</td>
                        <td>3</td>
                        
                        <td><a href="/path/to/pdf3.pdf">PDF Link 3</a></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

