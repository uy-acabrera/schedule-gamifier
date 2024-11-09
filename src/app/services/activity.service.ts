import { Injectable } from '@angular/core';

export interface Activity {
  type: ActivityTpe;
  description: string;
}

export enum ActivityTpe {
  mental = 'mental',
  creative = 'creative',
  physical = 'physical',
  relaxing = 'relaxing',
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [
    // { type: ActivityTpe.mental, description: 'Solve a Riddle: What has keys but no locks, space but no room, and you can enter but not go in?' },
    // { type: ActivityTpe.mental, description: 'Do a Quick Math: Calculate 15% of 340 without a calculator' },
    // { type: ActivityTpe.mental, description: 'Memory Challenge: Memorize a sequence of 10 random numbers' },
    // { type: ActivityTpe.creative, description: 'Draw your favorite animal in a superhero costume' },
    // { type: ActivityTpe.creative, description: 'Write a haiku about your current mood' },
    // { type: ActivityTpe.creative, description: 'Design a logo for your imaginary company' },
    // { type: ActivityTpe.physical, description: 'Do 20 jumping jacks' },
    // { type: ActivityTpe.physical, description: 'Hold a plank position for 30 seconds' },
    // { type: ActivityTpe.physical, description: 'Dance to your favorite song' },
    // { type: ActivityTpe.relaxing, description: 'Take 10 deep breaths, counting each one' },
    // { type: ActivityTpe.relaxing, description: 'Close your eyes and imagine your happy place for 1 minute' },
    // { type: ActivityTpe.relaxing, description: 'Stretch your arms and legs for 2 minutes' }
  ];

  constructor() {
    this.activities = this.getActivitiesFromStorage();
  }

  getActivitiesFromStorage(): Activity[] {
    const activitiesJSON = localStorage.getItem('activities');
    if (!activitiesJSON) {
      return [];
    }
  
    try {
      const activities: Activity[] = JSON.parse(activitiesJSON);
      return activities;
    } catch (error) {
      console.error('Error parsing activities from local storage:', error);
      return [];
    }
  }

  getRandomActivity(type: ActivityTpe): Activity {
    const filteredActivities = type 
      ? this.activities.filter(activity => activity.type === type)
      : this.activities;
    
    return filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
  }

  saveActivity(activity: Activity) {
    this.activities.push(activity);
    const activitiesJSON = JSON.stringify(this.activities);
    localStorage.setItem('activities', activitiesJSON);
  }
}