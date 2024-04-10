using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Entities
{
    public enum Gender
    {
        Male,
        Female
    }


    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [MaxLength(9)]
        [MinLength(9)]
        public string ID_Number { get; set; }
        [Required]
        public DateTime StartWorking { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public Gender Gender { get; set; }
        public bool IsActive { get; set; }

        public List<EmployeeInPosition> EmployeeInPositions { get; set; }

    }
}
