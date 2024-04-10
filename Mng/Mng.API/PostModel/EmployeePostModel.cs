    using Mng.Core.Entities;
    using System.ComponentModel.DataAnnotations;

    namespace Mng.API.PostModel
    {
        public class EmployeePostModel
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string ID_Number { get; set; }
            public DateTime StartWorking { get; set; }
            public DateTime BirthDate { get; set; }
            public Gender Gender { get; set; }
            public List<EmployeeInPositionPostmodel> EmployeeInPositions { get; set; }

        }
    }
