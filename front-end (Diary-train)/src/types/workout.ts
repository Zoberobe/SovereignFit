
export interface CreateWorkoutRequest {
  type: string;
  durationInMinutes: number;
  notes: string;
}

export interface WorkoutResponse {
  id: string;
  date: string;
  type: string;
  durationInMinutes: number;
  notes: string;
}