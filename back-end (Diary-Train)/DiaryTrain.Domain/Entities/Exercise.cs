using System;

namespace DiaryTrain.Domain.Entities
{
    public class Exercise
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public int Sets { get; private set; }
        public int Reps { get; private set; }
        public decimal WeightKg { get; private set; }
        public Guid WorkoutId { get; private set; }

        public Exercise(string name, int sets, int reps, decimal weightKg, Guid workoutId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Sets = sets;
            Reps = reps;
            WeightKg = weightKg;
            WorkoutId = workoutId;
        }
    }
}