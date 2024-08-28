using ETicaretAPI.Application.Exceptions;
using ETicaretAPI.Domain.Entites.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Commands.AppUser.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly UserManager<Domain.Entites.Identity.AppUser> _userManager;

        public CreateUserCommandHandler(UserManager<Domain.Entites.Identity.AppUser> userManager)
        {
            this._userManager = userManager;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                  UserName = request.Username,
                Email = request.Email,
                NameSurname = request.NameSurname

            }, request.Password) ;

            return new()
            {
                Message = "dsadas",
                Succeeded = result.Succeeded,
            };
        }
    }
}
