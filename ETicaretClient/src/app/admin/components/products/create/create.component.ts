  import { Component, EventEmitter, Output } from '@angular/core';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
  import { MatButtonModule } from '@angular/material/button';
  import { ProductService } from '../../../../services/models/product.service';
  import { Create_Product } from '../../../../contracts/create_product';
  import { BaseComponent, SpinnerType } from '../../../../base/base.component';
  import { NgxSpinnerService } from 'ngx-spinner';
  import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadComponent, FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
  


  @Component({
    selector: 'app-create',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,FileUploadComponent],
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss'
  })


  export class CreateComponent extends BaseComponent
  {
    constructor(spinner:NgxSpinnerService ,private productService:ProductService,private alertify:AlertifyService){
      super(spinner)
    }

    @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
    @Output() fileUploadOptions:Partial<FileUploadOptions>={
      controller:"products",
      action:"upload",
      explanation:"Resimleri seç",
      isAdminPage:true,
      accept:".png,.jpg"
    }

    create(name:HTMLInputElement, stock:HTMLInputElement, price:HTMLInputElement){
      this.showSpinner(SpinnerType.BallAtom)

      const create_produt:Create_Product=new Create_Product();

      create_produt.name=name.value
      create_produt.stock=parseInt(stock.value)
      create_produt.price=parseFloat(price.value)

      this.productService.create(create_produt, () => {
        this.hideSpinner(SpinnerType.BallAtom);

        this.alertify.message("Ürün başarıyla eklenmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.createdProduct.emit(create_produt);
      },errorMessage => {
        this.alertify.message(errorMessage,
          {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
          
    
        });

    }



  }
