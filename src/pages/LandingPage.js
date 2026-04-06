import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <Background />
      <Nav>
        <NavContainer>
          <Logo>FitPro</Logo>
          <GetStartedBtn onClick={() => navigate('/auth')}>Get Started</GetStartedBtn>
        </NavContainer>
      </Nav>
      
      <HeroContent>
        <HeroText
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroTitle>Transform Your Body,<br/>Transform Your Life</HeroTitle>
          <HeroSubtitle>
            AI-powered fitness tracking, personalized meal plans, and expert training programs tailored just for you.
          </HeroSubtitle>
          <PrimaryBtn onClick={() => navigate('/auth')}>Start Your Journey</PrimaryBtn>
        </HeroText>
        
        <FeaturesGrid
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeatureCard data-aos="fade-up">
            <FeatureIcon>🎯</FeatureIcon>
            <h3>Personalized Plans</h3>
            <p>Custom workouts and nutrition based on your goals</p>
          </FeatureCard>
          <FeatureCard data-aos="fade-up" data-aos-delay="100">
            <FeatureIcon>📸</FeatureIcon>
            <h3>Photo Tracking</h3>
            <p>AI-powered meal analysis from photos</p>
          </FeatureCard>
          <FeatureCard data-aos="fade-up" data-aos-delay="200">
            <FeatureIcon>💪</FeatureIcon>
            <h3>Expert Training</h3>
            <p>Access to diverse training methodologies</p>
          </FeatureCard>
          <FeatureCard data-aos="fade-up" data-aos-delay="300">
            <FeatureIcon>📊</FeatureIcon>
            <h3>Progress Analytics</h3>
            <p>Track your transformation journey</p>
          </FeatureCard>
        </FeaturesGrid>
      </HeroContent>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  min-height: 100vh;
  position: relative;
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
      radial-gradient(circle at 80% 80%, rgba(252, 70, 107, 0.3), transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.3), transparent 50%);
    animation: gradientShift 15s ease infinite;
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GetStartedBtn = styled.button`
  padding: 0.875rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroText = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PrimaryBtn = styled.button`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export default LandingPage;
