using System;

namespace DiaryTrain.Application.DTOs
{
    public record CreateWorkoutRequest(
        string Type,
        int DurationInMinutes,
        string Notes
    );

    public record WorkoutResponse(
        Guid Id,
        DateTime Date,
        string Type,
        int DurationInMinutes,
        string Notes
    );
    public record UpdateWorkoutRequest(string Type, int DurationInMinutes, string Notes);
}