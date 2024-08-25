import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { Create_Product } from '../../../contracts/create_product';
import { DeleteDirective } from '../../../directives/admin/delete.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatSidenavModule, MatFormFieldModule, MatInputModule, MatSelectModule, CreateComponent, ListComponent,DeleteDirective],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  @ViewChild(ListComponent) listComponent: ListComponent;

  constructor(spinner: NgxSpinnerService, private httpClient: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  createdProduct(createdProduct: Create_Product) {
    if (this.listComponent) {
      this.listComponent.getProducts(); // Burada getProducts() metodunun ListComponent'te mevcut olduğundan emin olun
    }
  }
}
