using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.DTOs
{
    public class EmployeeDto
    {

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? ID_Number { get; set; }
        public DateTime StartWorking { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; } public List<EmployeePositionDto> EmployeeInPositions { get; set; }

    }
}
