import { useState } from 'react';

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Email format is invalid';

    if (!formData.surveyTopic) validationErrors.surveyTopic = 'Survey Topic is required';

    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) validationErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience) validationErrors.yearsOfExperience = 'Years of Experience is required';
      else if(formData.yearsOfExperience <=0) validationErrors.yearsOfExperience = 'Must be an positive integer';
    }

    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) validationErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) validationErrors.dietPreference = 'Diet Preference is required';
    }

    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) validationErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) validationErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!formData.feedback) validationErrors.feedback = 'Feedback is required';
    else if (formData.feedback.length < 50) validationErrors.feedback = 'Feedback must be at least 50 characters';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useFormValidation;
