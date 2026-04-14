using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DiaryTrain.Domain.Entities;

namespace DiaryTrain.Domain.Interfaces
{
    public interface IWorkoutRepository
    {
        Task<Workout?> GetByIdAsync(Guid id);
        Task<IEnumerable<Workout>> GetAllAsync();
        Task AddAsync(Workout workout);
        Task UpdateAsync(Workout workout);
        Task DeleteAsync(Guid id);
    }
}