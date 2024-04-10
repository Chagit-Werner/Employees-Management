using Microsoft.AspNetCore.Mvc;
using Mng.Core.Repositories;
using Mng.Core.Services;

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController:ControllerBase
    {
        private readonly IPositionService positionService;
        public PositionController(IPositionService p)
        {
            positionService = p;
        }
        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            var customers = await positionService.GetAllAsync();
            return Ok(customers);
            
        }

    }
}
