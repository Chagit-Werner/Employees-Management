using AutoMapper;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeDto, Employee>().ReverseMap();//מיפוי ל2 הכיוונים.
            CreateMap<EmployeeInPosition, EmployeePositionDto>().ReverseMap();
        }
    }
}
