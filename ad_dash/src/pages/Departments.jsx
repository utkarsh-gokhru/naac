import React from 'react';

const Departments = () => {
    return (
        <div>
            <div style={{ width: '80%', margin: '0 auto' }}></div>
            <h1>Department List</h1>

            {/* Criteria Table */}
         

            {/* Sr No and Department Name Table */}
           
            <table border="1">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Engineering Department</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Art Department</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Law Department</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Sports Department</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>MBA Department</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td> Department 7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td> Department 8</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Department 9</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Department 10</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Department 11</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Engineering Department</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default Departments;
