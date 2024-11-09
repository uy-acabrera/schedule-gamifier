import { ActivityType } from "../enums/activity-type.enum";

export interface Activity {
  type: ActivityType;
  description: string;
  time: number;
}
