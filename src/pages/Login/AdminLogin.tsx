import React, { useState } from 'react';
import { CustomTextField, CustomButton } from '../../components/components';
import { loginAnimation } from '../../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/adminApi';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
      console.log('Login successful');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="flex justify-center items-center h-screen w-1/2 left-0 pl-10">
        <img src={loginAnimation} alt="Login page" className="w-3/4 h-3/4" />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-4xl font-[400] mb-6">StyleSync Admin</h1>
        <h1 className="text-2xl font-semibold mb-4 text-secondary">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <p className="block text-font_secondary mb-2">Email</p>
            <CustomTextField
              id="email"
              name="Email"
              value={email}
              width="450px"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <p className="block text-font_secondary mb-2">Password</p>
            <CustomTextField
              id="password"
              name="Password"
              width="450px"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <CustomButton type="submit" children="Login" fontSize="16px" bold="600" textColor="white" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
