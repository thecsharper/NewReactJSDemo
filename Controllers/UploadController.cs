using Microsoft.AspNetCore.Mvc;

namespace NewReactJSDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly ILogger<UploadController> _logger;

        public UploadController(ILogger<UploadController> logger)
        {
            _logger = logger;
        }

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile files)
        {
            var filePath = Path.GetTempFileName();

                if (files.Length > 0)
                {
                using var stream = new FileStream(filePath, FileMode.Create);
                await files.CopyToAsync(stream);
            }

            return Ok(new { filePath });
        }
    }
}