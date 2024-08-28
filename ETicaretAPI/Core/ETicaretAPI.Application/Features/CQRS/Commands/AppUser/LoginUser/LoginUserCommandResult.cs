using ETicaretAPI.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Commands.AppUser.LoginUser
{
    public class LoginUserCommandResult
    {
        public TokenResponseDto Token { get; set; }
        public string Message { get; set; }
    }
}
