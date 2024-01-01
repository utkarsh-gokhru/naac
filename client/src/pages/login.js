import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';
import naacLogo from '../naac_logo.png';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState(''); 
    const [invalCred, setInvalCred] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/auth/login', { id, password, department })
            .then(response => {
                console.log(response.data);
                setId('');
                setPassword('');
                setDepartment('');
                localStorage.setItem('id',id);
                localStorage.setItem('department',department);
                navigate('/criterias');
            })
            .catch(error => {
                console.log(error);

                if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                    setInvalCred(true);
                }
            })
    }

    return (
        <div className='loginPage'>
            <div className='logo'>
                <img src={naacLogo} alt='NAAC LOGO' />
            </div>
            <div className='loginContainer'>
                <div className='login-heading'>
                    <h2>Login</h2>
                    <p>Login to continue</p>
                </div>
                {invalCred && <p>Invalid Credentials. Please try again!</p>}
                <div className='dept-div'>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value='' disabled>Select your department</option>
                        <option value='Engineering'>Engineering</option>
                        <option value='Law'>Law</option>
                        <option value='Medical'>Medical</option> 
                    </select>
                </div>
                <div className='id-div'>
                    <label>ID</label>
                    <input type='text' value={id} required placeholder='Enter your ID'
                        onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='pwd-div'>
                    <label>PASSWORD</label>
                    <input type='password' value={password} required placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='btn'>
                    <button id='login-btn' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
