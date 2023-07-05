import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Link, FormControlLabel, Checkbox } from '@mui/material';
import './PatientLogin.css';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7010/api/Login/Patient', {
        Username: username,
        Password: password
      });

      const token = response.data;

      window.location.href = '/PatientLanding';
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
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
        <FormControlLabel
          control={<Checkbox checked={showPassword} onChange={toggleShowPassword} />}
          label="Show Password"
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link href="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default PatientLogin;
