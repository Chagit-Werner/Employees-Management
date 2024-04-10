using AutoMapper;
using Mng.API.PostModel;
using Mng.Core.Entities;
using System.Data;

namespace Mng.API.Mapping
{
    public class ApiMapping:Profile
    {
        public ApiMapping()
        {
            CreateMap<Employee, EmployeePostModel>().ReverseMap();
            CreateMap<EmployeeInPosition, EmployeeInPositionPostmodel>().ReverseMap();
        }
    }
}
