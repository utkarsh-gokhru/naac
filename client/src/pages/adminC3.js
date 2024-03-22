import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminC3 = () => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    // Criteria 3.1
    const [researchFacilities, setResearchFacilities] = useState('Pending');
    const [file3_1_1, setFile3_1_1] = useState('');
    const [seedMoney, setSeedMoney] = useState('Pending');
    const [file3_1_2_1, setFile3_1_2_1] = useState('Pending');
    const [file3_1_2_2, setFile3_1_2_2] = useState('Pending');
    const [teachersFellowship, setTeachersFellowship] = useState('Pending');
    const [file3_1_3_1, setFile3_1_3_1] = useState('');
    const [file3_1_3_2, setFile3_1_3_2] = useState('');
    const [fellowsEnrolled, setFellowsEnrolled] = useState('Pending');
    const [file3_1_4_1, setFile3_1_4_1] = useState('');
    const [file3_1_4_2, setFile3_1_4_2] = useState('');
    const [feed_3_1_5_Type, setFeed_3_1_5_Type] = useState('Pending');
    const [file3_1_5, setFile3_1_5] = useState('');
    const [departmentNo, setDepartmentNo] = useState('Pending');
    const [file3_1_6_1, setFile3_1_6_1] = useState('');
    const [file3_1_6_2, setFile3_1_6_2] = useState('');

    // Criteria 3.2
    const [extraFunding, setExtraFunding] = useState('Pending');
    const [file3_2_1_1, setFile3_2_1_1] = useState('');
    const [file3_2_1_2, setFile3_2_1_2] = useState('');
    const [grants, setGrants] = useState('Pending');
    const [file3_2_2_1, setFile3_2_2_1] = useState('');
    const [file3_2_2_2, setFile3_2_2_2] = useState('');
    const [teacherResearchProjects, setTeacherResearchProjects] = useState('Pending');
    const [file3_2_3_1, setFile3_2_3_1] = useState('');
    const [file3_2_3_2, setFile3_2_3_2] = useState('');

    // Criteria 3.3
    const [ecosystemText, setEcosystemText] = useState('Pending');
    const [file3_3_1, setFile3_3_1] = useState('');
    const [seminars, setSeminars] = useState('Pending');
    const [totalSeminars, setTotalSeminars] = useState('Pending');
    const [file3_3_2_1, setFile3_3_2_1] = useState('');
    const [file3_3_2_2, setFile3_3_2_2] = useState('');
    const [awards, setAwards] = useState('Pending');
    const [file3_3_3_1, setFile3_3_3_1] = useState('');
    const [file3_3_3_2, setFile3_3_3_2] = useState('');

    // Criteria 3.4
    const [codeOfEthics, setCodeOfEthics] = useState('');
    const [file3_4_1, setFile3_4_1] = useState('');
    const [incentives, setIncentives] = useState('');
    const [file3_4_2_1, setFile3_4_2_1] = useState('');
    const [file3_4_2_2, setFile3_4_2_2] = useState('');
    const [patentsPublished, setPatentsPublished] = useState('');
    const [file3_4_3_1, setFile3_4_3_1] = useState('');
    const [file3_4_3_2, setFile3_4_3_2] = useState('');
    const [phdAwarded, setPhdAwarded] = useState('');
    const [teachersGuides, setTeachersGuides] = useState('');
    const [file3_4_4_1, setFile3_4_4_1] = useState('');
    const [file3_4_4_2, setFile3_4_4_2] = useState('');
    const [researchPapersPerTeacher, setResearchPapersPerTeacher] = useState('');
    const [file3_4_5_1, setFile3_4_5_1] = useState('');
    const [file3_4_5_2, setFile3_4_5_2] = useState('');
    const [booksEdited, setBooksEdited] = useState('');
    const [file3_4_6_1, setFile3_4_6_1] = useState('');
    const [file3_4_6_2, setFile3_4_6_2] = useState('');
    const [eContent, setEContent] = useState('');
    const [file3_4_7_1, setFile3_4_7_1] = useState('');
    const [file3_4_7_2, setFile3_4_7_2] = useState('');
    const [scopus348, setScopus348] = useState('');
    const [webOfScience348, setWebOfScience348] = useState('');
    const [file3_4_8_1, setFile3_4_8_1] = useState('');
    const [file3_4_8_2, setFile3_4_8_2] = useState('');
    const [scopus349, setScopus349] = useState('');
    const [webOfScience349, setWebOfScience349] = useState('');
    const [file3_4_9_1, setFile3_4_9_1] = useState('');
    const [file3_4_9_2, setFile3_4_9_2] = useState('');

    // Criteria 3.5
    const [consultancyText, setConsultancyText] = useState('Pending');
    const [consultancyRev, setConsultancyRev] = useState('Pending');
    const [file3_5_1, setFile3_5_1] = useState('');
    const [file3_5_2_1, setFile3_5_2_1] = useState('');
    const [file3_5_2_2, setFile3_5_2_2] = useState('');

    // Criteria 3.6
    const [extensionActText, setExtensionActText] = useState('Pending');
    const [file3_6_1, setFile3_6_1] = useState('');
    const [file3_6_2_1, setFile3_6_2_1] = useState('');
    const [file3_6_2_2, setFile3_6_2_2] = useState('');
    const [extActAwards, setExtActAwards] = useState('Pending');
    const [outreachPrograms, setOutreachPrograms] = useState('Pending');
    const [file3_6_3_1, setFile3_6_3_1] = useState('');
    const [file3_6_3_2, setFile3_6_3_2] = useState('');
    const [participatingStudents, setParticipatingStudents] = useState('Pending');
    const [file3_6_4_1, setFile3_6_4_1] = useState('');
    const [file3_6_4_2, setFile3_6_4_2] = useState('');

    // Criteria 3.7
    const [collAct, setCollAct] = useState('Pending');
    const [file3_7_1_1, setFile3_7_1_1] = useState('');
    const [file3_7_1_2, setFile3_7_1_2] = useState('');
    const [functionalMOUs, setFunctionalMOUs] = useState('Pending');
    const [file3_7_2_1, setFile3_7_2_1] = useState('');
    const [file3_7_2_2, setFile3_7_2_2] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/data/fetchC3?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data;
            
            if (data) {

                if (data.criteria31) {
                    setResearchFacilities(data.criteria31.researchFacilities ? data.criteria31.researchFacilities : 'Pending');
                    setFile3_1_1(data.criteria31.file3_1_1 ? data.criteria31.file3_1_1 : 'Pending');
                    setSeedMoney(data.criteria31.seedMoney ? data.criteria31.seedMoney : 'Pending');
                    setFile3_1_2_1(data.criteria31.file3_1_2_1 ? data.criteria31.file3_1_2_1 : 'Pending');
                    setFile3_1_2_2(data.criteria31.file3_1_2_2 ? data.criteria31.file3_1_2_2 : 'Pending');
                    setTeachersFellowship(data.criteria31.teachersFellowship ? data.criteria31.teachersFellowship : 'Pending');
                    setFile3_1_3_1(data.criteria31.file3_1_3_1 ? data.criteria31.file3_1_3_1 : 'Pending');
                    setFile3_1_3_2(data.criteria31.file3_1_3_2 ? data.criteria31.file3_1_3_2 : 'Pending');
                    setFellowsEnrolled(data.criteria31.fellowsEnrolled ? data.criteria31.fellowsEnrolled : 'Pending');
                    setFile3_1_4_1(data.criteria31.file3_1_4_1 ? data.criteria31.file3_1_4_1 : 'Pending');
                    setFile3_1_4_2(data.criteria31.file3_1_4_2 ? data.criteria31.file3_1_4_2 : 'Pending');
                    setFeed_3_1_5_Type(data.criteria31.feed_3_1_5_Type ? data.criteria31.feed_3_1_5_Type : 'Pending');
                    setFile3_1_5(data.criteria31.file3_1_5 ? data.criteria31.file3_1_5 : 'Pending');
                    setDepartmentNo(data.criteria31.departmentNo ? data.criteria31.departmentNo : 'Pending');
                    setFile3_1_6_1(data.criteria31.file3_1_6_1 ? data.criteria31.file3_1_6_1 : 'Pending');
                    setFile3_1_6_2(data.criteria31.file3_1_6_2 ? data.criteria31.file3_1_6_2 : 'Pending');
                }
   
                if (data.criteria32) {
                    setExtraFunding(data.criteria32.extraFunding ? data.criteria32.extraFunding : 'Pending');
                    setFile3_2_1_1(data.criteria32.file3_2_1_1 ? data.criteria32.file3_2_1_1 : '');
                    setFile3_2_1_2(data.criteria32.file3_2_1_2 ? data.criteria32.file3_2_1_2 : '');
                    setGrants(data.criteria32.grants ? data.criteria32.grants : 'Pending');
                    setFile3_2_2_1(data.criteria32.file3_2_2_1 ? data.criteria32.file3_2_2_1 : '');
                    setFile3_2_2_2(data.criteria32.file3_2_2_2 ? data.criteria32.file3_2_2_2 : '');
                    setTeacherResearchProjects(data.criteria32.teacherResearchProjects ? data.criteria32.teacherResearchProjects : 'Pending');
                    setFile3_2_3_1(data.criteria32.file3_2_3_1 ? data.criteria32.file3_2_3_1 : '');
                    setFile3_2_3_2(data.criteria32.file3_2_3_2 ? data.criteria32.file3_2_3_2 : '');
                }
    
                if (data.criteria33) {
                    setEcosystemText(data.criteria33.ecosystemText ? data.criteria33.ecosystemText : 'Pending');
                    setFile3_3_1(data.criteria33.file3_3_1 ? data.criteria33.file3_3_1 : 'Pending');
                    setSeminars(data.criteria33.seminars ? data.criteria33.seminars : 'Pending');
                    setTotalSeminars(data.criteria33.totalSeminars ? data.criteria33.totalSeminars : 'Pending');
                    setFile3_3_2_1(data.criteria33.file3_3_2_1 ? data.criteria33.file3_3_2_1 : 'Pending');
                    setFile3_3_2_2(data.criteria33.file3_3_2_2 ? data.criteria33.file3_3_2_2 : 'Pending');
                    setAwards(data.criteria33.awards ? data.criteria33.awards : 'Pending');
                    setFile3_3_3_1(data.criteria33.file3_3_3_1 ? data.criteria33.file3_3_3_1 : 'Pending');
                    setFile3_3_3_2(data.criteria33.file3_3_3_2 ? data.criteria33.file3_3_3_2 : 'Pending');
                }

                if (data.criteria34) {
                    setCodeOfEthics(data.criteria34.code_of_ethics ? data.criteria34.code_of_ethics : 'Pending');
                    setFile3_4_1(data.criteria34.file_3_4_1 ? data.criteria34.file_3_4_1 : 'Pending');
                    setIncentives(data.criteria34.incentives ? data.criteria34.incentives : 'Pending');
                    setFile3_4_2_1(data.criteria34.file_3_4_2_1 ? data.criteria34.file_3_4_2_1 : 'Pending');
                    setFile3_4_2_2(data.criteria34.file_3_4_2_2 ? data.criteria34.file_3_4_2_2 : 'Pending');
                    setPatentsPublished(data.criteria34.patents_published ? data.criteria34.patents_published : 'Pending');
                    setFile3_4_3_1(data.criteria34.file_3_4_3_1 ? data.criteria34.file_3_4_3_1 : 'Pending');
                    setFile3_4_3_2(data.criteria34.file_3_4_3_2 ? data.criteria34.file_3_4_3_2 : 'Pending');
                    setPhdAwarded(data.criteria34.phd_awarded ? data.criteria34.phd_awarded : 'Pending');
                    setTeachersGuides(data.criteria34.teachers_guides ? data.criteria34.teachers_guides : 'Pending');
                    setFile3_4_4_1(data.criteria34.file_3_4_4_1 ? data.criteria34.file_3_4_4_1 : 'Pending');
                    setFile3_4_4_2(data.criteria34.file_3_4_4_2 ? data.criteria34.file_3_4_4_2 : 'Pending');
                    setResearchPapersPerTeacher(data.criteria34.research_papers_per_teacher ? data.criteria34.research_papers_per_teacher : 'Pending');
                    setFile3_4_5_1(data.criteria34.file_3_4_5_1 ? data.criteria34.file_3_4_5_1 : 'Pending');
                    setFile3_4_5_2(data.criteria34.file_3_4_5_2 ? data.criteria34.file_3_4_5_2 : 'Pending');
                    setBooksEdited(data.criteria34.books_edited ? data.criteria34.books_edited : 'Pending');
                    setFile3_4_6_1(data.criteria34.file_3_4_6_1 ? data.criteria34.file_3_4_6_1 : 'Pending');
                    setFile3_4_6_2(data.criteria34.file_3_4_6_2 ? data.criteria34.file_3_4_6_2 : 'Pending');
                    setEContent(data.criteria34.e_content ? data.criteria34.e_content : 'Pending');
                    setFile3_4_7_1(data.criteria34.file_3_4_7_1 ? data.criteria34.file_3_4_7_1 : 'Pending');
                    setFile3_4_7_2(data.criteria34.file_3_4_7_2 ? data.criteria34.file_3_4_7_2 : 'Pending');
                    setScopus348(data.criteria34.scopus348 ? data.criteria34.scopus348 : 'Pending');
                    setWebOfScience348(data.criteria34.web_of_science348 ? data.criteria34.web_of_science348 : 'Pending');
                    setFile3_4_8_1(data.criteria34.file_3_4_8_1 ? data.criteria34.file_3_4_8_1 : 'Pending');
                    setFile3_4_8_2(data.criteria34.file_3_4_8_2 ? data.criteria34.file_3_4_8_2 : 'Pending');
                    setScopus349(data.criteria34.scopus349 ? data.criteria34.scopus349 : 'Pending');
                    setWebOfScience349(data.criteria34.web_of_science349 ? data.criteria34.web_of_science349 : 'Pending');
                    setFile3_4_9_1(data.criteria34.file_3_4_9_1 ? data.criteria34.file_3_4_9_1 : 'Pending');
                    setFile3_4_9_2(data.criteria34.file_3_4_9_2 ? data.criteria34.file_3_4_9_2 : 'Pending');
                }
    
                if (data.criteria35) {
                    setConsultancyText(data.criteria35.consultancyText ? data.criteria35.consultancyText : 'Pending');
                    setConsultancyRev(data.criteria35.consultancyRev ? data.criteria35.consultancyRev : 'Pending');
                    setFile3_5_1(data.criteria35.file3_5_1 ? data.criteria35.file3_5_1 : 'Pending');
                    setFile3_5_2_1(data.criteria35.file3_5_2_1 ? data.criteria35.file3_5_2_1 : 'Pending');
                    setFile3_5_2_2(data.criteria35.file3_5_2_2 ? data.criteria35.file3_5_2_2 : 'Pending');
                }
    
                if (data.criteria36) {
                    setExtensionActText(data.criteria36.extensionActText ? data.criteria36.extensionActText : 'Pending');
                    setFile3_6_1(data.criteria36.file3_6_1 ? data.criteria36.file3_6_1 : 'Pending');
                    setFile3_6_2_1(data.criteria36.file3_6_2_1 ? data.criteria36.file3_6_2_1 : 'Pending');
                    setFile3_6_2_2(data.criteria36.file3_6_2_2 ? data.criteria36.file3_6_2_2 : 'Pending');
                    setExtActAwards(data.criteria36.extActAwards ? data.criteria36.extActAwards : 'Pending');
                    setOutreachPrograms(data.criteria36.outreachPrograms ? data.criteria36.outreachPrograms : 'Pending');
                    setFile3_6_3_1(data.criteria36.file3_6_3_1 ? data.criteria36.file3_6_3_1 : 'Pending');
                    setFile3_6_3_2(data.criteria36.file3_6_3_2 ? data.criteria36.file3_6_3_2 : 'Pending');
                    setParticipatingStudents(data.criteria36.participatingStudents ? data.criteria36.participatingStudents : 'Pending');
                    setFile3_6_4_1(data.criteria36.file3_6_4_1 ? data.criteria36.file3_6_4_1 : 'Pending');
                    setFile3_6_4_2(data.criteria36.file3_6_4_2 ? data.criteria36.file3_6_4_2 : 'Pending');
                }

                if (data.criteria37) {
                    setCollAct(data.criteria37.collAct ? data.criteria37.collAct : 'Pending');
                    setFile3_7_1_1(data.criteria37.file3_7_1_1 ? data.criteria37.file3_7_1_1 : 'Pending');
                    setFile3_7_1_2(data.criteria37.file3_7_1_2 ? data.criteria37.file3_7_1_2 : 'Pending');
                    setFunctionalMOUs(data.criteria37.functionalMOUs ? data.criteria37.functionalMOUs : 'Pending');
                    setFile3_7_2_1(data.criteria37.file3_7_2_1 ? data.criteria37.file3_7_2_1 : 'Pending');
                    setFile3_7_2_2(data.criteria37.file3_7_2_2 ? data.criteria37.file3_7_2_2 : 'Pending');
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
        <div className='adminC3-page'>
            <div className='c3-header'>
                <h1>Department- {department}</h1>
                <h1>Academic Year- {academicYear}</h1>
            </div>
            <div className='C-3-1'>
                <div className='C-3-1-1'>
                    <h4>3.1.1 - The institution Research facilities are frequently updated and there is well dedfined 
                        policy for promotion and research which is uploaded on the institutional website and implemented: {researchFacilities}
                    </h4>
                    <p></p>
                    <h4>
                        Document supporting the same: {file3_1_1 ? (<a href={file3_1_1} target='_blank'>View</a>) : <h4>Pending</h4>}
                    </h4>
                </div>
                <div className='C-3-1-2'>
                <h4>3.1.2- The institution provides seed money to its teachers for research (amount INR in Lakhs ) : {seedMoney}</h4>
                    <h4>
                        Data template: {(file3_1_2_1!='Pending') ? (<a href={file3_1_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {(file3_1_2_2!='Pending') ? (<a href={file3_1_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-1-3'>
                    <h4>3.1.3 - Number of teachers receiving national/international fellowship/financial supported
                        by various agencies for advanced studies/research during the year : {teachersFellowship}
                    </h4>
                    <h4>
                        Data template: {(file3_1_3_1!='Pending') ? (<a href={file3_1_3_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {(file3_1_3_2!="Pending") ? (<a href={file3_1_3_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-1-4'>
                    <h4>
                        3.1.4 - Number of JRFs, SRFs, Post-Doctoral Fellows, Research Associates and other research
                        fellows enrolled in the institution during the year : {fellowsEnrolled}
                    </h4>
                    <h4>
                        Data template: {(file3_1_4_1!='') ? (<a href={file3_1_4_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {(file3_1_4_2!="") ? (<a href={file3_1_4_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-1-5'>
                    <h4>
                        3.1.5 - Institution has the following facilities to support research : {feed_3_1_5_Type}
                    </h4>
                    <ul>
                        <li>Central Instrumentation Centre</li>
                        <li>Animal House/Green House</li>
                        <li>Museum</li>
                        <li>Media Laboratory/Studios</li>
                        <li>Business Lab</li>
                        <li>Research/Statistical Databases</li>
                        <li>Moot Court</li>
                        <li>Theatre</li>
                        <li>Art Gallery</li>
                    </ul>
                    <h4>
                        Document supporting the same: {file3_1_5 ? (<a href={file3_1_5} target='_blank'>View</a>) : <h4>Pending</h4>}
                    </h4>
                </div>
                <div className='C-3-1-6'>
                    <h4>
                        3.1.6 - Number of departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR and other recognitions
                        by national and international agencies during the year : {departmentNo}
                    </h4>
                    <h4>
                        Data template: {(file3_1_6_1!='Pending') ? (<a href={file3_1_6_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {(file3_1_6_2!="Pending") ? (<a href={file3_1_6_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-3-2'>
                <div className='C-3-2-1'>
                    <h4>
                        3.2.1 - Extramural funding for Research (Grants sponsored by the non-government sources
                        such as industry, corporate houses, international bodies for research projects) endowments, 
                        Chairs in the University during the year (INR in Lakhs) : {extraFunding}
                    </h4>
                    <h4>
                        Data template: {file3_2_1_1 ? (<a href={file3_2_1_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_2_1_2 ? (<a href={file3_2_1_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-2-2'>
                    <h4>3.2.2- Grants for research projects sponsored by the government agencies during the year (INR in Lakhs) : {grants}</h4>
                    <h4>
                        Data template: {file3_2_2_1 ? (<a href={file3_2_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_2_2_2 ? (<a href={file3_2_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-2-3'>
                    <h4>3.2.3 - Number of research projects per teacher funded by government and non-government agencies during the year : {teacherResearchProjects}</h4>
                    <h4>
                        Data template: {file3_2_3_1 ? (<a href={file3_2_3_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_2_3_2 ? (<a href={file3_2_3_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-3-3'>
                <div className='C-3-3-1'>
                    <h4>3.3.1 - Institution has created an eco-system for innovation including incubation
                        centre and other inititatives for creation and transfer of knowledge 
                    </h4>
                    <p>
                        {ecosystemText}
                    </p>
                    <h4>
                        Document supporting the same: {file3_3_1 ? (<a href={file3_3_1} target='_blank'>View</a>) : <h4>Pending</h4>}
                    </h4>
                </div>
                <div className='C-3-3-2'>
                    <h4>3.3.2 - Number of seminars/workshops conducted on Research Methodology,
                        Intellectual Property Rights (IPR), Entrepreneurship and Skill Development during the year : {seminars}
                    </h4>
                    <h4>3.3.2.1 - Number of seminars/workshops conducted on Research Methodology,
                        Intellectual Property Rights (IPR), Entrepreneurship and Skill Development year wise during the year : {totalSeminars}
                    </h4>
                    <h4>
                        Data template: {file3_3_2_1 ? (<a href={file3_3_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_3_2_2 ? (<a href={file3_3_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-3-3'>
                    <h4>3.3.3 - Number of awards/recogntions received for research/innovation by the
                        institution/teachers/research scholars/students during the year : {awards}
                    </h4>
                    <h4>
                        Data template: {file3_3_3_1 ? (<a href={file3_3_3_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_3_3_2 ? (<a href={file3_3_3_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-3-5'>
                <div className='C-3-5-1'>
                    <h4>3.5.1 - Instution has a policy of consultancy including revenue sharing between the institution and the 
                        individual and encourages its faculty to undertake consultancy
                    </h4>
                    <p>
                        {consultancyText}
                    </p>
                    <h4>
                        Document supporting the same: {file3_5_1 ? (<a href={file3_5_1} target='_blank'>View</a>) : <h4>Pending</h4>}
                    </h4>
                </div>
                <div className='C-3-5-2'>
                    <h4>3.5.2- Revenue genrated from consultancy and corporate training during the year : {consultancyRev}</h4>
                    <h4>
                        Data template: {file3_5_2_1 ? (<a href={file3_5_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_5_2_2 ? (<a href={file3_5_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-3-6'>
                <div className='C-3-6-1'>
                    <h4>3.6.1 - Extension activities in the neighbourhood community in terms of impact and sensitising 
                        students to social issues and holistic development during the year
                    </h4>
                    <p>
                        {extensionActText}
                    </p>
                    <h4>
                        Document supporting the same: {file3_6_1 ? (<a href={file3_6_1} target='_blank'>View</a>) : <h4>Pending</h4>}
                    </h4>
                </div>
                <div className='C-3-6-2'>
                    <h4>3.6.2- Number of awards received by the instituion,its teachers and students from 
                        Government/Government recognised bodies in recognition of the extension activities carried out 
                        during the year : {extActAwards}
                    </h4>
                    <h4>
                        Data template: {file3_6_2_1 ? (<a href={file3_6_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_6_2_2 ? (<a href={file3_6_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-6-3'>
                    <h4> 
                        3.6.3 - Number of extension and outreach programs conducted by the institution including those
                        NSS/NCC/Red Cross/YRC during the year (including Government initiated programs such as Swachh
                        Bharat, Aids Awareness, Gender issues, etc. and those organised in collaboration with industry
                        ,community and NGOs) : {outreachPrograms}
                    </h4>
                    <h4>
                        Data template: {file3_6_3_1 ? (<a href={file3_6_3_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_6_3_2 ? (<a href={file3_6_3_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-6-4'>
                    <h4> 
                        3.6.4 - Total number of students participating in extension activities listed at 3.6.3 above 
                        during the year : {participatingStudents}
                    </h4>
                    <h4>
                        Data template: {file3_6_4_1 ? (<a href={file3_6_4_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_6_4_2 ? (<a href={file3_6_4_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
            <div className='C-3-7'>
                <div className='C-3-7-1'>
                    <h4>3.7.1 - Number of collaborative activities with other instituions/research establishment/
                        industry for research and acadmec development of faculty and students during the year : {collAct}
                    </h4>
                    <h4>
                        Data template: {file3_7_1_1 ? (<a href={file3_7_1_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_7_1_2 ? (<a href={file3_7_1_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
                <div className='C-3-7-2'>
                    <h4>3.7.2- Number of functional MOUs with instituions/industries in India and abroad 
                        for internship, on-the job training, project work, student/faculty exchange and collaborative
                        research during the year : {functionalMOUs}
                    </h4>
                    <h4>
                        Data template: {file3_7_2_1 ? (<a href={file3_7_2_1} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                    <h4>
                        Document supporting the same: {file3_7_2_2 ? (<a href={file3_7_2_2} target='_blank'>View</a>) : (<h4>Pending</h4>)}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default AdminC3;
