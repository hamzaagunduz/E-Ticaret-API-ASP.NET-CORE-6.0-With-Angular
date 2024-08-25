import { MatDialogRef } from "@angular/material/dialog";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { inject } from "@angular/core";

export class BaseDialog<DialogComponent> {
    constructor(public dialogRef: MatDialogRef<DialogComponent>) {
  
    }
  
    close() {
      this.dialogRef.close();
    }
  }
