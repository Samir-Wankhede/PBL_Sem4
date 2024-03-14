import React from 'react'
import { Link } from 'react-router-dom'
import './homestyle.css'
function Home() {
  return (
    <>
    <header className="header">
      <nav className="navbar">
        <h2 className="logo">
          <a href="#">PblProject</a>
        </h2>
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" id="hamburger-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            viewBox="0 0 24 24"
            width={24}
          >
            <path
              d="M3 12h18M3 6h18M3 18h18"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </label>
        <ul className="links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
         
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
        <div className="buttons">
        <Link to="/login">Sign In</Link>
          
            
        
          <Link to="signup">Sign Up</Link>
            
         
        </div>
      </nav>
    </header>
    <section className="hero-section">
      <div className="hero">
        <h2>Student analysis and assessment system</h2>
        <p>
         

        Welcome to our Student Analysis System website, your platform for real-time student performance insights. Track attendance, grades, and achievements effortlessly with our intuitive dashboard and customizable reports. Stay informed with automated notifications for proactive support.
        </p>
        <div className="buttons">
        <Link className='join'to="signup">Join Now</Link>
      <Link className='learn'>Learn More</Link>
        </div>
      </div>
      <div className="img">
        <img
          src="https://img.freepik.com/free-vector/people-checking-giant-check-list-background_23-2148085776.jpg?w=1380&t=st=1709562652~exp=1709563252~hmac=f0c79c76c251907186cbaded9da72be282ab6f0d024eae32793a04986294164f"
          
        />
      </div>
    </section>
  </>
  
  )
}

export default Home
