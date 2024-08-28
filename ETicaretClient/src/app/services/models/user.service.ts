import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { User } from '../../contracts/user';
import { Create_User } from '../../contracts/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from '../../contracts/Token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { MessageType } from '../admin/alertify.service';
import { TokenResponse } from '../../contracts/Token/token_response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,
              private toastrService:CustomToastrService
  ) { }
  
  async create(user:User): Promise<Create_User>{
    const obs:Observable<Create_User|User>= this.httpClientService.post<Create_User|User>({
      controller:"user"
    },user)

    return await firstValueFrom(obs) as Create_User
  }


  async login(usernameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{  
    const obs:Observable<any|TokenResponse> =this.httpClientService.post<any|TokenResponse>({
      controller:"user",
      action:"login"
    },{usernameOrEmail,password})

    const tokenResponse:TokenResponse=  await firstValueFrom(obs) as TokenResponse;

    if(tokenResponse){
        localStorage.setItem("accessToken",tokenResponse.token.accessToken)
        localStorage.setItem("expiration",tokenResponse.token.expireDate)
        this.toastrService.message("basarili","Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })
 
    }
    callBackFunction();
  }
}
