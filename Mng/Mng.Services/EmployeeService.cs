using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Services
{
    public class EmployeeService : IEmployeeService
    {
        //DI
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<List<Employee>> GetAllAsync()
        {
            var l = await _employeeRepository.GetAllAsync();
            return l.Where(e => e.IsActive).ToList();

        }

        public async Task<Employee> GetByIdAsync(int id)  =>   await _employeeRepository.GetByIdAsync(id);
  
        public async Task<Employee> AddAsync(Employee employee)
        {
            var existingEmployees = await _employeeRepository.GetAllAsync();
            var duplicatePositions = employee.EmployeeInPositions
            .GroupBy(p => p.PositionId)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

            if (duplicatePositions.Any())
            {
                throw new ArgumentException("Employee cannot have duplicate positions.");
            }
            foreach (var p in employee.EmployeeInPositions)
            {
                if (p.StartPosition.CompareTo(employee.StartWorking) < 0)
                    throw new ArgumentException("'Position'.'Start Position' must be after or equal to 'StartWorking'");
            }
            if ((!employee.ID_Number.All(char.IsDigit)
              ))
            {
                return null;
            }
            return await _employeeRepository.AddEmployeeAsync(employee);
        }

        public async Task<Employee> PutAsync(Employee employee)
        {
            var duplicatePositions = employee.EmployeeInPositions
           .GroupBy(p => p.PositionId)
           .Where(g => g.Count() > 1)
           .Select(g => g.Key)
            .ToList();

            if (duplicatePositions.Any())
            {
                throw new ArgumentException("Employee cannot have duplicate positions.");
            }
            foreach (var p in employee.EmployeeInPositions)
            {
                if (p.StartPosition.CompareTo(employee.StartWorking) < 0)
                    throw new ArgumentException("'Position'.'Start Position' must be after or equal to 'StartWorking'");
            }
            if ((!employee.ID_Number.All(char.IsDigit) ||

                employee.StartWorking.CompareTo(employee.BirthDate) < 0
              ))
            {
                return null;
            }
            return await _employeeRepository.PutAsync(employee);
        }
      
        public async Task DeleteAsync(int productid) => await _employeeRepository.DeleteAsync(productid);
        
    }
}
