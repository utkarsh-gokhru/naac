import React, { useEffect, useState } from 'react';
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
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const academicYears = Array.from({ length: 6 }, (_, i) => {
        const startYear = currentYear - i;
        return `${startYear - 1}-${startYear}`;
    });

    // const departments = [
    //     'Admin',
    //     'Academy of Administrative Careers',
    //     'Academy of Theatre Arts (Ambedkar Bhavan)',
    //     'Alkesh Dinesh Mosy Institute for Financial and Management Studies (Separate Building)',
    //     'Center for Eurasian Studies',
    //     'Center for Excellence in Basic Sciences',
    //     'Center of Extra Mural Studies / MA Archeology',
    //     'Chankya Institute of Leadership Studies',
    //     'Confucius Institute',
    //     'Department of Sociology (Ranade)',
    //     'Department of Lifelong Learning and Education',
    //     'Department of Applied Psychology',
    //     'Department of Arabic (Ranade)',
    //     'Department of Bio-Physics (Separate Building)',
    //     'Department of Bio-Technology (Ls Block)',
    //     'Department of Chemistry',
    //     'Department of Civics and Politics',
    //     'Department of Commerce (Ranade)',
    //     'Department of Communication and Journalism',
    //     'Department of Education',
    //     'Department of English',
    //     'Centre for African Studies',
    //     'Department of French (Ranade)',
    //     'Department of Geography (Tilak)',
    //     'Department of German',
    //     'Department of Gujarati',
    //     'Department of Hindi',
    //     'Department of History (Ranade Bhavan)',
    //     'Department of Kannada (Ranade)',
    //     'Department of Law (Fort Campus)',
    //     'Department of Library and Information Science (JN)',
    //     'Department of Life Sciences',
    //     'Department of Linguistics',
    //     'Department of Marathi (Ranade)',
    //     'Department of Mathematics',
    //     'Department of Music',
    //     'Department of Pali',
    //     'Department of Persian (Ranade)',
    //     'Department of Philosophy (Gyaneshwar)',
    //     'Department of Physical Education (Sports Complex)',
    //     'Department of Physics (Tilak)',
    //     'Department of Russian',
    //     'Department of Sanskrit',
    //     'Department of Sindhi',
    //     'Department of Statistics',
    //     'Department of Urdu',
    //     'Garware Institute of Career Education and Development',
    //     'JBIMS',
    //     'Lokkala Academy',
    //     'Mumbai School of Economics and Public Policy',
    //     'Dr. Ambedkar Centre for Social Justice',
    //     'Mahatma Gandhi Peace Center',
    //     'Ratnagiri Sub-Center',
    //     'Thane Sub-Center (5 years integrated Law & Management Programme and 5 years integrated Management Programme)',
    //     'UDIT (IDOL Building)',
    //     'UMLA',
    //     'University Department of Computer Science (Ranade)',
    //     'Director NSS',
    //     'Director Student Development',
    //     'National Center for Nanoscience and Nanotechnology',
    //     'Gurudev Tagore Chair of Comparative Literature',
    //     'Institute of Distance and Open Learning',
    //     'J. J. College of Architecture',
    //     'Rajiv Gandhi Center for Contemporary Studies (MSW)',
    //     'Phule-Ambedkar Chair',
    //     'UGC HRDC',
    //     'Vijaylakshmi Vishwanath Dalvie College, Talere',
    //     'Vishwabhushan Bharatratna Dr. Babasaheb Ambedkar College (Model College) Ambadave',
    //     'Women Development Cell',
    //     'MU IDEAS',
    //     'Knowledge Resource Center',
    //     'Finance and Accounts Section',
    //     'TAU',
    //     'Affiliation Section',
    //     'Examination Section',
    //     'UG and PG Section',
    //     'Enrollment and Eligibility Section',
    //     'Thesis Section',
    //     'AAQA'
    // ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target.form;

        if (!form.checkValidity()) {
            form.reportValidity();
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://naacserver.onrender.com/auth/login', {
                id,
                password,
                department,
                academicYear,
            });

            if (response.data && response.data.otp) {
                setShowOtpPopup(true);
                setMailOtp(response.data.otp);
            }
        } catch (error) {
            console.error(error);
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                setInvalCred(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://naacserver.onrender.com/auth/otp', { otp, mailOtp });

            if (response.data) {
                setShowOtpPopup(false);
                setId('');
                setPassword('');
                setDepartment('');
                setAcademicYear('');

                if (department === 'Admin') {
                    localStorage.setItem('id', id);
                    localStorage.setItem('admin', department);
                    localStorage.setItem('academicYear', academicYear);
                    navigate('/admin/criteria');
                } else {
                    localStorage.removeItem('admin');
                    localStorage.setItem('id', id);
                    localStorage.setItem('department', department);
                    localStorage.setItem('academicYear', academicYear);
                    navigate('/dashboard');
                }

                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setOtp('');
            if (error.response && error.response.status === 409) {
                setInvalOtp(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            //   setLoading(true);
            try {
                const response = await axios.get('https://naacserver.onrender.com/get/Depts');
                if (response.data) {
                    setDepartments(response.data.departments || []); // Assuming response contains a `departments` field
                }
            } catch (err) {
                console.error('Error fetching departments:', err);
            }
        };

        fetchDepartments();
    }, []);

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
                            {departments.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='academic-year-div'>
                        <label>Academic Year</label>
                        <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} required>
                            <option value='' disabled>Select academic year</option>
                            {academicYears.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='id-div'>
                        <label>ID</label>
                        <input
                            type='text'
                            value={id}
                            required
                            placeholder='Enter your ID'
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div className='pwd-div'>
                        <label>Password</label>
                        <input
                            type='password'
                            value={password}
                            required
                            placeholder='Enter your Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='btn'>
                        <button id='login-btn' onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            {loading && (
                <div className='overlay'>
                    <div className='loading-spinner'></div>
                </div>
            )}
            {showOtpPopup && (
                <div className='otp-popup'>
                    <div className='popup-cont'>
                        {invalOtp && <p className='error-message'>Invalid OTP!</p>}
                        <h3>OTP Verification</h3>
                        <p>Enter the OTP sent to your registered email</p>
                        <input type='text' value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={handleVerifyOTP}>Verify OTP</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
