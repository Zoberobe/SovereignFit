using System;
using System.Collections.Generic;

namespace DiaryTrain.Domain.Entities
{
    public class Workout
    {
        public Guid Id { get; private set; }
        public DateTime Date { get; private set; }
        public string Type { get; private set; }
        public int DurationInMinutes { get; private set; }
        public string Notes { get; private set; }

        private readonly List<Exercise> _exercises = new List<Exercise>();
        public IReadOnlyCollection<Exercise> Exercises => _exercises.AsReadOnly();

        public Workout(string type, int durationInMinutes, string notes)
        {
            Id = Guid.NewGuid();
            Date = DateTime.UtcNow;
            Type = type;
            DurationInMinutes = durationInMinutes;
            Notes = notes;
        }

        public void AddExercise(Exercise exercise)
        {
            _exercises.Add(exercise);
        }
        public void UpdateDetails(string type, int durationInMinutes, string notes)
        {
            Type = type;
            DurationInMinutes = durationInMinutes;
            Notes = notes;
        }

    }
}