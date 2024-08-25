import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';

import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';


declare var $:any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe, HomeComponent, FormsModule, CommonModule, AdminComponent,RouterOutlet,RouterLink,NgxSpinnerModule],
  templateUrl: './app.component.html',

  styleUrl: './app.component.scss',

})
export class AppComponent  {

constructor() {
  
}







}

