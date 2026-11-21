import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Auth/UserContext";
import logo from "../images/logo.jpeg";
import { Carousel } from "react-bootstrap";
import photo1 from "../images/download7.png";
import photo2 from "../images/download8.png";
import photo3 from "../images/download9.png";
import "../css/profile.css"; 

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      setUserInfo(res.data);
      if (res.data.role === "admin") nav("/create");
      else nav("/");
    } catch (err) {
      // console.log("Login error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="brand">
          <img src={logo} width="40" height="40" alt="logo" />
          <span className="brand-name">Amla Shop</span>
        </div>

        <h2>Sign In</h2>
        <p className="subtitle">Please fill your details to access your account.</p>

        <label>Email *</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
        />

        <label>Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <div className="options">
          
          <a href="/forgot" className="forgot-password">Forgot Password?</a>
        </div>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Sign In</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <a href="/register">Sign Up</a>
        </p>
      </div>
      <div className="profile-carousel">
        <Carousel fade indicators={false} controls={false} interval={2500}>
          {[photo1, photo2, photo3].map((photo, index) => (
            <Carousel.Item key={index}>
              <img src={photo} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Profile;
