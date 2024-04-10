using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IEmployeeService
    {
        public Task<List<Employee>> GetAllAsync();
        
        public  Task<Employee> PutAsync(Employee customer);

        public Task<Employee> AddAsync(Employee employee);
        public Task<Employee> GetByIdAsync(int id);
        public Task DeleteAsync(int id);




    }

}
