import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFormValidation from './useFormValidation';
import './Form.css'
const Form = () => {
  const [surveyTopic, setSurveyTopic] = useState('');
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [additionalData, setAdditionalData] = useState({});
  const [additionalQuestionsFilled, setAdditionalQuestionsFilled] = useState(false);
  const { errors, validateForm } = useFormValidation(formData);

  useEffect(() => {
    if (surveyTopic) {
      let apiUrl = '';
      switch (surveyTopic) {
        case 'Technology':
          apiUrl = 'https://mocki.io/v1/0d5b0c9f-7180-44db-a8ee-8d1741318330';
          break;
        case 'Health':
          apiUrl = 'https://mocki.io/v1/a32d4991-d78f-49c4-8042-fb86d1d7eec6';
          break;
        case 'Education':
          apiUrl = 'https://mocki.io/v1/dc7a3a76-9baf-418e-a7bb-09d4dccf581a';
          break;
        default:
          break;
      }
      
      // Fetch additional questions based on the survey topic
      axios.get(apiUrl)
        .then(response => setAdditionalQuestions(response.data.questions))
        .catch(error => console.error('Error fetching questions', error));
    }
  }, [surveyTopic]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAdditionalChange = (e, index) => {
    setAdditionalData({ ...additionalData, [`additionalQuestion${index}`]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };
  const handleAdditionalSubmit = (e) => {
    e.preventDefault();
    setAdditionalQuestionsFilled(true);
  };
  return (
    <div>
      
      {!formSubmitted ? (
        <>
           <h2>Survey Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span>{errors.fullName}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Survey Topic:</label>
            <select
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={(e) => {
                handleChange(e);
                setSurveyTopic(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
          </div>

          {surveyTopic === 'Technology' && (
            <>
              <div>
                <label>Favorite Programming Language:</label>
                <select
                  name="favoriteProgrammingLanguage"
                  value={formData.favoriteProgrammingLanguage}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteProgrammingLanguage && <span>{errors.favoriteProgrammingLanguage}</span>}
              </div>
              <div>
                <label>Years of Experience:</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
                {errors.yearsOfExperience && <span>{errors.yearsOfExperience}</span>}
              </div>
            </>
          )}

          {surveyTopic === 'Health' && (
            <>
              <div>
                <label>Exercise Frequency:</label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}
              </div>
              <div>
                <label>Diet Preference:</label>
                <select
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && <span>{errors.dietPreference}</span>}
              </div>
            </>
          )}

          {surveyTopic === 'Education' && (
            <>
              <div>
                <label>Highest Qualification:</label>
                <select
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && <span>{errors.highestQualification}</span>}
              </div>
              <div>
                <label>Field of Study:</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                />
                {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
              </div>
            </>
          )}

          <div>
            <label>Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
            {errors.feedback && <span>{errors.feedback}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
        </>
      ) :  !additionalQuestionsFilled ? (
        <form onSubmit={handleAdditionalSubmit}>
          <h2>Additional Questions</h2>
          {additionalQuestions.map((question, index) => (
            <div key={index}>
              <label>{question.questionText}</label>
              <input
                type="text"
                name={`additionalQuestion${index}`}
                onChange={(e) => handleAdditionalChange(e, index)}
                required
              />
            </div>
          ))}
          <button type="submit">Submit Additional Questions</button>
        </form>
      ) : (
        <div className="summary">
        <h2>Summary</h2>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
      
        {surveyTopic === 'Technology' && (
          <>
            <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
            <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
          </>
        )}
      
        {surveyTopic === 'Health' && (
          <>
            <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
            <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
          </>
        )}
      
        {surveyTopic === 'Education' && (
          <>
            <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
            <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
          </>
        )}
      
        <p><strong>Feedback:</strong> {formData.feedback}</p>
      
        {additionalQuestions.length > 0 && (
          <div className="additional-questions-summary">
            <h2>Additional Questions</h2>
            {additionalQuestions.map((question, index) => (
              <div key={index}>
                <p><strong>{question.questionText}</strong> {additionalData[`additionalQuestion${index}`]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Form;
