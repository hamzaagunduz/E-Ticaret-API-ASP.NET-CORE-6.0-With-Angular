using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Commands.AppUser.LoginUser
{
    public class LoginUserCommandRequest:IRequest<LoginUserCommandResult>
    {
        public string UserNameOrEmail { get; set; }
        public string Password { get; set; }
    }
}
