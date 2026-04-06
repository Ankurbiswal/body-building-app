import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
    targetWeight: 0,
    goal: '',
    activityLevel: '',
    injuries: false,
    injuryDetails: '',
    conditions: false,
    conditionDetails: ''
  });
  const [meals, setMeals] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [progress, setProgress] = useState([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const lastUser = localStorage.getItem('fitpro_last_user');
    if (lastUser) {
      const savedUser = localStorage.getItem('fitpro_user_' + lastUser);
      if (savedUser) {
        setUserData(JSON.parse(savedUser));
        setCurrentUser(lastUser);
        loadUserMeals(lastUser);
      }
    }
  }, []);

  const loadUserMeals = (email) => {
    const savedMeals = localStorage.getItem('fitpro_meals_' + email);
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
  };

  const saveUserData = (data) => {
    setUserData(data);
    if (currentUser) {
      localStorage.setItem('fitpro_user_' + currentUser, JSON.stringify(data));
      localStorage.setItem('fitpro_last_user', currentUser);
    }
  };

  const saveMeals = (mealsData) => {
    setMeals(mealsData);
    if (currentUser) {
      localStorage.setItem('fitpro_meals_' + currentUser, JSON.stringify(mealsData));
    }
  };

  const login = (email) => {
    setCurrentUser(email);
    localStorage.setItem('fitpro_last_user', email);
    const savedUser = localStorage.getItem('fitpro_user_' + email);
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      loadUserMeals(email);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserData({
      name: '',
      email: '',
      gender: '',
      age: 0,
      height: 0,
      weight: 0,
      targetWeight: 0,
      goal: '',
      activityLevel: '',
      injuries: false,
      injuryDetails: '',
      conditions: false,
      conditionDetails: ''
    });
    setMeals([]);
    setExercises([]);
    setProgress([]);
    localStorage.removeItem('fitpro_last_user');
  };

  const value = {
    currentUser,
    userData,
    meals,
    exercises,
    progress,
    setCurrentUser,
    setUserData: saveUserData,
    setMeals: saveMeals,
    setExercises,
    setProgress,
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
