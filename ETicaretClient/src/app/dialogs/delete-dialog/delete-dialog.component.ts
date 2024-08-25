import { Component, inject, model } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogClose  ,MatButtonModule,MatDialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})


export class DeleteDialogComponent {
  constructor(){
    
  }

  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  
  readonly data = inject<any>(MAT_DIALOG_DATA);


  onNoClick(): void {
    this.dialogRef.close();
  }
}