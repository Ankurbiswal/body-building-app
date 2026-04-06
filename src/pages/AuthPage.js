import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, setUserData, setCurrentUser } = useApp();
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem('fitpro_user_' + loginEmail);
    if (savedUser) {
      login(loginEmail);
      navigate('/dashboard');
    } else {
      alert('User not found. Please sign up first.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setCurrentUser(signupEmail);
    setUserData({ name: signupName, email: signupEmail });
    navigate('/onboarding');
  };

  return (
    <AuthContainer>
      <Background />
      <AuthBox
        as={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AuthTabs>
          <AuthTab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Login
          </AuthTab>
          <AuthTab 
            active={activeTab === 'signup'} 
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </AuthTab>
        </AuthTabs>

        {activeTab === 'login' ? (
          <AuthForm onSubmit={handleLogin}>
            <h2>Welcome Back</h2>
            <FormGroup>
              <Input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </FormGroup>
            <SubmitBtn type="submit">Login</SubmitBtn>
            <AuthLink>
              Don't have an account? <span onClick={() => setActiveTab('signup')}>Sign up</span>
            </AuthLink>
          </AuthForm>
        ) : (
          <AuthForm onSubmit={handleSignup}>
            <h2>Create Account</h2>
            <FormGroup>
              <Input
                type="text"
                placeholder="Full Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </FormGroup>
            <SubmitBtn type="submit">Sign Up</SubmitBtn>
            <AuthLink>
              Already have an account? <span onClick={() => setActiveTab('login')}>Login</span>
            </AuthLink>
          </AuthForm>
        )}
      </AuthBox>
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(252, 70, 107, 0.3), transparent 50%);
    animation: gradientShift 15s ease infinite;
  }
`;

const AuthBox = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const AuthTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AuthTab = styled.button`
  flex: 1;
  padding: 0.875rem;
  background: transparent;
  border: none;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#6366f1' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: white;
  }
`;

const AuthForm = styled.form`
  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: #6366f1;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
  }
`;

const AuthLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.8);

  span {
    color: #6366f1;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #8b5cf6;
    }
  }
`;

export default AuthPage;
