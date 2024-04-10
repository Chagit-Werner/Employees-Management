using Microsoft.EntityFrameworkCore;
using Mng.Core.Entities;
using System.Text.Json;


namespace Mng.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {  }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<EmployeeInPosition> EmployeesInPosition { get; set; }
     
    



    }
}
