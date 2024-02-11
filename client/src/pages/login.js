import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';
import naacLogo from '../naac_logo.png';
import muLogo from '../mu_logo.jpg';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [invalCred, setInvalCred] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState('');
    const [mailOtp, setMailOtp] = useState('');
    const [invalOtp, setInvalOtp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target.form;

        if (form.checkValidity()) {
            axios.post('https://naacserver.onrender.com/auth/login', { id, password, department, academicYear })
                .then(response => {
                    if (response.data && response.data.otp) {
                        setShowOtpPopup(true);
                        setMailOtp(response.data.otp);
                    }
                })
                .catch(error => {
                    console.log(error);

                    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                        setInvalCred(true);
                    }
                });
        } else {
            form.reportValidity();
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        axios.post('https://naacserver.onrender.com/auth/otp', { otp, mailOtp })
            .then(response => {
                console.log(response.data);
                setShowOtpPopup(false);
                setId('');
                setPassword('');
                setDepartment('');
                setAcademicYear('');
                if (department === 'Admin') {
                    localStorage.setItem('id', id);
                    localStorage.setItem('admin', department);
                    localStorage.setItem('academicYear', academicYear);
                    navigate('/admin/dashboard');
                } else {
                    localStorage.removeItem('admin');
                    localStorage.setItem('id', id);
                    localStorage.setItem('department', department);
                    localStorage.setItem('academicYear', academicYear);
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                console.log(error);
                setOtp('');
                if (error.response && error.response.status === 409) {
                    setInvalOtp(true);
                }
            });
    };

    return (
        <div className='loginPage'>
            <div className='lu'>
                <div className='logo'>
                    <img src={naacLogo} alt='NAAC LOGO' />
                </div>
                <div className='logo'>
                    <img src={muLogo} alt='MU LOGO' />
                </div>
            </div>
            <div className='loginContainer'>
                <div className='login-heading'>
                    <h2>Login</h2>
                    <p>Login to continue</p>
                </div>
                {invalCred && <p className='error-message'>Invalid Credentials. Please try again!</p>}
                <form>
                    <div className='dept-div'>
                        <label>Department</label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value='' disabled>Select your department</option>
                            <option value='Engineering'>Engineering</option>
                            <option value='Law'>Law</option>
                            <option value='Medical'>Medical</option>
                            <option value='Admin'>Admin</option>
                        </select>
                    </div>
                    <div className='academic-year-div'>
                        <label>Academic Year</label>
                        <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} required>
                            <option value='' disabled>Select academic year</option>
                            <option value='2022-2023'>2022-2023</option>
                            <option value='2021-2022'>2021-2022</option>
                            <option value='2020-2021'>2020-2021</option>
                            <option value='2019-2020'>2019-2020</option>
                            <option value='2018-2019'>2018-2019</option>
                        </select>
                    </div>
                    <div className='id-div'>
                        <label>ID</label>
                        <input type='text' value={id} required placeholder='Enter your ID' onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className='pwd-div'>
                        <label>PASSWORD</label>
                        <input type='password' value={password} required placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='btn'>
                        <button id='login-btn' onClick={handleLogin}>Login</button>
                    </div>
                </form>
            </div>
            {showOtpPopup && (
                <div className='otp-popup'>
                    <div className='popup-cont'>
                        {invalOtp && <p className='error-message'>Invalid Otp!</p>}
                        <h3>OTP Verification</h3>
                        <p>Enter the OTP sent to your registered email</p>
                        <input type='text' value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={handleVerifyOTP}>Verify OTP</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
