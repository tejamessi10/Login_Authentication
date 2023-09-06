import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from './features/userSlice';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.data.Status === 'success') {
          localStorage.setItem('username', res.data.token);

          navigate('/Logout');
        } else {
          alert('error');
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err.message);
        }
      });
  };
  return (
    <>
      <div className="login-container">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                id="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                }}
              />
              <br />
              <button className="signin-button">Log In</button>
              <Link to="/register" className="register-redirect">
                Don't have an account? Sign-up
              </Link>
            </div>
          </form>
        </div>
        <div className="greeting">
          <div className="greet">
            <span>Hey</span>
            <br />
            <span>Welcome</span>
            <br />
            <span>Back</span>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
