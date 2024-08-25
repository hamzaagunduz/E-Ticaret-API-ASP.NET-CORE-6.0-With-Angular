import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/models/product.service';
import { MatDialog ,MatDialogClose} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: true
})
export class DeleteDirective {

  constructor(private elementRef: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private httpClientService:HttpClientService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
  ) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(elementRef.nativeElement, img);

  }

  @Input() id: string
  @Input() controller:string
  @Output() callBack:EventEmitter<any>=new EventEmitter

     
  @HostListener("click")
  async onclick() {
    
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed: async () => { 
           const td: HTMLTableCellElement = this.elementRef.nativeElement
        await this.httpClientService.delete({
          controller:this.controller
        },this.id).subscribe(data=>{
          $(td.parentElement).fadeOut(900,()=>{this.callBack.emit()})
          this.alertifyService.message("Ürün silindi",{
            dismissOthers:true,
            position:Position.TopRight,
            messageType:MessageType.Success
          })
        },(errorResponse:HttpErrorResponse)=>{
          this.alertifyService.message("Ürün silinirken bir hata oluştu",{
            dismissOthers:true,
            position:Position.TopRight,
            messageType:MessageType.Warning
          })
        })}
    })



  
  }



 openDialog(afterClosed: any): void {
   const dialogRef = this.dialog.open(DeleteDialogComponent, {
     width: '250px',
     data: DeleteState.Yes,
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result == DeleteState.Yes)
       afterClosed();
   });
  }
}

export enum DeleteState {
  Yes,
  No
}