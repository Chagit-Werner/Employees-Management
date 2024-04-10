using Mng.Core.Entities;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Repositories
{
    public interface IEmployeeRepository
    {
        public Task<List<Employee>>  GetAllAsync();
        public Task<Employee> GetByIdAsync(int id);
        public Task<Employee> AddEmployeeAsync(Employee employee);
        public Task<Employee> PutAsync(Employee employee);
        public Task DeleteAsync(int id);

       


   


    }
}
