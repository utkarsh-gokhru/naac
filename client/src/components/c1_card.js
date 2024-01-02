import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/c1_card.css';
import { useNavigate } from 'react-router-dom';

const CardC1 = () => {
  const totalFields = 28;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/data/fetch?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        if(data.criteria11){
          count += data.criteria11.curriculumText ? 1 : 0;
          count += data.criteria11.file1_1_1 ? 1 : 0;
          count += data.criteria11.syllabusRevisionCount ? 1 : 0;
          count += data.criteria11.file1_1_2_1 ? 1 : 0;
          count += data.criteria11.file1_1_2_2 ? 1 : 0;
          count += data.criteria11.coursesFocusCount ? 1 : 0;
          count += data.criteria11.file1_1_3_1 ? 1 : 0;
          count += data.criteria11.file1_1_3_2 ? 1 : 0;
        }

        if(data.criteria12){
          count += data.criteria12.programCount1_2_2 ? 1 : 0;
          count += data.criteria12.newCoursesCount1_2_1 ? 1 : 0;
          count += data.criteria12.file1_2_1_1 ? 1 : 0;
          count += data.criteria12.file1_2_1_2 ? 1 : 0;
          count += data.criteria12.file1_2_2_1 ? 1 : 0;
          count += data.criteria12.file1_2_2_2 ? 1 : 0;
        }

        if(data.criteria13){
          count += data.criteria13.valueAddedCoursesCount1_3_2 ? 1 : 0;
          count += data.criteria13.enrolledStudentsCount1_3_3_1 ? 1 : 0;
          count += data.criteria13.projectsCount1_3_4 ? 1 : 0;
          count += data.criteria13.file1_3_2_1 ? 1 : 0;
          count += data.criteria13.file1_3_2_2 ? 1 : 0;
          count += data.criteria13.file1_3_3_1_1 ? 1 : 0;
          count += data.criteria13.file1_3_3_1_2 ? 1 : 0;
          count += data.criteria13.file1_3_4_1 ? 1 : 0;
          count += data.criteria13.file1_3_4_2 ? 1 : 0;
          count += data.criteria13.text_1_3_1 ? 1 : 0;
          count += data.criteria13.file1_3_1 ? 1 : 0;
        }

        if(data.criteria14){
          count += data.criteria14.feedbackType1_4_1 ? 1 : 0;
          count += data.criteria14.feedbackType1_4_2 ? 1 : 0;
          count += data.criteria14.file1_4_1 ? 1 : 0;
        }

        setFieldCount(count);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  const handlClick = () => {
    if(progress<100){
        navigate('/criteria1');
    }
    else{
        alert('Criteria 1 has been submitted!');
    }
  }

  return (
    <div className="card" onClick={handlClick}>
      <div className="card-content">
        <h2 className="card-title">Criteria 1</h2>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC1;
