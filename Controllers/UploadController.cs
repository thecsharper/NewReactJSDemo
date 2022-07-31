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
            var filePath = Path.GetTempPath();

            if (files.Length > 0)
            {
                var filename = Path.Combine(filePath, files.FileName);
                using var stream = new FileStream(filename, FileMode.Create);
                await files.CopyToAsync(stream);
            }

            return Ok("file Uploaded");
        }
    }
}