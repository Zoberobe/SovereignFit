using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DiaryTrain.Domain.Entities;
using DiaryTrain.Domain.Interfaces;
using DiaryTrain.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DiaryTrain.Infrastructure.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly DiaryTrainDbContext _context;

        public WorkoutRepository(DiaryTrainDbContext context)
        {
            _context = context;
        }

        public async Task<Workout?> GetByIdAsync(Guid id)
        {
            return await _context.Workouts
                .Include(w => w.Exercises)
                .FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<IEnumerable<Workout>> GetAllAsync()
        {
            return await _context.Workouts
                .Include(w => w.Exercises)
                .ToListAsync();
        }

        public async Task AddAsync(Workout workout)
        {
            await _context.Workouts.AddAsync(workout);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Workout workout)
        {
            _context.Workouts.Update(workout);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout != null)
            {
                _context.Workouts.Remove(workout);
                await _context.SaveChangesAsync();
            }
        }
    }
}