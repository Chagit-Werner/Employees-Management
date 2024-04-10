using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Mng.Core.Entities;
using Mng.Core.Services;
using Mng.Services;

namespace Mng.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController:ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var isValid = await _authService.LoginAsync(login.Name,login.Password);
            if (isValid)
                return Ok(new { message = "Login successful" , status=200});
             return BadRequest(new { message = "Invalid username or password" });
        }
    }
}
