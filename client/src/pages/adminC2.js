import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/adminC2.css';

const adminC2 = () => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [no_of_seats, setno_of_seats] = useState("");
    const [students_reserved_cat, setstudents_reserved_cat] = useState("");
    const [file2_1_1_1, setfile2_1_1_1] = useState(null);
    const [file2_1_1_2, setfile2_1_1_2] = useState(null);
    const [file2_1_2_1, setfile2_1_2_1] = useState(null);
    const [file2_1_2_2, setfile2_1_2_2] = useState(null);

    const [learning_assessment, setlearning_assessment] = useState("");
    const [no_of_students, setno_of_students] = useState("");
    const [no_of_teachers, setno_of_teachers] = useState("");
    const [file2_2_1_1, setfile2_2_1_1] = useState(null);
    const [link2_2_1_2, setlink2_2_1_2] = useState(null);
    const [file2_2_2, setfile2_2_2] = useState(null);

    const [learning_exp, setlearning_exp] = useState("");
    const [no_of_mentors, setno_of_mentors] = useState("");
    const [file2_3_1, setfile2_3_1] = useState(null);
    const [effect_teach_learn, seteffect_teach_learn] = useState("");
    const [file2_3_2, setfile2_3_2] = useState(null);
    const [file2_3_3, setfile2_3_3] = useState(null);

    const [full_time_teachers, setfull_time_teachers] = useState("");
    const [full_time_teachers_phd_etc, setfull_time_teachers_phd_etc] = useState("");
    const [award_rec_teachers, setaward_rec_teachers] = useState("");
    const [total_exp, settotal_exp] = useState("");
    const [file2_4_1_1, setfile2_4_1_1] = useState(null);
    const [file2_4_1_2, setfile2_4_1_2] = useState(null);
    const [file2_4_2_1, setfile2_4_2_1] = useState(null);
    const [file2_4_2_2, setfile2_4_2_2] = useState(null);
    
    const [no_of_days, setno_of_days] = useState("");
    const [no_of_days_yearwise, setno_of_days_yearwise] = useState("");
    const [ it_integration, setit_integration] = useState("");
    const [no_of_student_grievances, setno_of_student_grievances] = useState("");
    const [status_of_automation, setstatus_of_automation] = useState('');
    const [file2_5_1_1, setfile2_5_1_1] = useState(null);
    const [file2_5_1_2, setfile2_5_1_2] = useState(null);
    const [file2_5_4_1, setfile2_5_4_1] = useState(null);
    const [file2_5_4_2, setfile2_5_4_2] = useState(null);
    const [file2_5_2, setfile2_5_2] = useState(null);
    const [file2_5_3, setfile2_5_3] = useState(null);
    
    const [learning_outcomes, setlearning_outcomes] = useState("");
    const [ attainment_prog_outcomes, setattainment_prog_outcomes] = useState("");
    const [  final_year_students_passed, setfinal_year_students_passed] = useState("");
    const [ final_year_students_appeared, setfinal_year_students_appeared] = useState("");
    const [file2_6_2, setfile2_6_2] = useState(null);
    const [file2_6_1, setfile2_6_1] = useState(null);
    const [file2_6_3_2_1, setfile2_6_3_2_1] = useState(null);
    const [file2_6_3_2_2, setfile2_6_3_2_2] = useState(null);

    const [sss_web_link, setsss_web_link] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/fetchC1?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data;
        
            if (data) {
        
                if (data.criteria21) {
                    setNoOfSeats(criteria21.no_of_seats ? criteria21.no_of_seats : 'Pending');
                    setFile2_1_1_1(criteria21.file2_1_1_1 ? criteria21.file2_1_1_1 : 'Pending');
                    setFile2_1_1_2(criteria21.file2_1_1_2 ? criteria21.file2_1_1_2 : 'Pending');
                    setStudentsReservedCat(criteria21.students_reserved_cat ? criteria21.students_reserved_cat : 'Pending');
                    setFile2_1_2_1(criteria21.file2_1_2_1 ? criteria21.file2_1_2_1 : 'Pending');
                    setFile2_1_2_2(criteria21.file2_1_2_2 ? criteria21.file2_1_2_2 : 'Pending');
                    }
                  
                if (data.criteria22) {
                setLearningAssessment(criteria22.learning_assessment ? criteria22.learning_assessment : 'Pending');
                setfile2_2_1_1(criteria22.file2_2_1_1 ? criteria22.file2_2_1_1 : 'Pending');
                setlink2_2_1_2(criteria22.link2_2_1_2 ? criteria22.link2_2_1_2 : 'Pending');
                setNoOfStudents(criteria22.no_of_students ? criteria22.no_of_students : 'Pending');
                setNoOfTeachers(criteria22.no_of_teachers ? criteria22.no_of_teachers : 'Pending');
                setfile2_2_2(criteria22.file2_2_2 ? criteria22.file2_2_2 : 'Pending');
                      }
                  
                if (data.criteria23) {
                    setLearningExp(criteria23.learning_exp ? criteria23.learning_exp : 'Pending');
                    setFile2_3_1(criteria23.file2_3_1 ? criteria23.file2_3_1 : 'Pending');
                    setEffectTeachLearn(criteria23.effect_teach_learn ? criteria23.effect_teach_learn : 'Pending');
                    setFile2_3_2(criteria23.file2_3_2 ? criteria23.file2_3_2 : 'Pending');
                    setNoOfMentors(criteria23.no_of_mentors ? criteria23.no_of_mentors : 'Pending');
                    setFile2_3_3(criteria23.file2_3_3 ? criteria23.file2_3_3 : 'Pending');
                  }
                
                if (data.criteria24) {
                setFullTimeTeachers(criteria24.full_time_teachers ? criteria24.full_time_teachers : 'Pending');
                setFile2_4_1_1(criteria24.file2_4_1_1 ? criteria24.file2_4_1_1 : 'Pending');
                setFile2_4_1_2(criteria24.file2_4_1_2 ? criteria24.file2_4_1_2 : 'Pending');
                setFullTimeTeachersPhdEtc(criteria24.full_time_teachers_phd_etc ? criteria24.full_time_teachers_phd_etc : 'Pending');
                setFile2_4_2_1(criteria24.file2_4_2_1 ? criteria24.file2_4_2_1 : 'Pending');
                setFile2_4_2_2(criteria24.file2_4_2_2 ? criteria24.file2_4_2_2 : 'Pending');
                setTotalExp(criteria24.total_exp ? criteria24.total_exp : 'Pending');
                setAwardRecTeachers(criteria24.award_rec_teachers ? criteria24.award_rec_teachers : 'Pending');
                }    
                if(data.criteria25){
                    setNoOfDays(criteria25.no_of_days ? criteria25.no_of_days : 'Pending');
                    setNoOfDaysYearwise(criteria25.no_of_days_yearwise ? criteria25.no_of_days_yearwise : 'Pending');
                    setFile2_5_1_1(criteria25.file2_5_1_1 ? criteria25.file2_5_1_1 : 'Pending');
                    setFile2_5_1_2(criteria25.file2_5_1_2 ? criteria25.file2_5_1_2 : 'Pending');
                    setNoOfStudentGrievances(criteria25.no_of_student_grievances ? criteria25.no_of_student_grievances : 'Pending');
                    setFile2_5_2(criteria25.file2_5_2 ? criteria25.file2_5_2 : 'Pending');
                    setItIntegration(criteria25.it_integration ? criteria25.it_integration : 'Pending');
                    setFile2_5_3(criteria25.file2_5_3 ? criteria25.file2_5_3 : 'Pending');
                    setStatusOfAutomation(criteria25.status_of_automation ? criteria25.status_of_automation : 'Pending');
                    setFile2_5_4_1(criteria25.file2_5_4_1 ? criteria25.file2_5_4_1 : 'Pending');
                    setFile2_5_4_2(criteria25.file2_5_4_2 ? criteria25.file2_5_4_2 : 'Pending');    
                } 
                if(data.criteria26){
                    setLearningOutcomes(criteria26.learning_outcomes ? criteria26.learning_outcomes : 'Pending');
                    setFile2_6_1(criteria26.file2_6_1 ? criteria26.file2_6_1 : 'Pending');
                    setAttainmentProgOutcomes(criteria26.attainment_prog_outcomes ? criteria26.attainment_prog_outcomes : 'Pending');
                    setFile2_6_2(criteria26.file2_6_2 ? criteria26.file2_6_2 : 'Pending');
                    setFinalYearStudentsPassed(criteria26.final_year_students_passed ? criteria26.final_year_students_passed : 'Pending');
                    setFinalYearStudentsAppeared(criteria26.final_year_students_appeared ? criteria26.final_year_students_appeared : 'Pending');
                    setFile2_6_3_2_1(criteria26.file2_6_3_2_1 ? criteria26.file2_6_3_2_1 : 'Pending');
                    setFile2_6_3_2_2(criteria26.file2_6_3_2_2 ? criteria26.file2_6_3_2_2 : 'Pending');
                   
                }   
                if(data.criteria27){
                    setSssWebLink(criteria27.sss_web_link ? criteria27.sss_web_link : 'Pending');
                }          
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData()
    },[]);


 
    return (
        <div className='adminC2-page'>

        <div className='c1-header'>
            <h1>Department- {department}</h1>
            <h1>Academic Year- {academicYear}</h1>
        </div>

        {/* 2-1 */}
        <div className='C-2-1'>
        <h3>2.1 - Student Enrollment and Profile</h3>
                <div className='C-2-1-1'>
                    <div className='curr_text'>
                        <h4>2.1.1 - Demand Ratio</h4>
                        
                        <h4>2.1.1.1 - Number of seats available during the year</h4>
                        <p>
                            {no_of_seats}
                        </p>
                        <h4>
                        Data template: {file2_1_1_1 ? (<a href={file2_1_1_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                        </h4>
                        <h4>
                            Document supporting the same: {file2_1_1_2 ? (<a href={file2_1_1_2} target='_blank'>View</a>) : <h4>Pending</h4>}
                        </h4>
                    </div>
                </div>
        <div className='C-2-1-2'>
        <div className='curr_text'>
            <h4>2.1.2 - Total number of seats filled against reserved categories (SC, ST, OBC, Divyangjan, etc.) as per applicable reservation<br></br>policy during the year (Excluding Supernumerary Seats)</h4>

            <h4>2.1.2.1 - Number of actual students admitted from the reserved categories during the year</h4>
            <p>
                            {students_reserved_cat}
                        </p>
            <h4>
             Data template: {file2_1_2_1 ? (<a href={file2_1_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
            </h4>
            <h4>
                Document supporting the same: {file2_1_2_2 ? (<a href={file2_1_2_2} target='_blank'>View</a>) : <h4>Pending</h4>}
            </h4>
            </div>
        </div>
        </div>


        {/* 2-2 */}
        <div className='C-2-2'>
        <h3>2.2 Catering to Student Diversity</h3>
        <div className='C-2-2-1'>
            <div className='curr_text'>
            <h4>2.2.1- The institution assesses the learning levels of the studentsand oragnises special programmes for advanced learners and slow learners  </h4>
            <p>
                {learning_assessment}
            </p>
            <h4>
             Data template: {file2_2_1_1 ? (<a href={file2_2_1_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
            </h4>
            <h4>
                Document supporting the same: {link2_2_1_2 ? (<a href={link2_2_1_2} target='_blank'>View</a>) : <h4>Pending</h4>}
            </h4>
            </div>
        </div>

        <div className='C-2-2-2'>
            <div className='curr_text'>
            <h4>2.2.2 - Student - Full time teacher ratio during the year</h4>
            <h4>
                Number of Students: <p>{no_of_students}</p>
            </h4>
            <h4>
                Number of Teachers: <p>{no_of_teachers}</p>
            </h4>
            <h4>
            Document supporting the same: {file2_2_2 ? (<a href={file2_2_2} target='_blank'>View</a>) : <h4>Pending</h4>}
            </h4>
            </div>
        </div>
        </div>


         {/* 2-3 */}
       <div className='C-2-3'>
       <h3>2.3- Teaching- Learning Process</h3>
       <div className='C-2-3-1'>
        <div className='curr_text'>
        <h4>2.3.1 - Student centric methods, such as experiential learning, participative learning and problem-solving methodologies are used for enhancing learning experiences</h4>
        <p> {learning_exp}</p>
        <h4>
            Document supporting the same: {file2_3_1 ? (<a href={file2_3_1} target='_blank'>View</a>) : <h4>Pending</h4>}
        </h4>   
            </div>
            </div> 
        
        <div className='C-2-3-2'>
            <div className='curr_text'>
            <h4>2.3.2 - Teachers use ICT enabled tools incuding online resources for effective teaching and learning processes during the year</h4>

            </div>
        </div>

        </div> 

    </div>
  )
}

export default adminC2