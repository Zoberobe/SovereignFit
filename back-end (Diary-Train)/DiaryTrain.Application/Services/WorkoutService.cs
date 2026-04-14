using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiaryTrain.Application.DTOs;
using DiaryTrain.Domain.Entities;
using DiaryTrain.Domain.Interfaces;

namespace DiaryTrain.Application.Services
{
    public class WorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;

        public WorkoutService(IWorkoutRepository workoutRepository)
        {
            _workoutRepository = workoutRepository;
        }

        public async Task<WorkoutResponse> CreateWorkoutAsync(CreateWorkoutRequest request)
        {
            var workout = new Workout(request.Type, request.DurationInMinutes, request.Notes);

            await _workoutRepository.AddAsync(workout);

            return new WorkoutResponse(
                workout.Id,
                workout.Date,
                workout.Type,
                workout.DurationInMinutes,
                workout.Notes
            );
        }

        public async Task<IEnumerable<WorkoutResponse>> GetAllWorkoutsAsync()
        {
            var workouts = await _workoutRepository.GetAllAsync();

            return workouts.Select(w => new WorkoutResponse(
                w.Id,
                w.Date,
                w.Type,
                w.DurationInMinutes,
                w.Notes
            ));
        }
        public async Task DeleteWorkoutAsync(Guid id)
        {
            await _workoutRepository.DeleteAsync(id);
        }
        public async Task UpdateWorkoutAsync(Guid id, UpdateWorkoutRequest request)
        {
            var workout = await _workoutRepository.GetByIdAsync(id);
            if (workout == null) return;

            workout.UpdateDetails(request.Type, request.DurationInMinutes, request.Notes);
            await _workoutRepository.UpdateAsync(workout);
        }
    }
}