using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Mng.API.PostModel;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Core.Services;
using System.Collections.Generic;

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            List<Employee> employeeList = await _employeeService.GetAllAsync();
            var listDto = _mapper.Map<List<Employee>, List<EmployeeDto>>(employeeList);
            return Ok(listDto);
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] EmployeePostModel e)
        {
            var employee = _mapper.Map<Employee>(e);
            employee.IsActive = true;
            var response = await _employeeService.AddAsync(employee);
            if(response !=null)
              return Ok(_mapper.Map<EmployeeDto>(employee));
            return BadRequest(new { errors = new[] { "Pay attention to enter valid values" } });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutAsync(int id, [FromBody] EmployeePostModel model)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            _mapper.Map(model, employee);
            await _employeeService.PutAsync(employee);
            employee = await _employeeService.GetByIdAsync(id);
            if(employee != null)    
                 return Ok(_mapper.Map<EmployeeDto>(employee));
            return BadRequest(new { errors = new[] { "Pay attention to enter valid values" } });


        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
