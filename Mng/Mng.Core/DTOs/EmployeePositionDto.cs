using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.DTOs
{
    public class EmployeePositionDto
    {
        public int PositionId { get; set; }

        public bool Administrative { get; set; }
        public DateTime StartPosition { get; set; }

    }
}
