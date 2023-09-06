import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
function Home() {
  return (
    <div className="home">
      <p className="wel">Welcome</p>
      <Link className="login-link link" to="/login">
        Log in{' '}
      </Link>
      <span> or </span>
      <Link className="register-link link" to="/register">
        Sign up
      </Link>
    </div>
  );
}
export default Home;
