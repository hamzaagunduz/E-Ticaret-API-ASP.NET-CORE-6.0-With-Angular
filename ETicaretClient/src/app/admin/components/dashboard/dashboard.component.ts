import { Component, OnInit } from '@angular/core';
import {AlertifyOptions, AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit{

  constructor( spinner: NgxSpinnerService) {
    super(spinner);
    
  }


  ngOnInit(): void {

  }
  

  }