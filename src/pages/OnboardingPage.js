import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    targetWeight: '',
    goal: '',
    activityLevel: '',
    injuries: false,
    injuryDetails: '',
    conditions: false,
    conditionDetails: ''
  });

  const updateProgress = () => {
    return (step / 4) * 100;
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
    setTimeout(() => setStep(2), 300);
  };

  const handleGoalSelect = (goal) => {
    setFormData({ ...formData, goal });
    setTimeout(() => setStep(4), 300);
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleComplete = () => {
    const completeData = { ...userData, ...formData };
    setUserData(completeData);
    localStorage.setItem('fitpro_user_' + currentUser, JSON.stringify(completeData));
    navigate('/dashboard');
  };

  return (
    <OnboardingContainer>
      <Background />
      <OnboardingContent>
        <ProgressBar>
          <ProgressFill style={{ width: `${updateProgress()}%` }} />
        </ProgressBar>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepContainer
              key="step1"
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepTitle>What's your gender?</StepTitle>
              <StepSubtitle>Help us personalize your experience</StepSubtitle>
              <OptionsGrid>
                <OptionCard onClick={() => handleGenderSelect('male')}>
                  <OptionIcon>👨</OptionIcon>
                  <span>Male</span>
                </OptionCard>
                <OptionCard onClick={() => handleGenderSelect('female')}>
                  <OptionIcon>👩</OptionIcon>
                  <span>Female</span>
                </OptionCard>
                <OptionCard onClick={() => handleGenderSelect('non-binary')}>
                  <OptionIcon>🧑</OptionIcon>
                  <span>Non-Binary</span>
                </OptionCard>
                <OptionCard onClick={() => handleGenderSelect('prefer-not-to-say')}>
                  <OptionIcon>👤</OptionIcon>
                  <span>Prefer Not to Say</span>
                </OptionCard>
              </OptionsGrid>
            </StepContainer>
          )}

          {step === 2 && (
            <StepContainer
              key="step2"
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepTitle>Tell us about yourself</StepTitle>
              <StepSubtitle>This helps us create your perfect plan</StepSubtitle>
              <StatsForm onSubmit={handleStatsSubmit}>
                <FormRow>
                  <FormGroup>
                    <label>Age</label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Height (cm)</label>
                    <Input
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <label>Current Weight (kg)</label>
                    <Input
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Target Weight (kg)</label>
                    <Input
                      type="number"
                      placeholder="65"
                      value={formData.targetWeight}
                      onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <SubmitBtn type="submit">Continue</SubmitBtn>
              </StatsForm>
            </StepContainer>
          )}

          {step === 3 && (
            <StepContainer
              key="step3"
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepTitle>What's your primary goal?</StepTitle>
              <StepSubtitle>We'll customize everything for you</StepSubtitle>
              <GoalGrid>
                <GoalCard onClick={() => handleGoalSelect('fat-loss')}>
                  <OptionIcon>🔥</OptionIcon>
                  <h3>Fat Loss</h3>
                  <p>Burn fat and get lean</p>
                </GoalCard>
                <GoalCard onClick={() => handleGoalSelect('muscle-gain')}>
                  <OptionIcon>💪</OptionIcon>
                  <h3>Muscle Gain</h3>
                  <p>Build size and strength</p>
                </GoalCard>
                <GoalCard onClick={() => handleGoalSelect('recomp')}>
                  <OptionIcon>⚖️</OptionIcon>
                  <h3>Body Recomp</h3>
                  <p>Lose fat, gain muscle</p>
                </GoalCard>
                <GoalCard onClick={() => handleGoalSelect('maintenance')}>
                  <OptionIcon>🎯</OptionIcon>
                  <h3>Maintenance</h3>
                  <p>Stay fit and healthy</p>
                </GoalCard>
              </GoalGrid>
            </StepContainer>
          )}

          {step === 4 && (
            <StepContainer
              key="step4"
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepTitle>Health & Safety Check</StepTitle>
              <StepSubtitle>Your safety is our priority</StepSubtitle>
              <HealthForm>
                <HealthQuestion>
                  <label>Current activity level?</label>
                  <Select
                    value={formData.activityLevel}
                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                    required
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary (little/no exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="very-active">Very Active (athlete)</option>
                  </Select>
                </HealthQuestion>
                <SubmitBtn type="button" onClick={handleComplete}>Complete Setup</SubmitBtn>
              </HealthForm>
            </StepContainer>
          )}
        </AnimatePresence>
      </OnboardingContent>
    </OnboardingContainer>
  );
};

const OnboardingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const OnboardingContent = styled.div`
  max-width: 800px;
  width: 100%;
`;

const ProgressBar = styled.div`
  height: 8px;
  border-radius: 10px;
  margin-bottom: 3rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: width 0.5s ease;
`;

const StepContainer = styled.div`
  padding: 3rem;
  border-radius: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const StepTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StepSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const OptionCard = styled.div`
  padding: 2rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 2px solid transparent;

  &:hover {
    border-color: #6366f1;
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  span {
    display: block;
    margin-top: 1rem;
    font-weight: 600;
  }
`;

const OptionIcon = styled.div`
  font-size: 3rem;
`;

const StatsForm = styled.form`
  text-align: left;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: #6366f1;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: #6366f1;
  }

  option {
    background: #1a1a2e;
    color: white;
  }
`;

const GoalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const GoalCard = styled(OptionCard)`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const HealthForm = styled.div`
  text-align: left;
`;

const HealthQuestion = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
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
  margin-top: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
  }
`;

export default OnboardingPage;
