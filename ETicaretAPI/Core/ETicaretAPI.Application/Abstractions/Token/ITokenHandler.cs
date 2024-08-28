using ETicaretAPI.Application.Dtos;
using ETicaretAPI.Domain.Entites.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Abstractions.Token
{
    public interface ITokenHandler
    {
        TokenResponseDto CreateAccessToken(int second,AppUser appUser);
        public string CreateRefreshToken();
    }
}
