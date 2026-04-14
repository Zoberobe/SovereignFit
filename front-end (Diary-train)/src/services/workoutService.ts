import { api } from './api';
import { type CreateWorkoutRequest, type WorkoutResponse } from '../types/workout';

export const workoutService = {
  getAllWorkouts: async (): Promise<WorkoutResponse[]> => {
    const response = await api.get<WorkoutResponse[]>('/workout');
    return response.data;
  },

  createWorkout: async (data: CreateWorkoutRequest): Promise<WorkoutResponse> => {
    const response = await api.post<WorkoutResponse>('/workout', data);
    return response.data;
  },
  deleteWorkout: async (id: string): Promise<void> => {
    await api.delete(`/workout/${id}`);
  },
  updateWorkout: async (id: string, data: CreateWorkoutRequest): Promise<void> => {
  await api.put(`/workout/${id}`, data);
}
};