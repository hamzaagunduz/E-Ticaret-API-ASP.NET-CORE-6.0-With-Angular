import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent extends BaseComponent implements OnInit {

  constructor( spinner: NgxSpinnerService) {
    super(spinner);
    
  }
  ngOnInit() {

    // this.showSpinner(SpinnerType.BallAtom)
    
  }
}
