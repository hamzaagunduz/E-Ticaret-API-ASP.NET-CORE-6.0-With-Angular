import { Component, OnInit } from '@angular/core';
import {AlertifyOptions, AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import signalR from '@microsoft/signalr';
import { SignalrService } from '../../../services/common/signalr.service';
import { ReceiveFunction } from '../../../constans/receive-function';
import { HubUrl } from '../../../constans/hub-url';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit{

  constructor( spinner: NgxSpinnerService,private signalRservice:SignalrService ,private alertfy:AlertifyService) {
    super(spinner);
    signalRservice.start(HubUrl.ProductHub)
  }


  ngOnInit(): void {
    this.signalRservice.on(ReceiveFunction.ProductAddedMessageReceiveFunction,message=>{
      this.alertfy.message(message,{
        messageType:MessageType.Message,
        position:Position.TopCenter
      })
    })
  }
  

  }