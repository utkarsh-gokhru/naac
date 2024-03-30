import React, { useState } from 'react';

const CriteriaForm = () => {
  const [form, setForm] = useState({
    department: '',
    academicYear: '',
    criteriaAnswers: Array(7).fill({ text: '', file: null }),
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, index) => {
    console.log("what is this index: " + index)
    const newCriteriaAnswers = [...form.criteriaAnswers];
    newCriteriaAnswers[index] = { ...newCriteriaAnswers[index], file: e.target.files[0] };
    console.log("what is new criteriaAnswer: " + JSON.stringify(newCriteriaAnswers));
    setForm({ ...form, criteriaAnswers: newCriteriaAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to backend
    
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" value={form.department} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="academicYear">Academic Year:</label>
        <input type="text" id="academicYear" name="academicYear" value={form.academicYear} onChange={handleInputChange} />
      </div>
      {form.criteriaAnswers.map((criteria, index) => (
        <div key={index}>
          <h3>Criterion {index + 1}</h3>
          <div>
            <label htmlFor={`textAnswer_${index}`}>Text Answer:</label>
            <input type="text" id={`textAnswer_${index}`} value={criteria.text} onChange={(e) => setForm({...form, criteriaAnswers: form.criteriaAnswers.map((item, i) => i === index ? { ...item, text: e.target.value } : item)})} />
          </div>
          <div>
            <label htmlFor={`file_${index}`}>File Attachment:</label>
            <input type="file" id={`file_${index}`} onChange={(e) => handleFileChange(e, index)} />
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CriteriaForm;
