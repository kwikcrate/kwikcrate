import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/users/login`, { email, password });
      localStorage.setItem('userToken', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${apiUrl}/users/google-login`, {
        credential: credentialResponse.credential,
      });
      localStorage.setItem('userToken', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed');
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-sm mb-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>

          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 bg-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 bg-gray-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full py-2 rounded"
          >
            Login
          </button>
        </form>

        <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="mb-4 text-sm">Or login with</p>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError('Google login failed')} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserLogin;
