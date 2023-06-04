// pages/register.tsx
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fname: '',
    lname: '',
    gender: '',
    birth_date: '',
    education: '',
    province: '',
    country: '',
    user_type: '',
    teacher_dept: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />

      <label>
        First Name:
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
      </label>
      <br />

      <label>
        Last Name:
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
      </label>
      <br />

      <label>
        Gender:
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
      </label>
      <br />

      <label>
        Birth Date:
        <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
      </label>
      <br />

      <label>
        Education:
        <input type="text" name="education" value={formData.education} onChange={handleChange} />
      </label>
      <br />

      <label>
        Province:
        <input type="text" name="province" value={formData.province} onChange={handleChange} />
      </label>
      <br />

      <label>
        Country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </label>
      <br />

      <label>
        User Type:
        <select name="user_type" value={formData.user_type} onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
      </label>
      <br />

      {formData.user_type === 'Teacher' && (
        <label>
          Teacher Department:
          <input type="text" name="teacher_dept" value={formData.teacher_dept} onChange={handleChange} />
        </label>
      )}
      
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;