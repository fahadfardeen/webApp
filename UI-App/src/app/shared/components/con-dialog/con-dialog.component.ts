import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-con-dialog',
  templateUrl: './con-dialog.component.html',
  styleUrls: ['./con-dialog.component.css']
})
export class ConDialogComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(
      private dialogRef: MatDialogRef<ConDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

  }

  ngOnInit() {

  }
  close() {
      this.dialogRef.close();
  }
}