using LIP.Application.Interface.Repository;
using LIP.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIP.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IExamRepository _examRepository;
        public TestController(IExamRepository examRepository)
        {
            _examRepository = examRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync(int attemptId)
        {
            //var data = await _examRepository.GetExamResultsAsync(examId, userId, attemptId, questionType);
            var data = await _examRepository.GetExamResultsByAttemptAsync(attemptId);

            return Ok(data);
        }   
    }
}
