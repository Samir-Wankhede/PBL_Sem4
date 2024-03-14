import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './login.css';
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [user,setUser] = useState({
    email:"",password:"",
  });

const navigate=useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev)=>{
      return({
        ...prev,
        [name]:value,
      })
    })
  }

  function handleForm(e) {
    e.preventDefault();
    fetch('users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.redirect === "/login"){
          alert(data.message);
          setUser({
            email:"",password:"",
          });
        }else{
          navigate(data.redirect);
        }
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
          <input value={user.email} type="text" name="email" placeholder="Email" required="" onChange={handleChange} />
        </div>
        <div className="row">
          <i className="fa-solid fa-heart" />
          <input value={user.password} type="password" name="password" placeholder="Password" required="" onChange={handleChange} />
        </div>
        <div className="pass">
          <a href="#">Forgot password?</a>
        </div>
        <div className="row button">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <Link to="/register">Signup Now</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;



