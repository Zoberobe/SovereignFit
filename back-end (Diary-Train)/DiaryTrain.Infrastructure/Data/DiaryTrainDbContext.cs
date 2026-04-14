using DiaryTrain.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DiaryTrain.Infrastructure.Data
{
    public class DiaryTrainDbContext : DbContext
    {
        public DiaryTrainDbContext(DbContextOptions<DiaryTrainDbContext> options) : base(options)
        {
        }

        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Workout>(builder =>
            {
                builder.HasKey(w => w.Id);

                builder.Metadata.FindNavigation(nameof(Workout.Exercises))
                       ?.SetPropertyAccessMode(PropertyAccessMode.Field);

                builder.HasMany(w => w.Exercises)
                       .WithOne()
                       .HasForeignKey(e => e.WorkoutId)
                       .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Exercise>(builder =>
            {
                builder.HasKey(e => e.Id);
                builder.Property(e => e.WeightKg).HasPrecision(5, 2); 
            });
        }
    }
}