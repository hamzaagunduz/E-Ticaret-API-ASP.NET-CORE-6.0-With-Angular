import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomToastrService } from '../../../services/ui/custom-toastr.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../contracts/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { UserService } from '../../../services/models/user.service';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent{
  LoginForm: FormGroup;
  constructor(   private formBuilder: FormBuilder,
    private toastrService:CustomToastrService,
    spinner: NgxSpinnerService,
    private userService:UserService,
    private authService:AuthService

   )
    {
    super(spinner)
  }


  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom);
      
      await this.userService.login(usernameOrEmail,password,()=>{
        this.hideSpinner(SpinnerType.BallAtom)
        this.authService.identityCheck()
      })
      
  }
  
}
