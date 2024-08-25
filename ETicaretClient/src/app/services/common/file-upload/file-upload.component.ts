import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';



@Component({
  selector: 'app-file-upload',
  standalone: true,
  
  imports: [CommonModule,NgxFileDropModule,MatDialogModule,MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent {
  constructor(private httpClientService :HttpClientService,
              private alertifyService:AlertifyService,
              private toastrService:CustomToastrService,
              private dialog:MatDialog,
              private dialogService:DialogService ,
              private spinner: NgxSpinnerService ){

  }

  public files: NgxFileDropEntry[] ;

 @Input() options:Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData:FormData=new FormData
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,file.relativePath)
      })
    }

    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterClosed:()=>{
        this.spinner.show(SpinnerType.BallAtom)

        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers:new HttpHeaders({"responseType":"blob"})
        },fileData).subscribe(data=>{
    
          const message:string="Dosyalar başarıyla eklendi";
          this.spinner.hide(SpinnerType.BallAtom);

          if(this.options.isAdminPage){
            this.alertifyService.message(message,
              {dismissOthers:true,
                position:Position.TopRight,
                messageType:MessageType.Success
              }
            )
          }
          else{
            this.toastrService.message(message,"Başarılı",{
              messageType:ToastrMessageType.Success,
              position:ToastrPosition.TopRight
            })
    
    
          }
    
        },(errorRespnse:HttpErrorResponse)=>{
          const message:string="Dosyalar  eklenemedi";
          if(this.options.isAdminPage){
            this.alertifyService.message(message,
              {dismissOthers:true,
                position:Position.TopRight,
                messageType:MessageType.Error
              }
            )
          }
          else{
            this.toastrService.message(message,"Hata",{
              messageType:ToastrMessageType.Error,
              position:ToastrPosition.TopRight
            })
    
    
          }
    
        })
      }
    })
   
  }



}

export class FileUploadOptions{
  controller?:string
  action?:string
  queryString?:string
  explanation?:string
  accept?:string
  isAdminPage?:boolean=false
}
