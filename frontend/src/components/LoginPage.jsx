import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './login.css';
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

const navigate=useNavigate();
  function handleChange(e) {

    const { name, value } = e.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  function handleForm(e) {
    e.preventDefault();
    const userData = {
      userId: userId,
      password: password
    };
    fetch('/api/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        
        navigate(data.redirect);
      
      })
      .catch(error => {
        console.error('Error:', error);
      });
  


  }

  return (
    <div className="heading">
      <div className="title">
        <span>Student Login</span>
      </div>
      <form onSubmit={handleForm}>
        <div className="row">
          <i className="fa-regular fa-heart" />
          <input type="text" name="userId" placeholder="Email or Phone" required="" onChange={handleChange} />
        </div>
        <div className="row">
          <i className="fa-solid fa-heart" />
          <input type="password" name="password" placeholder="Password" required="" onChange={handleChange} />
        </div>
        <div className="pass">
          <a href="#">Forgot password?</a>
        </div>
        <div className="row button">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <Link to="/signup">Signup Now</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;



