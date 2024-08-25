import { Component } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})


export class   OrdersComponent  extends BaseComponent{


  
  constructor( spinner: NgxSpinnerService) {
    super(spinner);
    
  }
}
