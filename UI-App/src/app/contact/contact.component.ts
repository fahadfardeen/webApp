import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../Service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: any;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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

    // const data = this.contactForm;
    // // tslint:disable-next-line:prefer-for-of
    // for (let index = 0; index < data.length; index++) {
    //   const element = data[index];

    //   console.log(element);
    // }
    console.log('formData' + this.contactForm.value);
    this.contactService
      .contactMe(this.contactForm.value)
      .subscribe((res: any ) => {
        console.log(res);
      });
  }
}
