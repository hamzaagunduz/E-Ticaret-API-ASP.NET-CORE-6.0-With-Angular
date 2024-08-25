import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent, FileUploadOptions } from "../../services/common/file-upload/file-upload.component";
import {MatCardModule} from '@angular/material/card';
import { ProductService } from '../../services/models/product.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteState } from '../../directives/admin/delete.directive';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FileUploadComponent,MatCardModule,CommonModule],
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {


 
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService
  )  
    {
    super(dialogRef)
  }
  @Output() get options(): Partial<FileUploadOptions> {
    return {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resimini seçin veya buraya sürükleyin...",
      isAdminPage: true,
      queryString: `id=${this.data}`,
      
    };
  }

  images=[]

 async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom)
    this.images=await this.productService.readImages(this.data as string,()=>this.spinner.hide(SpinnerType.BallAtom) );
  } 
  
  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom)
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.BallAtom);
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }

}

export enum SelectProductImageState {
  Close
}
