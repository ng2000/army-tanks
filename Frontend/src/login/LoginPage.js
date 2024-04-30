import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedIsLoggedIn === 'true');
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };

  // If user is already logged in, redirect to "/"
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{minHeight:'80vh', padding:'10px'}}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login Page</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleLogin} style={styles.button}>Login</button>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    display: 'block',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
};

export default LoginPage;
