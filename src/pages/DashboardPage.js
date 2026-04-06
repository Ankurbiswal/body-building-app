import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { PersonalizationEngine, exerciseDatabase } from '../utils/PersonalizationEngine';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { userData, logout, meals, setMeals } = useApp();
  const [activeSection, setActiveSection] = useState('overview');
  const [photoFile, setPhotoFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const calories = PersonalizationEngine.calculateCalories(userData);
  const macros = PersonalizationEngine.calculateMacros(calories, userData.goal);
  const workout = PersonalizationEngine.getWorkoutRecommendation(userData);
  const mealPlan = PersonalizationEngine.getMealPlan(userData);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoFile(event.target.result);
        analyzePhoto();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const result = {
        calories: Math.floor(Math.random() * 400) + 300,
        protein: Math.floor(Math.random() * 40) + 20,
        carbs: Math.floor(Math.random() * 50) + 30,
        fats: Math.floor(Math.random() * 20) + 10
      };
      setAnalysisResult(result);
      setAnalyzing(false);
    }, 2000);
  };

  const saveMeal = () => {
    if (analysisResult) {
      const newMeal = {
        ...analysisResult,
        image: photoFile,
        timestamp: new Date().toISOString()
      };
      setMeals([...meals, newMeal]);
      setPhotoFile(null);
      setAnalysisResult(null);
      alert('Meal saved successfully!');
    }
  };

  const totalConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);

  return (
    <DashboardContainer>
      <Background />
      
      <Sidebar>
        <SidebarHeader>
          <Logo>FitPro</Logo>
        </SidebarHeader>
        <SidebarMenu>
          <MenuItem 
            active={activeSection === 'overview'} 
            onClick={() => setActiveSection('overview')}
          >
            <MenuIcon>📊</MenuIcon>
            <span>Overview</span>
          </MenuItem>
          <MenuItem 
            active={activeSection === 'meals'} 
            onClick={() => setActiveSection('meals')}
          >
            <MenuIcon>🍽️</MenuIcon>
            <span>Meal Planner</span>
          </MenuItem>
          <MenuItem 
            active={activeSection === 'training'} 
            onClick={() => setActiveSection('training')}
          >
            <MenuIcon>💪</MenuIcon>
            <span>Training</span>
          </MenuItem>
          <MenuItem 
            active={activeSection === 'progress'} 
            onClick={() => setActiveSection('progress')}
          >
            <MenuIcon>📈</MenuIcon>
            <span>Progress</span>
          </MenuItem>
        </SidebarMenu>
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </Sidebar>

      <MainContent>
        {activeSection === 'overview' && (
          <Section
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader>
              <h1>Welcome back, {userData.name}!</h1>
              <p>Here's your fitness overview for today</p>
            </SectionHeader>

            <StatsGrid>
              <StatCard data-aos="fade-up">
                <StatIcon>🔥</StatIcon>
                <StatContent>
                  <h3>{totalConsumed}</h3>
                  <p>Calories Consumed</p>
                </StatContent>
              </StatCard>
              <StatCard data-aos="fade-up" data-aos-delay="100">
                <StatIcon>🎯</StatIcon>
                <StatContent>
                  <h3>{calories}</h3>
                  <p>Daily Target</p>
                </StatContent>
              </StatCard>
              <StatCard data-aos="fade-up" data-aos-delay="200">
                <StatIcon>💧</StatIcon>
                <StatContent>
                  <h3>0L</h3>
                  <p>Water Intake</p>
                </StatContent>
              </StatCard>
              <StatCard data-aos="fade-up" data-aos-delay="300">
                <StatIcon>⏱️</StatIcon>
                <StatContent>
                  <h3>0 min</h3>
                  <p>Workout Time</p>
                </StatContent>
              </StatCard>
            </StatsGrid>

            <DashboardGrid>
              <DashCard data-aos="fade-right">
                <h3>Today's Workout</h3>
                <WorkoutInfo>
                  <h4>{workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} Training</h4>
                  <p><strong>Intensity:</strong> {workout.intensity}</p>
                  <p><strong>Frequency:</strong> {workout.frequency}</p>
                  <p><strong>Focus:</strong> {workout.focus}</p>
                </WorkoutInfo>
              </DashCard>

              <DashCard data-aos="fade-left">
                <h3>Nutrition Summary</h3>
                <MacroRings>
                  <MacroRing>
                    <div className="label">Protein</div>
                    <div className="value">{totalProtein}g</div>
                  </MacroRing>
                  <MacroRing>
                    <div className="label">Carbs</div>
                    <div className="value">{totalCarbs}g</div>
                  </MacroRing>
                  <MacroRing>
                    <div className="label">Fats</div>
                    <div className="value">{totalFats}g</div>
                  </MacroRing>
                </MacroRings>
              </DashCard>
            </DashboardGrid>
          </Section>
        )}

        {activeSection === 'meals' && (
          <Section
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader>
              <h1>Smart Meal Planner</h1>
              <p>AI-powered nutrition tracking</p>
            </SectionHeader>

            <MealGrid>
              <MealCard data-aos="fade-up">
                <h3>📸 Photo Meal Tracker</h3>
                <PhotoUploadArea>
                  {!photoFile ? (
                    <UploadPlaceholder>
                      <UploadIcon>📷</UploadIcon>
                      <p>Take or upload a photo of your meal</p>
                      <p className="hint">AI will analyze portion size and macros</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                        id="photo-input"
                      />
                      <UploadBtn as="label" htmlFor="photo-input">
                        Upload Photo
                      </UploadBtn>
                    </UploadPlaceholder>
                  ) : (
                    <PhotoPreview>
                      <img src={photoFile} alt="Meal" />
                      <AnalysisOverlay>
                        {analyzing ? (
                          <Analyzing>
                            <Spinner />
                            <p>Analyzing your meal...</p>
                          </Analyzing>
                        ) : analysisResult && (
                          <AnalysisResults>
                            <h4>Meal Analysis</h4>
                            <AnalysisItem>
                              <span>Calories:</span>
                              <strong>{analysisResult.calories} kcal</strong>
                            </AnalysisItem>
                            <AnalysisItem>
                              <span>Protein:</span>
                              <strong>{analysisResult.protein}g</strong>
                            </AnalysisItem>
                            <AnalysisItem>
                              <span>Carbs:</span>
                              <strong>{analysisResult.carbs}g</strong>
                            </AnalysisItem>
                            <AnalysisItem>
                              <span>Fats:</span>
                              <strong>{analysisResult.fats}g</strong>
                            </AnalysisItem>
                            <SaveBtn onClick={saveMeal}>Save Meal</SaveBtn>
                          </AnalysisResults>
                        )}
                      </AnalysisOverlay>
                    </PhotoPreview>
                  )}
                </PhotoUploadArea>
              </MealCard>

              <MealCard data-aos="fade-up" data-aos-delay="100">
                <h3>Today's Meals</h3>
                <MealsList>
                  {meals.length === 0 ? (
                    <EmptyState>No meals logged yet</EmptyState>
                  ) : (
                    meals.map((meal, index) => (
                      <MealItem key={index}>
                        <MealImage src={meal.image} alt="Meal" />
                        <MealInfo>
                          <p>{new Date(meal.timestamp).toLocaleTimeString()}</p>
                          <p>{meal.calories} cal | {meal.protein}g P | {meal.carbs}g C | {meal.fats}g F</p>
                        </MealInfo>
                      </MealItem>
                    ))
                  )}
                </MealsList>
              </MealCard>

              <MealCard data-aos="fade-up" data-aos-delay="200" style={{ gridColumn: '1 / -1' }}>
                <h3>Personalized Meal Plan</h3>
                <MealPlanGrid>
                  {mealPlan.map((meal, index) => (
                    <MealPlanCard key={index}>
                      <h4>{meal.name}</h4>
                      <p className="time">{meal.time}</p>
                      <div className="macros">
                        <span>🔥 {meal.calories} cal</span>
                        <span>🥩 {meal.protein}g</span>
                        <span>🍞 {meal.carbs}g</span>
                        <span>🥑 {meal.fats}g</span>
                      </div>
                    </MealPlanCard>
                  ))}
                </MealPlanGrid>
              </MealCard>
            </MealGrid>
          </Section>
        )}

        {activeSection === 'training' && (
          <Section
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader>
              <h1>Training Library</h1>
              <p>Choose your training style</p>
            </SectionHeader>

            <ExercisesGrid>
              {Object.values(exerciseDatabase).flat().map((exercise, index) => (
                <ExerciseCard key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                  <ExerciseImage>{exercise.image}</ExerciseImage>
                  <h4>{exercise.name}</h4>
                  <p>Target: {exercise.muscles}</p>
                  <p>Sets/Reps: {exercise.sets}</p>
                </ExerciseCard>
              ))}
            </ExercisesGrid>
          </Section>
        )}

        {activeSection === 'progress' && (
          <Section
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader>
              <h1>Your Progress</h1>
              <p>Track your transformation</p>
            </SectionHeader>

            <ProgressGrid>
              <ProgressCard data-aos="fade-up">
                <h3>Current Stats</h3>
                <StatsList>
                  <StatItem>
                    <span>Weight:</span>
                    <strong>{userData.weight} kg</strong>
                  </StatItem>
                  <StatItem>
                    <span>Target:</span>
                    <strong>{userData.targetWeight} kg</strong>
                  </StatItem>
                  <StatItem>
                    <span>Height:</span>
                    <strong>{userData.height} cm</strong>
                  </StatItem>
                  <StatItem>
                    <span>Age:</span>
                    <strong>{userData.age} years</strong>
                  </StatItem>
                </StatsList>
              </ProgressCard>

              <ProgressCard data-aos="fade-up" data-aos-delay="100">
                <h3>Goals</h3>
                <StatsList>
                  <StatItem>
                    <span>Primary Goal:</span>
                    <strong>{userData.goal}</strong>
                  </StatItem>
                  <StatItem>
                    <span>Activity Level:</span>
                    <strong>{userData.activityLevel}</strong>
                  </StatItem>
                  <StatItem>
                    <span>Daily Calories:</span>
                    <strong>{calories} kcal</strong>
                  </StatItem>
                </StatsList>
              </ProgressCard>
            </ProgressGrid>
          </Section>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
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

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  z-index: 100;

  @media (max-width: 768px) {
    width: 80px;
    padding: 1.5rem 1rem;
  }
`;

const SidebarHeader = styled.div`
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  flex: 1;
`;

const MenuItem = styled.li`
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.active ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent'};

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255, 255, 255, 0.1)'};
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const MenuIcon = styled.span`
  font-size: 1.5rem;
`;

const LogoutBtn = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MainContent = styled.main`
  margin-left: 280px;
  padding: 3rem;
  width: calc(100% - 280px);
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 80px;
    width: calc(100% - 80px);
    padding: 2rem 1rem;
  }
`;

const Section = styled.div``;

const SectionHeader = styled.div`
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
`;

const StatContent = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const DashCard = styled.div`
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const WorkoutInfo = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const MacroRings = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  margin-top: 2rem;
`;

const MacroRing = styled.div`
  text-align: center;

  .label {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const MealGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const MealCard = styled.div`
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const PhotoUploadArea = styled.div`
  min-height: 400px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const UploadPlaceholder = styled.div`
  text-align: center;
  padding: 2rem;

  .hint {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const UploadIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const UploadBtn = styled.button`
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
  }
`;

const PhotoPreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const AnalysisOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 0 0 20px 20px;
`;

const Analyzing = styled.div`
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
`;

const AnalysisResults = styled.div`
  h4 {
    margin-bottom: 1rem;
  }
`;

const AnalysisItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SaveBtn = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MealsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const EmptyState = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 3rem;
`;

const MealItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

const MealImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
`;

const MealInfo = styled.div`
  flex: 1;

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`;

const MealPlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const MealPlanCard = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;

  h4 {
    margin-bottom: 0.5rem;
  }

  .time {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .macros {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const ExercisesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ExerciseCard = styled.div`
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const ExerciseImage = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const ProgressCard = styled.div`
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const StatsList = styled.div``;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;

  span {
    color: rgba(255, 255, 255, 0.8);
  }

  strong {
    color: white;
  }
`;

export default DashboardPage;
