using DiaryTrain.Application.DTOs;
using DiaryTrain.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiaryTrain.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutService _workoutService;

        public WorkoutController(WorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateWorkoutRequest request)
        {
            var response = await _workoutService.CreateWorkoutAsync(request);

            return Created($"/api/workout/{response.Id}", response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _workoutService.GetAllWorkoutsAsync();
            return Ok(response); 
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _workoutService.DeleteWorkoutAsync(id);
            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateWorkoutRequest request)
        {
            await _workoutService.UpdateWorkoutAsync(id, request);
            return NoContent();
        }
    }
}