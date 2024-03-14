import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './registration.css'
function RegistrationPage() {
  
  const [user,setUser] = useState({
    name:"", email:"", reg_id:"", password:"", confirmation_password:"", gender:""
  });

  function handleChange(event){
    const {name,value} = event.target;
    setUser((prevState)=>{
      return ({
        ...prevState,
        [name]: value,
      })
    })
  }

  function handleClick(e){
    const value = e.target.value;
    setUser((prevState)=>{
      return({
        ...prevState,
        gender: value,
      })
    })
  }
  
  const navigate=useNavigate();
  ////
  function handleForm (e) {
    e.preventDefault();
    fetch('/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.redirect === "/register"){
          setUser((prev)=>{
            return({
              ...prev,
              password:"", confirmation_password:"",
            })
          });
          alert(data.message);
        }else if (data.redirect === "/login"){
          alert(data.message);
          navigate(data.redirect);
        }else{
          navigate(data.redirect);
        }
      
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  return (
    <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form onSubmit={handleForm}>
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input type="text" name="name" placeholder="Enter your name" value={user.name} onChange={handleChange}required/>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="email" name="email" placeholder="Enter your email" value={user.email} onChange={handleChange} required/>
          </div>
          <div class="input-box">
            <span class="details">Registration ID</span>
            <input type="text" name="reg_id" placeholder="Enter your Registration id" value={user.reg_id} onChange={handleChange} required/>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" name="password" placeholder="Enter your password" value={user.password} onChange={handleChange} required/>
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="password" name="confirmation_password" placeholder="Confirm your password" value={user.confirmation_password} onChange={handleChange} required/>
          </div>
        </div>
        <div class="gender-details">
          <input type="radio" name="gender" value="Male" id="dot-1" onClick={handleClick}/>
          <input type="radio" name="gender" value="Female" id="dot-2" onClick={handleClick}/>
          <input type="radio" name="gender" value="Prefer not to say" id="dot-3" onClick={handleClick}/>
          <span class="gender-title">Gender</span>
          <div class="category">
            <label for="dot-1">
            <span class="dot one"></span>
            <span class="gender">Male</span>
          </label>
          <label for="dot-2">
            <span class="dot two"></span>
            <span class="gender">Female</span>
          </label>
          <label for="dot-3">
            <span class="dot three"></span>
            <span class="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="register" />
        </div>
      </form>
    </div>
  </div>
  )
}

export default RegistrationPage
