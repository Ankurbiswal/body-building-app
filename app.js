// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// State Management
const appState = {
    currentUser: null,
    currentSection: 'landing-page',
    currentDashboardSection: 'overview',
    onboardingStep: 1,
    userData: {
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
    },
    meals: [],
    exercises: [],
    progress: []
};

// Exercise Database
const exerciseDatabase = {
    hybrid: [
        { name: 'Barbell Squat to Press', muscles: 'Full Body', sets: '4x8', image: '🏋️' },
        { name: 'Deadlift to Row', muscles: 'Back, Legs', sets: '4x6', image: '💪' },
        { name: 'Clean and Press', muscles: 'Full Body', sets: '3x8', image: '🏋️' },
        { name: 'Burpee Pull-ups', muscles: 'Full Body', sets: '3x10', image: '🤸' }
    ],
    hypertrophy: [
        { name: 'Dumbbell Bench Press', muscles: 'Chest', sets: '4x10-12', image: '💪' },
        { name: 'Lat Pulldowns', muscles: 'Back', sets: '4x10-12', image: '🏋️' },
        { name: 'Leg Press', muscles: 'Legs', sets: '4x12-15', image: '🦵' },
        { name: 'Shoulder Press', muscles: 'Shoulders', sets: '4x10-12', image: '💪' },
        { name: 'Bicep Curls', muscles: 'Arms', sets: '3x12-15', image: '💪' },
        { name: 'Tricep Extensions', muscles: 'Arms', sets: '3x12-15', image: '💪' }
    ],
    strength: [
        { name: 'Barbell Squat', muscles: 'Legs', sets: '5x5', image: '🏋️' },
        { name: 'Deadlift', muscles: 'Back, Legs', sets: '5x3', image: '💪' },
        { name: 'Bench Press', muscles: 'Chest', sets: '5x5', image: '🏋️' },
        { name: 'Overhead Press', muscles: 'Shoulders', sets: '5x5', image: '💪' },
        { name: 'Barbell Row', muscles: 'Back', sets: '5x5', image: '🏋️' }
    ],
    'relative-strength': [
        { name: 'Pull-ups', muscles: 'Back, Arms', sets: '4x8-10', image: '🤸' },
        { name: 'Dips', muscles: 'Chest, Triceps', sets: '4x8-10', image: '💪' },
        { name: 'Pistol Squats', muscles: 'Legs', sets: '3x8 each', image: '🦵' },
        { name: 'Handstand Push-ups', muscles: 'Shoulders', sets: '3x5-8', image: '🤸' },
        { name: 'L-Sit Holds', muscles: 'Core', sets: '3x30s', image: '🧘' }
    ],
    endurance: [
        { name: 'Running', muscles: 'Cardio', sets: '30-45 min', image: '🏃' },
        { name: 'Cycling', muscles: 'Cardio, Legs', sets: '45-60 min', image: '🚴' },
        { name: 'Jump Rope', muscles: 'Cardio', sets: '5x3 min', image: '🤸' },
        { name: 'Circuit Training', muscles: 'Full Body', sets: '3 rounds', image: '💪' },
        { name: 'Swimming', muscles: 'Full Body', sets: '30-40 min', image: '🏊' }
    ]
};

// Personalization Engine
class PersonalizationEngine {
    static calculateCalories(userData) {
        const { weight, height, age, gender, activityLevel, goal } = userData;
        
        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'female') {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 78; // Average
        }
        
        // Activity multipliers
        const activityMultipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'very-active': 1.9
        };
        
        let tdee = bmr * (activityMultipliers[activityLevel] || 1.2);
        
        // Goal adjustments
        const goalAdjustments = {
            'fat-loss': 0.85,
            'muscle-gain': 1.15,
            'recomp': 1.0,
            'maintenance': 1.0
        };
        
        return Math.round(tdee * (goalAdjustments[goal] || 1.0));
    }
    
    static calculateMacros(calories, goal) {
        let proteinRatio, carbRatio, fatRatio;
        
        switch(goal) {
            case 'fat-loss':
                proteinRatio = 0.40;
                carbRatio = 0.30;
                fatRatio = 0.30;
                break;
            case 'muscle-gain':
                proteinRatio = 0.30;
                carbRatio = 0.45;
                fatRatio = 0.25;
                break;
            case 'recomp':
                proteinRatio = 0.35;
                carbRatio = 0.35;
                fatRatio = 0.30;
                break;
            default:
                proteinRatio = 0.30;
                carbRatio = 0.40;
                fatRatio = 0.30;
        }
        
        return {
            protein: Math.round((calories * proteinRatio) / 4),
            carbs: Math.round((calories * carbRatio) / 4),
            fats: Math.round((calories * fatRatio) / 9)
        };
    }
    
    static getWorkoutRecommendation(userData) {
        const { age, goal, activityLevel } = userData;
        
        // Age-based adjustments
        if (age >= 50) {
            return {
                type: 'relative-strength',
                intensity: 'moderate',
                frequency: '3-4 days/week',
                focus: 'Joint-friendly exercises with emphasis on mobility',
                exercises: exerciseDatabase['relative-strength'].slice(0, 3)
            };
        } else if (age >= 40) {
            return {
                type: 'hybrid',
                intensity: 'moderate-high',
                frequency: '4-5 days/week',
                focus: 'Balanced approach with recovery emphasis',
                exercises: exerciseDatabase['hybrid']
            };
        }
        
        // Goal-based recommendations
        switch(goal) {
            case 'fat-loss':
                return {
                    type: 'endurance',
                    intensity: 'high',
                    frequency: '5-6 days/week',
                    focus: 'High-intensity cardio with resistance training',
                    exercises: exerciseDatabase['endurance']
                };
            case 'muscle-gain':
                return {
                    type: 'hypertrophy',
                    intensity: 'high',
                    frequency: '4-5 days/week',
                    focus: 'Progressive overload with volume training',
                    exercises: exerciseDatabase['hypertrophy']
                };
            case 'recomp':
                return {
                    type: 'hybrid',
                    intensity: 'moderate-high',
                    frequency: '4-5 days/week',
                    focus: 'Combination of strength and cardio',
                    exercises: exerciseDatabase['hybrid']
                };
            default:
                return {
                    type: 'strength',
                    intensity: 'moderate',
                    frequency: '3-4 days/week',
                    focus: 'General fitness and strength',
                    exercises: exerciseDatabase['strength']
                };
        }
    }
    
    static getMealPlan(userData) {
        const calories = this.calculateCalories(userData);
        const macros = this.calculateMacros(calories, userData.goal);
        
        const meals = [
            {
                name: 'Breakfast',
                time: '8:00 AM',
                calories: Math.round(calories * 0.25),
                protein: Math.round(macros.protein * 0.25),
                carbs: Math.round(macros.carbs * 0.25),
                fats: Math.round(macros.fats * 0.25),
                suggestions: this.getBreakfastSuggestions(userData.goal)
            },
            {
                name: 'Lunch',
                time: '1:00 PM',
                calories: Math.round(calories * 0.35),
                protein: Math.round(macros.protein * 0.35),
                carbs: Math.round(macros.carbs * 0.35),
                fats: Math.round(macros.fats * 0.35),
                suggestions: this.getLunchSuggestions(userData.goal)
            },
            {
                name: 'Dinner',
                time: '7:00 PM',
                calories: Math.round(calories * 0.30),
                protein: Math.round(macros.protein * 0.30),
                carbs: Math.round(macros.carbs * 0.30),
                fats: Math.round(macros.fats * 0.30),
                suggestions: this.getDinnerSuggestions(userData.goal)
            },
            {
                name: 'Snacks',
                time: 'Throughout day',
                calories: Math.round(calories * 0.10),
                protein: Math.round(macros.protein * 0.10),
                carbs: Math.round(macros.carbs * 0.10),
                fats: Math.round(macros.fats * 0.10),
                suggestions: this.getSnackSuggestions(userData.goal)
            }
        ];
        
        return meals;
    }
    
    static getBreakfastSuggestions(goal) {
        const suggestions = {
            'fat-loss': ['Egg whites with vegetables', 'Greek yogurt with berries', 'Protein smoothie'],
            'muscle-gain': ['Oatmeal with protein powder', 'Whole eggs with toast', 'Protein pancakes'],
            'recomp': ['Egg white omelet with avocado', 'Protein oats', 'Greek yogurt bowl'],
            'maintenance': ['Balanced breakfast bowl', 'Eggs with whole grain toast', 'Smoothie bowl']
        };
        return suggestions[goal] || suggestions['maintenance'];
    }
    
    static getLunchSuggestions(goal) {
        const suggestions = {
            'fat-loss': ['Grilled chicken salad', 'Tuna with vegetables', 'Lean protein bowl'],
            'muscle-gain': ['Chicken with rice and vegetables', 'Beef with sweet potato', 'Salmon with quinoa'],
            'recomp': ['Chicken breast with brown rice', 'Turkey wrap', 'Protein bowl'],
            'maintenance': ['Balanced protein meal', 'Chicken with vegetables', 'Fish with grains']
        };
        return suggestions[goal] || suggestions['maintenance'];
    }
    
    static getDinnerSuggestions(goal) {
        const suggestions = {
            'fat-loss': ['Grilled fish with vegetables', 'Chicken stir-fry', 'Lean protein with salad'],
            'muscle-gain': ['Steak with potatoes', 'Chicken pasta', 'Salmon with rice'],
            'recomp': ['Lean protein with vegetables', 'Turkey with sweet potato', 'Fish with quinoa'],
            'maintenance': ['Balanced dinner', 'Protein with vegetables', 'Healthy protein meal']
        };
        return suggestions[goal] || suggestions['maintenance'];
    }
    
    static getSnackSuggestions(goal) {
        const suggestions = {
            'fat-loss': ['Protein shake', 'Nuts (small portion)', 'Vegetables with hummus'],
            'muscle-gain': ['Protein bar', 'Peanut butter sandwich', 'Trail mix'],
            'recomp': ['Greek yogurt', 'Protein shake', 'Fruit with nuts'],
            'maintenance': ['Healthy snacks', 'Fruit', 'Nuts']
        };
        return suggestions[goal] || suggestions['maintenance'];
    }
}

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    appState.currentSection = sectionId;
    
    // Reinitialize AOS for new section
    AOS.refresh();
}

// Authentication
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('signup-form').classList.add('active');
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('fitpro_user_' + email);
    if (savedUser) {
        appState.userData = JSON.parse(savedUser);
        appState.currentUser = email;
        loadUserData();
        showSection('dashboard-page');
        initializeDashboard();
    } else {
        alert('User not found. Please sign up first.');
    }
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    
    appState.userData.name = name;
    appState.userData.email = email;
    appState.currentUser = email;
    
    showSection('onboarding-page');
    updateOnboardingProgress();
});

// Onboarding
function updateOnboardingProgress() {
    const progress = (appState.onboardingStep / 4) * 100;
    document.getElementById('onboarding-progress').style.width = progress + '%';
}

// Gender selection
document.querySelectorAll('#step-gender .option-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('#step-gender .option-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        appState.userData.gender = this.dataset.value;
        
        setTimeout(() => {
            nextStep();
        }, 300);
    });
});

// Goal selection
document.querySelectorAll('#step-goal .option-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('#step-goal .option-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        appState.userData.goal = this.dataset.value;
        
        setTimeout(() => {
            nextStep();
        }, 300);
    });
});

function nextStep() {
    const currentStep = document.querySelector('.onboarding-step.active');
    
    // Validate current step
    if (currentStep.id === 'step-stats') {
        const age = parseInt(document.getElementById('user-age').value);
        const height = parseInt(document.getElementById('user-height').value);
        const weight = parseInt(document.getElementById('user-weight').value);
        const targetWeight = parseInt(document.getElementById('user-target-weight').value);
        
        if (!age || !height || !weight || !targetWeight) {
            alert('Please fill in all fields');
            return;
        }
        
        appState.userData.age = age;
        appState.userData.height = height;
        appState.userData.weight = weight;
        appState.userData.targetWeight = targetWeight;
    }
    
    currentStep.classList.remove('active');
    const nextStep = currentStep.nextElementSibling;
    if (nextStep && nextStep.classList.contains('onboarding-step')) {
        nextStep.classList.add('active');
        appState.onboardingStep++;
        updateOnboardingProgress();
        AOS.refresh();
    }
}

function completeOnboarding() {
    // Collect health data
    const injuries = document.querySelector('input[name="injuries"]:checked').value === 'yes';
    const injuryDetails = document.getElementById('injury-details').value;
    const conditions = document.querySelector('input[name="conditions"]:checked').value === 'yes';
    const conditionDetails = document.getElementById('condition-details').value;
    const activityLevel = document.getElementById('activity-level').value;
    
    appState.userData.injuries = injuries;
    appState.userData.injuryDetails = injuryDetails;
    appState.userData.conditions = conditions;
    appState.userData.conditionDetails = conditionDetails;
    appState.userData.activityLevel = activityLevel;
    
    // Save to localStorage
    localStorage.setItem('fitpro_user_' + appState.currentUser, JSON.stringify(appState.userData));
    
    // Navigate to dashboard
    showSection('dashboard-page');
    initializeDashboard();
}

// Dashboard
function showDashboardSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById(sectionId + '-section').classList.add('active');
    event.currentTarget.classList.add('active');
    appState.currentDashboardSection = sectionId;
    
    AOS.refresh();
}

function initializeDashboard() {
    // Update user name
    document.getElementById('user-name-display').textContent = appState.userData.name;
    
    // Generate personalized content
    const calories = PersonalizationEngine.calculateCalories(appState.userData);
    const macros = PersonalizationEngine.calculateMacros(calories, appState.userData.goal);
    const workout = PersonalizationEngine.getWorkoutRecommendation(appState.userData);
    const mealPlan = PersonalizationEngine.getMealPlan(appState.userData);
    
    // Update overview stats
    document.getElementById('calories-burned').textContent = '0';
    document.getElementById('calories-consumed').textContent = '0';
    document.getElementById('water-intake').textContent = '0L';
    document.getElementById('workout-time').textContent = '0 min';
    
    // Update macros
    document.getElementById('protein-value').textContent = macros.protein + 'g';
    document.getElementById('carbs-value').textContent = macros.carbs + 'g';
    document.getElementById('fats-value').textContent = macros.fats + 'g';
    
    // Display today's workout
    const workoutPreview = document.getElementById('todays-workout');
    workoutPreview.innerHTML = `
        <div class="workout-info">
            <h4>${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} Training</h4>
            <p><strong>Intensity:</strong> ${workout.intensity}</p>
            <p><strong>Frequency:</strong> ${workout.frequency}</p>
            <p><strong>Focus:</strong> ${workout.focus}</p>
        </div>
    `;
    
    // Generate meal plan
    generateMealPlan(mealPlan);
    
    // Generate exercises
    generateExercises();
    
    // Load profile info
    loadProfileInfo();
}

function generateMealPlan(mealPlan) {
    const mealPlanContainer = document.getElementById('meal-plan');
    mealPlanContainer.innerHTML = mealPlan.map(meal => `
        <div class="meal-plan-card glass">
            <h4>${meal.name}</h4>
            <p class="meal-time">${meal.time}</p>
            <div class="meal-macros">
                <span>🔥 ${meal.calories} cal</span>
                <span>🥩 ${meal.protein}g protein</span>
                <span>🍞 ${meal.carbs}g carbs</span>
                <span>🥑 ${meal.fats}g fats</span>
            </div>
            <div class="meal-suggestions">
                <p><strong>Suggestions:</strong></p>
                <ul>
                    ${meal.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function generateExercises() {
    const exercisesGrid = document.getElementById('exercises-grid');
    const allExercises = Object.values(exerciseDatabase).flat();
    
    exercisesGrid.innerHTML = allExercises.map(exercise => `
        <div class="exercise-card" data-type="${exercise.type}">
            <div class="exercise-image">${exercise.image}</div>
            <h4>${exercise.name}</h4>
            <p class="exercise-meta">Target: ${exercise.muscles}</p>
            <p class="exercise-meta">Sets/Reps: ${exercise.sets}</p>
            <button class="btn-primary" onclick="addToWorkout('${exercise.name}')">Add to Workout</button>
        </div>
    `).join('');
}

function filterTraining(type) {
    document.querySelectorAll('.training-style-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    const cards = document.querySelectorAll('.exercise-card');
    cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Photo Meal Tracker
document.getElementById('meal-photo-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.getElementById('preview-image');
            img.src = event.target.result;
            
            document.querySelector('.upload-placeholder').classList.add('hidden');
            document.getElementById('photo-preview').classList.remove('hidden');
            
            // Simulate AI analysis
            analyzeMealPhoto();
        };
        reader.readAsDataURL(file);
    }
});

function analyzeMealPhoto() {
    const analyzingState = document.getElementById('analyzing-state');
    const resultsState = document.getElementById('analysis-results');
    
    analyzingState.classList.remove('hidden');
    resultsState.classList.add('hidden');
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Generate random but realistic values
        const calories = Math.floor(Math.random() * 400) + 300;
        const protein = Math.floor(Math.random() * 40) + 20;
        const carbs = Math.floor(Math.random() * 50) + 30;
        const fats = Math.floor(Math.random() * 20) + 10;
        
        document.getElementById('photo-calories').textContent = calories + ' kcal';
        document.getElementById('photo-protein').textContent = protein + 'g';
        document.getElementById('photo-carbs').textContent = carbs + 'g';
        document.getElementById('photo-fats').textContent = fats + 'g';
        
        analyzingState.classList.add('hidden');
        resultsState.classList.remove('hidden');
    }, 2000);
}

function saveMealFromPhoto() {
    const meal = {
        timestamp: new Date().toISOString(),
        calories: parseInt(document.getElementById('photo-calories').textContent),
        protein: parseInt(document.getElementById('photo-protein').textContent),
        carbs: parseInt(document.getElementById('photo-carbs').textContent),
        fats: parseInt(document.getElementById('photo-fats').textContent),
        image: document.getElementById('preview-image').src
    };
    
    appState.meals.push(meal);
    saveMealsToStorage();
    updateMealsList();
    updateDashboardStats();
    
    // Reset photo upload
    document.getElementById('photo-preview').classList.add('hidden');
    document.querySelector('.upload-placeholder').classList.remove('hidden');
    document.getElementById('meal-photo-input').value = '';
    
    alert('Meal saved successfully!');
}

function updateMealsList() {
    const mealsList = document.getElementById('meals-list');
    
    if (appState.meals.length === 0) {
        mealsList.innerHTML = '<p class="empty-state">No meals logged yet. Start by uploading a photo!</p>';
        return;
    }
    
    mealsList.innerHTML = appState.meals.map((meal, index) => `
        <div class="meal-item glass" style="margin-bottom: 1rem; padding: 1rem; border-radius: 10px;">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${meal.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px;">
                <div style="flex: 1;">
                    <p><strong>${new Date(meal.timestamp).toLocaleTimeString()}</strong></p>
                    <p>🔥 ${meal.calories} cal | 🥩 ${meal.protein}g | 🍞 ${meal.carbs}g | 🥑 ${meal.fats}g</p>
                </div>
            </div>
        </div>
    `).join('');
}

function updateDashboardStats() {
    const totalCalories = appState.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = appState.meals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = appState.meals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = appState.meals.reduce((sum, meal) => sum + meal.fats, 0);
    
    document.getElementById('calories-consumed').textContent = totalCalories;
    document.getElementById('protein-value').textContent = totalProtein + 'g';
    document.getElementById('carbs-value').textContent = totalCarbs + 'g';
    document.getElementById('fats-value').textContent = totalFats + 'g';
}

function loadProfileInfo() {
    const profileInfo = document.getElementById('profile-info');
    const goalsInfo = document.getElementById('goals-info');
    
    profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${appState.userData.name}</p>
        <p><strong>Email:</strong> ${appState.userData.email}</p>
        <p><strong>Age:</strong> ${appState.userData.age} years</p>
        <p><strong>Height:</strong> ${appState.userData.height} cm</p>
        <p><strong>Current Weight:</strong> ${appState.userData.weight} kg</p>
        <p><strong>Target Weight:</strong> ${appState.userData.targetWeight} kg</p>
    `;
    
    const goalNames = {
        'fat-loss': 'Fat Loss',
        'muscle-gain': 'Muscle Gain',
        'recomp': 'Body Recomposition',
        'maintenance': 'Maintenance'
    };
    
    goalsInfo.innerHTML = `
        <p><strong>Primary Goal:</strong> ${goalNames[appState.userData.goal]}</p>
        <p><strong>Activity Level:</strong> ${appState.userData.activityLevel}</p>
        <p><strong>Daily Calorie Target:</strong> ${PersonalizationEngine.calculateCalories(appState.userData)} kcal</p>
    `;
}

function saveMealsToStorage() {
    localStorage.setItem('fitpro_meals_' + appState.currentUser, JSON.stringify(appState.meals));
}

function loadUserData() {
    const savedMeals = localStorage.getItem('fitpro_meals_' + appState.currentUser);
    if (savedMeals) {
        appState.meals = JSON.parse(savedMeals);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        appState.currentUser = null;
        appState.userData = {};
        appState.meals = [];
        showSection('landing-page');
    }
}

function addToWorkout(exerciseName) {
    alert(`${exerciseName} added to your workout plan!`);
}

function showMeasurementModal() {
    alert('Measurement tracking feature coming soon!');
}

function editProfile() {
    alert('Profile editing feature coming soon!');
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const lastUser = localStorage.getItem('fitpro_last_user');
    if (lastUser) {
        const savedUser = localStorage.getItem('fitpro_user_' + lastUser);
        if (savedUser) {
            appState.userData = JSON.parse(savedUser);
            appState.currentUser = lastUser;
            loadUserData();
            showSection('dashboard-page');
            initializeDashboard();
        }
    }
});
