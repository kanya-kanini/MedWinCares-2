import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import './Login.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (role === 'admin') {
        if (username === 'Shana' && password === 'Shana123') {
          window.location.href = '/admindash';
          setUsername('');
          setPassword('');
          setError('');
          return;
        } else {
          throw new Error('Invalid username or password');
        }
      } else if (role === 'doctor') {
        response = await axios.post('https://localhost:7089/api/Authorize/Doctor', {
          Username: username,
          Password: password
        });
      } else {
        throw new Error('Invalid role');
      }

      const token = response.data;
      localStorage.setItem('username',username)
      localStorage.setItem('token', token);

      if (role === 'doctor') {
        window.location.href = '/doctordashboard';
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  // Array of social media platforms and their background colors
  const socialMediaPlatforms = [
    { name: 'Google', color: '#DB4437' },
    { name: 'Facebook', color: '#4267B2' },
    { name: 'Twitter', color: '#1DA1F2' },
  ];

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>

      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={(e, newRole) => setRole(newRole)}
        className="role-toggle"
      >
        <ToggleButton value="admin">Admin</ToggleButton>
        <ToggleButton value="doctor">Doctor</ToggleButton>
      </ToggleButtonGroup>
      {error && <p className="error">{error}</p>}
      <Button type="submit" variant="contained">
        Login
      </Button>

      {/* Additional Features */}
      <div className="additional-features">
        <div className="password-toggle">
          <input
            type="checkbox"
            id="password-toggle"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="password-toggle">Show Password</label>
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <a href="/forgotpassword" className="forgot-password-link">
          Forgot Password?
        </a>
        <div className="social-media-login">
          {socialMediaPlatforms.map((platform) => (
            <button
              className="social-media-button"
              style={{ backgroundColor: platform.color }}
              key={platform.name}
            >
              {platform.name}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Login;