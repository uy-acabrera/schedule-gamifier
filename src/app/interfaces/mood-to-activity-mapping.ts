import { ActivityType } from "../enums/activity-type.enum";
import { Mood } from "../enums/mood.enum";

export const MoodToActivityMapping: Record<Mood, { types: ActivityType[]; maxTime: number }> = {
  [Mood.Annoyed]: { types: [ActivityType.Relaxing, ActivityType.Creative], maxTime: 10 },
  [Mood.Overwhelmed]: { types: [ActivityType.Relaxing, ActivityType.Physical, ActivityType.Mental], maxTime: 15 },
  [Mood.Procrastinating]: { types: [ActivityType.Creative, ActivityType.Physical], maxTime: 20 },
  [Mood.Reluctant]: { types: [ActivityType.Mental, ActivityType.Physical], maxTime: 20 },
  [Mood.Resigned]: { types: [ActivityType.Mental, ActivityType.Physical], maxTime: 30 },
  [Mood.Amused]: { types: [ActivityType.Creative, ActivityType.Physical], maxTime: 30 },
  [Mood.Determined]: { types: [ActivityType.Physical, ActivityType.Mental], maxTime: 60 }
};
