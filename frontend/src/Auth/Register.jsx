import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import logo from '../images/logo.jpeg';
import photo1 from "../images/download7.png";
import photo2 from "../images/download8.png";
import photo3 from "../images/download9.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!newUser.username) return setError("Username should not be empty");
    if (!newUser.email) return setError("Email should not be empty");
    if (newUser.password.length < 8) return setError("Password should have at least 8 characters!");

    try {
      const res = await axios.post('http://localhost:5000/api/users/register/', newUser);
      console.log("User created:", res.data);
      navigate('/profile');
    } catch (err) {
      // console.log("User not created:", err);
      setError("User not created");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="logo-header">
          <img src={logo} width="40" height="40" alt="logo" />
          <span>Amla Shop</span>
        </div>

        <h2>Sign Up</h2>
        <p className="form-subtext">Please fill your details to create an account.</p>

        <label>Username *</label>
        <input type="text" name="username" value={newUser.username} onChange={handleChange} placeholder="Enter username" />

        <label>Email *</label>
        <input type="text" name="email" value={newUser.email} onChange={handleChange} placeholder="Enter Email Address" />

        <label>Password *</label>
        <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Enter Password" />

        {error && <p className="error">{error}</p>}

        <button className="submit-btn" onClick={handleSubmit}>Sign Up</button>

        <p className="login-link">
          Already have an account? <a href="/profile">Sign In</a>
        </p>
      </div>

      <div className="register-carousel">
        <Carousel fade indicators={false}>
          {[photo1, photo2, photo3].map((photo, index) => (
            <Carousel.Item key={index}>
              <img src={photo} className="d-block w-100" alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Register;
