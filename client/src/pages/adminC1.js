import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/adminC1.css';

const AdminC1 = () => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [curriculumText, setCurriculumText] = useState('');
    const [file1_1_1, setFile1_1_1] = useState('');
    const [syllabusRevisionCount, setSyllabusRevisionCount] = useState('');
    const [file1_1_2_1, setFile1_1_2_1] = useState('');
    const [file1_1_2_2, setFile1_1_2_2] = useState('');
    const [coursesFocusCount, setCoursesFocusCount] = useState('');
    const [file1_1_3_1, setFile1_1_3_1] = useState('');
    const [file1_1_3_2, setFile1_1_3_2] = useState('');

    const [programCount1_2_2, setProgramCount1_2_2] = useState('');
    const [newCoursesCount1_2_1, setNewCoursesCount1_2_1] = useState('');
    const [file1_2_1_1, setFile1_2_1_1] = useState('');
    const [file1_2_1_2, setFile1_2_1_2] = useState('');
    const [file1_2_2_1, setFile1_2_2_1] = useState('');
    const [file1_2_2_2, setFile1_2_2_2] = useState('');

    const [valueAddedCoursesCount1_3_2, setValueAddedCoursesCount1_3_2] = useState('');
    const [enrolledStudentsCount1_3_3_1, setEnrolledStudentsCount1_3_3_1] = useState('');
    const [projectsCount1_3_4, setProjectsCount1_3_4] = useState('');
    const [file1_3_2_1, setFile1_3_2_1] = useState('');
    const [file1_3_2_2, setFile1_3_2_2] = useState('');
    const [file1_3_3_1_1, setFile1_3_3_1_1] = useState('');
    const [file1_3_3_1_2, setFile1_3_3_1_2] = useState('');
    const [file1_3_4_1, setFile1_3_4_1] = useState('');
    const [file1_3_4_2, setFile1_3_4_2] = useState('');
    const [text_1_3_1, setText_1_3_1] = useState('');
    const [file1_3_1, setFile1_3_1] = useState('');

    const [feedbackType1_4_1, setFeedbackType1_4_1] = useState('');
    const [feedbackType1_4_2, setFeedbackType1_4_2] = useState('');
    const [file1_4_1, setFile1_4_1] = useState('');
    const [file1_4_2, setFile1_4_2] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetch?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data;
        
            if (data) {
        
                if (data.criteria11) {
                    setCurriculumText(data.criteria11.curriculumText ? data.criteria11.curriculumText : 'Pending');
                    setFile1_1_1(data.criteria11.file1_1_1 ? data.criteria11.file1_1_1 : 'Pending');
                    setSyllabusRevisionCount(data.criteria11.syllabusRevisionCount ? data.criteria11.syllabusRevisionCount : 'Pending');
                    setFile1_1_2_1(data.criteria11.file1_1_2_1 ? data.criteria11.file1_1_2_1 : 'Pending');
                    setFile1_1_2_2(data.criteria11.file1_1_2_2 ? data.criteria11.file1_1_2_2 : 'Pending');
                    setCoursesFocusCount(data.criteria11.coursesFocusCount ? data.criteria11.coursesFocusCount : 'Pending');
                    setFile1_1_3_1(data.criteria11.file1_1_3_1 ? data.criteria11.file1_1_3_1 : 'Pending');
                    setFile1_1_3_2(data.criteria11.file1_1_3_2 ? data.criteria11.file1_1_3_2 : 'Pending');
                }
                  
                if (data.criteria12) {
                    setProgramCount1_2_2(data.criteria12.programCount1_2_2 ? data.criteria12.programCount1_2_2 : 'Pending');
                    setNewCoursesCount1_2_1(data.criteria12.newCoursesCount1_2_1 ? data.criteria12.newCoursesCount1_2_1 : 'Pending');
                    setFile1_2_1_1(data.criteria12.file1_2_1_1 ? data.criteria12.file1_2_1_1 : 'Pending');
                    setFile1_2_1_2(data.criteria12.file1_2_1_2 ? data.criteria12.file1_2_1_2 : 'Pending');
                    setFile1_2_2_1(data.criteria12.file1_2_2_1 ? data.criteria12.file1_2_2_1 : 'Pending');
                    setFile1_2_2_2(data.criteria12.file1_2_2_2 ? data.criteria12.file1_2_2_2 : 'Pending');
                }
                  
                if (data.criteria13) {
                    setValueAddedCoursesCount1_3_2(data.criteria13.valueAddedCoursesCount1_3_2 ? data.criteria13.valueAddedCoursesCount1_3_2 : 'Pending');
                    setEnrolledStudentsCount1_3_3_1(data.criteria13.enrolledStudentsCount1_3_3_1 ? data.criteria13.enrolledStudentsCount1_3_3_1 : 'Pending');
                    setProjectsCount1_3_4(data.criteria13.projectsCount1_3_4 ? data.criteria13.projectsCount1_3_4 : 'Pending');
                    setFile1_3_2_1(data.criteria13.file1_3_2_1 ? data.criteria13.file1_3_2_1 : 'Pending');
                    setFile1_3_2_2(data.criteria13.file1_3_2_2 ? data.criteria13.file1_3_2_2 : 'Pending');
                    setFile1_3_3_1_1(data.criteria13.file1_3_3_1_1 ? data.criteria13.file1_3_3_1_1 : 'Pending');
                    setFile1_3_3_1_2(data.criteria13.file1_3_3_1_2 ? data.criteria13.file1_3_3_1_2 : 'Pending');
                    setFile1_3_4_1(data.criteria13.file1_3_4_1 ? data.criteria13.file1_3_4_1 : 'Pending');
                    setFile1_3_4_2(data.criteria13.file1_3_4_2 ? data.criteria13.file1_3_4_2 : 'Pending');
                    setText_1_3_1(data.criteria13.text_1_3_1 ? data.criteria13.text_1_3_1 : 'Pending');
                    setFile1_3_1(data.criteria13.file1_3_1 ? data.criteria13.file1_3_1 : 'Pending');
                }
                
                if (data.criteria14) {
                    setFeedbackType1_4_1(data.criteria14.feedbackType1_4_1 ? data.criteria14.feedbackType1_4_1 : 'Pending');
                    setFeedbackType1_4_2(data.criteria14.feedbackType1_4_2 ? data.criteria14.feedbackType1_4_2 : 'Pending');
                    setFile1_4_1(data.criteria14.file1_4_1 ? data.criteria14.file1_4_1 : 'Pending');
                    setFile1_4_2(data.criteria14.file1_4_2 ? data.criteria14.file1_4_2 : 'Pending');
                }                  
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData()
    },[]);

    return(
        <div className='adminC1-page'>
            <div className='c1-header'>
                <h1>Department- {department}</h1>
                <h1>Academic Year- {academicYear}</h1>
            </div>
            <div className='C-1-1'>
                <div className='C-1-1-1'>
                    <div className='curr_text'>
                        <h4>
                            1.1.1 - Curricula developed and implemented have relevance to the local, regional, national and global development needs which is reflected in Programme Outcomes (POs), Programme Specific Outcomes (PSOs) and Course Outcome (COs) of the Programmes offered by the University
                        </h4>
                        <p>
                            {curriculumText}
                        </p>
                        <h4>
                            Document supporting the same: {file1_1_1 ? (<a href={file1_1_1} target='_blank'>View</a>) : <h4>Pending</h4>}
                        </h4>
                    </div>
                </div>
                <div className='C-1-1-2'>
                    <h4>
                        1.1.2- Number of Programmes where syllabus revision was carried out during the year: {syllabusRevisionCount}
                    </h4>
                    <h4>
                        Data template: {file1_1_2_1 ? (<a href={file1_1_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file1_1_2_2 ? (<a href={file1_1_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-1-1-3'>
                    <h4>
                        1.1.3 - Number of courses having focus on employability/ entrepreneurship/ skill development offered by the University during the year: {coursesFocusCount}
                    </h4>
                    <h4>
                        Data template: {(file1_1_3_1!='Pending') ? (<a href={file1_1_3_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {(file1_1_3_2!="Pending") ? (<a href={file1_1_3_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-1-2'>
                <div className='C-1-2-1'>
                    <h4>
                        1.2.1 - Number of new courses introduced of the total number of courses across all programs offered during the year: {newCoursesCount1_2_1}
                    </h4>
                    <h4>
                        Data template: {file1_2_1_1 ? (<a href={file1_2_1_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file1_2_1_2 ? (<a href={file1_2_1_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-1-2-2'>
                    <h4>
                        1.2.2 - Number of Programmes in which Choice Based Credit System (CBCS)/elective course system has been implemented during the year: {programCount1_2_2}
                    </h4>
                    <h4>
                        Data template: {file1_2_2_1 ? (<a href={file1_2_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file1_2_2_2 ? (<a href={file1_2_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-1-3'>
                <div className='C-1-3-1'>
                    <h4>
                        1.3.1 - Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum.  
                    </h4>
                    <p>
                        {text_1_3_1}
                    </p>
                    <h4>
                        Document supporting the same: {file1_3_1 ? (<a href={file1_1_3_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-1-3-2'>
                    <h4>
                        1.3.2 - Number of value-added courses for imparting transferable and life skills offered during the year: {valueAddedCoursesCount1_3_2}
                    </h4>
                    <h4>
                        Data template: {file1_3_2_1 ? (<a href={file1_3_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file1_3_2_2 ? (<a href={file1_3_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-1-3-3'>
                    <h4>
                        1.3.3 - Total number of students enrolled in the courses under 1.3.2 above
                    </h4>
                    <h4>
                        1.3.3.1 - Number of students enrolled in value added courses imparting transferable and life skills offered during the year: {enrolledStudentsCount1_3_3_1}
                    </h4>
                    <h4>
                        Data template: {file1_3_3_1_1 ? (<a href={file1_3_3_1_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file1_3_3_1_2 ? (<a href={file1_3_3_1_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-1-3-4'>
                    <h4>
                        1.3.4 - Number of students undertaking field projects/ research projects/ internships during the year: {projectsCount1_3_4}
                    </h4>
                    <h4>
                        Data template: {file1_3_4_1 ? (<a href={file1_3_4_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file1_3_4_2 ? (<a href={file1_3_4_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-1-4'>
                <div className='C-1-4-1'>
                    <h4>
                        1.4.1 - Structured feedback for the design and review of syllabus-semester wise is received from: {feedbackType1_4_1} 
                    </h4>
                    <h4>
                        Data template: {file1_4_1 ? (<a href={file1_4_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-1-4-2'>
                    <h4>
                        1.4.2 - Feedback processes of the institution may be classified as follows: {feedbackType1_4_2}
                    </h4>
                    <h4>
                        Data template: {file1_4_2 ? (<a href={file1_4_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
        </div>
    )
};

export default AdminC1;
