import { Injectable } from '@angular/core';
import { ActivityType } from '../enums/activity-type.enum';
import { Mood } from '../enums/mood.enum';
import { Activity } from '../interfaces/activity.interface';
import { MoodToActivityMapping } from '../interfaces/mood-to-activity-mapping';

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private activities: Activity[] = [
    {
      type: ActivityType.Mental,
      time: 5,
      description:
        "Solve a Riddle: What has keys but no locks, space but no room, and you can enter but not go in?",
    },
    {
      type: ActivityType.Mental,
      time: 10,
      description: "Do a Quick Math: Calculate 15% of 340 without a calculator",
    },
    {
      type: ActivityType.Mental,
      time: 15,
      description: "Memory Challenge: Memorize a sequence of 10 random numbers",
    },
    {
      type: ActivityType.Creative,
      time: 5,
      description: "Draw your favorite animal in a superhero costume",
    },
    {
      type: ActivityType.Creative,
      time: 10,
      description: "Write a haiku about your current mood",
    },
    {
      type: ActivityType.Creative,
      time: 15,
      description: "Design a logo for your imaginary company",
    },
    { 
      type: ActivityType.Physical,
      time: 5,
      description: "Do 20 jumping jacks"
    },
    {
      type: ActivityType.Physical,
      time: 30,
      description: "Hold a plank position for 30 seconds",
    },
    { 
      type: ActivityType.Physical,
      time: 60,
      description: "Dance to your favorite song"
    },
    {
      type: ActivityType.Relaxing,
      time: 30,
      description: "Play magic for 30 seconds",
    },
    {
      type: ActivityType.Relaxing,
      time: 10,
      description: "Close your eyes and imagine your happy place for 10 seconds",
    },
    {
      type: ActivityType.Relaxing,
      time: 60,
      description: "Stretch your arms and legs for 1 minute",
    },
  ];

  constructor() {
    this.activities.push(...this.getActivitiesFromStorage());
  }

  getActivitiesFromStorage(): Activity[] {
    const activitiesJSON = localStorage.getItem("activities");
    if (!activitiesJSON) {
      return [];
    }

    try {
      const activities: Activity[] = JSON.parse(activitiesJSON);
      return activities;
    } catch (error) {
      console.error("Error parsing activities from local storage:", error);
      return [];
    }
  }

  private getRecommendedActivities(
    mood: Mood,
    activities: Activity[]
  ): Activity[] {
    const { types, maxTime } = MoodToActivityMapping[mood];
    return activities.filter(
      (activity) => types.includes(activity.type) && activity.time <= maxTime
    );
  }

  getRandomActivity(type?: ActivityType, mood?: Mood): Activity {
    const filteredActivitiesByMood = mood
      ? this.getRecommendedActivities(mood, this.activities)
      : this.activities;

    const filteredActivitiesByType = type
      ? filteredActivitiesByMood.filter((activity) => activity.type === type)
      : filteredActivitiesByMood;

    return filteredActivitiesByType[
      Math.floor(Math.random() * filteredActivitiesByType.length)
    ];
  }

  saveActivity(activity: Activity) {
    this.activities.push(activity);
    const activitiesJSON = JSON.stringify(this.activities);
    localStorage.setItem("activities", activitiesJSON);
  }
}

/**

  Mood-to-Task Mapping:

  Annoyed / Frustrated
  Recommended Task: Relaxing
  Rationale: If the user is feeling irritated, a relaxing task can help them cool off and reset. Activities like breathing exercises, a short meditation, or even listening to calming music can restore calm and clarity.

  Determined / Motivated
  Recommended Task: Physical Activity
  Rationale: When a person is determined, they have a surge of energy and focus that can be channeled into a high-energy task. Physical tasks like quick workouts, stretches, or even a brisk walk will help them make the most of this drive.

  Reluctant / Hesitant
  Recommended Task: Mental (Focus)
  Rationale: Reluctance often stems from uncertainty or lack of clarity. A mental focus task, such as a quick planning or brainstorming session, can help ease them into productive work by giving direction and breaking the ice on larger tasks.

  Procrastinating / Avoidant
  Recommended Task: Creative Task
  Rationale: Creativity can provide a gentle “in” when someone is stalling. Engaging in a low-pressure creative activity like doodling, journaling, or brainstorming could ease them into a state of productivity without feeling forced.

  “One Step at a Time” / Overwhelmed
  Recommended Task: Small, Manageable Tasks (Any Category)
  Rationale: For someone feeling overwhelmed, small, bite-sized tasks can build momentum. These could span categories but focus on simple, quick wins (e.g., organizing one part of their desk, a quick list of priorities, or a short stretch).

  Resigned / Obligated
  Recommended Task: Mental (Structured Task)
  Rationale: Resignation often means they’re committed to following through but lack excitement. Structured mental tasks (like a checklist or planning) match this mood by providing a straightforward path to completing what needs to be done.

  Amused / Ironic
  Recommended Task: Light Creative Task or Fun Physical Activity
  Rationale: When feeling amused or self-ironic, they’re already light-hearted, so a fun creative task or light physical activity that doesn’t feel too serious can sustain this humor, turning it into a positive push.
 
*/