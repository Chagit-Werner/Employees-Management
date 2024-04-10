using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Entities
{
    public class EmployeeInPosition
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public Employee EmployeeToPosition { get; set; }

        public int PositionId { get; set; }
        [ForeignKey(nameof(PositionId))]
        public Position PositionToEmployee { get; set; }


        public bool Administrative { get; set; }
        public DateTime StartPosition { get; set; }


    }
}
