using ETicaretAPI.Application.Abstractions.Token;
using ETicaretAPI.Application.Dtos;
using ETicaretAPI.Domain.Entites.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Commands.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResult>
    {
        readonly UserManager<Domain.Entites.Identity.AppUser> _userManager;
        readonly SignInManager<Domain.Entites.Identity.AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;
        public LoginUserCommandHandler(UserManager<Domain.Entites.Identity.AppUser> userManager, SignInManager<Domain.Entites.Identity.AppUser> signInManager, ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }

        public async Task<LoginUserCommandResult> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entites.Identity.AppUser appUser = await _userManager.FindByNameAsync(request.UserNameOrEmail);
            if (appUser == null)
            {
                appUser = await _userManager.FindByEmailAsync(request.UserNameOrEmail);

            }
            if (appUser == null)
            {
                throw new DirectoryNotFoundException("kullanıcı yok");
            }

            SignInResult result = await _signInManager.CheckPasswordSignInAsync(appUser, request.Password, false);
            if (result.Succeeded)
            {
                TokenResponseDto token = _tokenHandler.CreateAccessToken(5000);
                return new()
                {
                    Token = token,
                    Message = "token geldi"
                };
            }


            return new()
            {
                Token=null,
                Message = "Token yok"
            };




        }
    }
}
