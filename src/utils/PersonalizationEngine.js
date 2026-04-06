export class PersonalizationEngine {
  static calculateCalories(userData) {
    const { weight, height, age, gender, activityLevel, goal } = userData;
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 78;
    }
    
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    
    let tdee = bmr * (activityMultipliers[activityLevel] || 1.2);
    
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
    const { age, goal } = userData;
    
    if (age >= 50) {
      return {
        type: 'relative-strength',
        intensity: 'moderate',
        frequency: '3-4 days/week',
        focus: 'Joint-friendly exercises with emphasis on mobility'
      };
    } else if (age >= 40) {
      return {
        type: 'hybrid',
        intensity: 'moderate-high',
        frequency: '4-5 days/week',
        focus: 'Balanced approach with recovery emphasis'
      };
    }
    
    switch(goal) {
      case 'fat-loss':
        return {
          type: 'endurance',
          intensity: 'high',
          frequency: '5-6 days/week',
          focus: 'High-intensity cardio with resistance training'
        };
      case 'muscle-gain':
        return {
          type: 'hypertrophy',
          intensity: 'high',
          frequency: '4-5 days/week',
          focus: 'Progressive overload with volume training'
        };
      case 'recomp':
        return {
          type: 'hybrid',
          intensity: 'moderate-high',
          frequency: '4-5 days/week',
          focus: 'Combination of strength and cardio'
        };
      default:
        return {
          type: 'strength',
          intensity: 'moderate',
          frequency: '3-4 days/week',
          focus: 'General fitness and strength'
        };
    }
  }
  
  static getMealPlan(userData) {
    const calories = this.calculateCalories(userData);
    const macros = this.calculateMacros(calories, userData.goal);
    
    return [
      {
        name: 'Breakfast',
        time: '8:00 AM',
        calories: Math.round(calories * 0.25),
        protein: Math.round(macros.protein * 0.25),
        carbs: Math.round(macros.carbs * 0.25),
        fats: Math.round(macros.fats * 0.25)
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        calories: Math.round(calories * 0.35),
        protein: Math.round(macros.protein * 0.35),
        carbs: Math.round(macros.carbs * 0.35),
        fats: Math.round(macros.fats * 0.35)
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        calories: Math.round(calories * 0.30),
        protein: Math.round(macros.protein * 0.30),
        carbs: Math.round(macros.carbs * 0.30),
        fats: Math.round(macros.fats * 0.30)
      },
      {
        name: 'Snacks',
        time: 'Throughout day',
        calories: Math.round(calories * 0.10),
        protein: Math.round(macros.protein * 0.10),
        carbs: Math.round(macros.carbs * 0.10),
        fats: Math.round(macros.fats * 0.10)
      }
    ];
  }
}

export const exerciseDatabase = {
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
