import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { setUserSession } from './utils/common';

// password: '123456',
// username: 'sarasadot',

function Login(props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // props.history.push('/dashboard');
    setLoading(true);
    setError(null);
    axios
      .post('http://localhost:5001/users/signin', {
        username,
        password,
      })
      .then((res) => {
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        props.history.push('/dashboard');

        console.log('response=', res);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400 || error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          setError('Something went wrong. Please try again later.');
        }
        console.log('error=', error);
      });
  };
  return (
    <div>
      <p>Login</p>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <Error>{error}</Error>}
      <div>
        <button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Login;

const Error = styled.div`
  color: red;
  margin: 10px 0;
`;
