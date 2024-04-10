using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Services
{
    public class AuthenticationService:IAuthService
    {
        public async Task<bool> LoginAsync(string username, string password) =>
            username == "admin" && password == "123456";
     
    }
}
