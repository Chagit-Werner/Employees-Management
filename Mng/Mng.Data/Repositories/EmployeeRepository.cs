using Microsoft.EntityFrameworkCore;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Employee> GetByIdAsync(int id)=>
          await _context.Employees.Include(p => p.EmployeeInPositions).FirstAsync(p => p.Id == id);
        
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
       

        public async Task<List<Employee>> GetAllAsync()=>
             await _context.Employees.Include(p => p.EmployeeInPositions).ToListAsync();
        
        public async Task<Employee> PutAsync(Employee employee)
        {
            var existCustomer = await GetByIdAsync(employee.Id);
            _context.Entry(existCustomer).CurrentValues.SetValues(employee);
            await _context.SaveChangesAsync();
            return existCustomer;

        }
        public async Task DeleteAsync(int id)
        {
            var employee = await GetByIdAsync(id);
            employee.IsActive = false;
           await _context.SaveChangesAsync(); 
        }
    }
}
