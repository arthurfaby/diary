export enum eFeelings {
  NEUTRAL = "neutral",
  HAPPY = "happy",
  VERY_HAPPY = "veryhappy",
  SAD = "sad",
  ANGRY = "angry",
}

export interface iNote {
  id: string;
  title: string;
  content: string;
  feeling: eFeelings;
  date: Date;
  usermail: string;
}
