import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../Service/contact.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConDialogComponent } from '../shared/components/con-dialog/con-dialog.component';
//npm install --save @angular/material
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: any;

  constructor(private fb: FormBuilder, private contactService: ContactService, private dialog: MatDialog) {
    this.contactForm = this.fb.group(
      {
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required],
      },
      {}
    );
  }

  ngOnInit(): void {
  
  }

  contactHandler(): void {

    console.log('formData' + this.contactForm.value);
    this.contactService
      .contactMe(this.contactForm.value)
      .subscribe((res: any ) => {
        console.log(res);
      });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width="30%";
      this.dialog.open(ConDialogComponent, dialogConfig);

  }
}
