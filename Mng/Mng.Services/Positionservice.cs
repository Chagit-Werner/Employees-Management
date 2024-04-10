using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Services
{
    public class Positionservice:IPositionService
    {
        readonly IPositionRepository _positionRepository;
        public Positionservice(IPositionRepository p)
        {
            _positionRepository = p;
        }
        public async Task<IEnumerable<Position>> GetAllAsync()=>  await _positionRepository.GetAllAsync();
        
        



    }
}
