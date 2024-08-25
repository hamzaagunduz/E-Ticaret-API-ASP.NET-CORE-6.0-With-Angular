import { AfterViewInit, Component, ViewChild ,OnInit, Output, EventEmitter} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { DeleteDirective } from '../../../../directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { FileUploadComponent } from '../../../../services/common/file-upload/file-upload.component';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,DeleteDirective,DeleteDialogComponent,FileUploadComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})


export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'price', 'stock','createdTime','updateTime','delete','photos'];

  dataSource : MatTableDataSource<List_Product>=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( spinner:NgxSpinnerService, private productService:ProductService,private alertifyService:AlertifyService ,private dialogService:DialogService) 
   {
    super(spinner)
  }

async getProducts(){
  
  this.showSpinner(SpinnerType.BallAtom)
  const product:{totalCount:number,products:List_Product[]} =await this.productService.read(this.paginator?  this.paginator.pageIndex:1, this.paginator? this.paginator.pageSize:5,
    ()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=>this.alertifyService.message(errorMessage,{
    dismissOthers: true,
    messageType: MessageType.Error,
    position: Position.TopRight
  }))


  this.dataSource = new MatTableDataSource<List_Product>(product.products);
  this.paginator.length=product.totalCount;

}

async onChangedPage(){
 await this.getProducts();
}

 async ngOnInit() {
 await this.getProducts();
  }

delete(id){
  alert(id)
}

addProductImages(id: string) {
  this.dialogService.openDialog({
    componentType: SelectProductImageDialogComponent,
    data: id,
    options: {
      width: '1800px',  // İhtiyacınıza göre genişliği ayarlayın
      height: '700px'  ,
      },
    
  });
}


 

}