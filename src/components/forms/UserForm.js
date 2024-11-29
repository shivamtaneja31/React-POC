import React, { useState, useEffect } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Example of useEffect - check form validity when data changes
    const validateForm = () => {
      const newErrors = {};
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else if (isNaN(formData.age) || formData.age < 0) {
        newErrors.age = 'Age must be a valid number';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (isSubmitting) {
      const isValid = validateForm();
      if (isValid) {
        // Simulate API call
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
      }
    }
  }, [formData, isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className="form-container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
