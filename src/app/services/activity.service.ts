import { Injectable } from '@angular/core';

export interface Activity {
  type: 'mental' | 'creative' | 'physical' | 'relaxing';
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [
    { type: 'mental', description: 'Solve a Riddle: What has keys but no locks, space but no room, and you can enter but not go in?' },
    { type: 'mental', description: 'Do a Quick Math: Calculate 15% of 340 without a calculator' },
    { type: 'mental', description: 'Memory Challenge: Memorize a sequence of 10 random numbers' },
    { type: 'creative', description: 'Draw your favorite animal in a superhero costume' },
    { type: 'creative', description: 'Write a haiku about your current mood' },
    { type: 'creative', description: 'Design a logo for your imaginary company' },
    { type: 'physical', description: 'Do 20 jumping jacks' },
    { type: 'physical', description: 'Hold a plank position for 30 seconds' },
    { type: 'physical', description: 'Dance to your favorite song' },
    { type: 'relaxing', description: 'Take 10 deep breaths, counting each one' },
    { type: 'relaxing', description: 'Close your eyes and imagine your happy place for 1 minute' },
    { type: 'relaxing', description: 'Stretch your arms and legs for 2 minutes' }
  ];

  getRandomActivity(type?: 'mental' | 'creative' | 'physical' | 'relaxing'): Activity {
    const filteredActivities = type 
      ? this.activities.filter(activity => activity.type === type)
      : this.activities;
    
    return filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
  }
}