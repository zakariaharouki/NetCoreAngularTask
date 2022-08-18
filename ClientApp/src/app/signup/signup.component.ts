import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupService } from '../Services/signup.service';
import { LoadUsersService } from 'src/app/Services/load-users.service'
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  MinValidator,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public myservice: SignupService,
    public loadservice: LoadUsersService,
    public matsnackbar: MatSnackBar,
    public router: Router,
  ) { }
  Email: any;
  Password: any;
  registerForm = new FormGroup({
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Role: new FormControl(''),
    Dob: new FormControl('')

  });
  RegEmail: any;
  RegPassword: any;
  RegFirstname: any;
  RegLastname: any;
  RegRole: any;
  RegDob: any;
  encPassword: any;

  ngOnInit(): void { }
  async onFormSubmit() {
    debugger;
    this.RegEmail = this.registerForm.controls.Email.value;
    this.RegFirstname = this.registerForm.controls.Firstname.value;
    this.RegLastname = this.registerForm.controls.Lastname.value;
    this.RegRole = this.registerForm.controls.Role.value;
    this.RegPassword = this.registerForm.controls.Password.value;
    this.RegDob = this.registerForm.controls.Dob.value;
/*    this.encPassword = CryptoJS.AES.encrypt(this.RegPassword, "n@F_hmI5h@zu").toString();*/
    /* console.log(this.encPassword);*/
    //console.log(CryptoJS.AES.decrypt(this.encPassword.trim(), "n@F_hmI5h@zu").toString(CryptoJS.enc.Utf8))
    await this.loadservice.GetUser(this.RegEmail).subscribe(res => {
      console.log(res);
      if (res != null) {
        this.matsnackbar.open("Email already exists", "Dismiss");
      }
      else {
        this.myservice.signup(this.RegEmail, this.RegPassword, this.RegFirstname, this.RegLastname, this.RegDob, this.RegRole).subscribe(res => {
          if (res == '"Success"') {
            this.matsnackbar.open("Registered Successfully", "Dismiss");

          }
        });
      }
    });

  }
}
