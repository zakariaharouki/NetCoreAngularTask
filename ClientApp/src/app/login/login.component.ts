import { Component, OnInit, NgModule } from '@angular/core';
import {
  FormGroup, FormControl, MinValidator,
  NgForm,
  Validators, ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../Services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, public myservice: LoginService, public router: Router, public matsnackbar: MatSnackBar) { }
  loginForm = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });
  LoginEmail: any
  LoginPassword: any
  result: any
  encPassword: any;
  ngOnInit(): void { }
  async onFormSubmit() {
    debugger
    this.LoginEmail = this.loginForm.controls.Email.value;
    this.LoginPassword = this.loginForm.controls.Password.value;
    /*    this.encPassword = CryptoJS.AES.encrypt(this.LoginPassword, "n@F_hmI5h@zu").toString();*/
    await this.myservice.login(this.LoginEmail, this.LoginPassword)
      .subscribe(res => {
        this.result = res;
        console.log(this.result);
        debugger
        if (this.result == "Success:Admin") {
          sessionStorage.setItem("IsLoggedin", "true");
          sessionStorage.setItem("IsAdmin", "true");
          sessionStorage.setItem("SessionEmail", this.LoginEmail);
          this.router.navigate(['Dashboard']);
        }
        else if (this.result == "Success:User") {
          sessionStorage.setItem("IsLoggedin", "true");
          sessionStorage.setItem("IsUser", "true");
          sessionStorage.setItem("SessionEmail", this.LoginEmail);
          this.router.navigate(['user-home']);
        }
        else if (this.result == "Success:Guest") {
          sessionStorage.setItem("IsLoggedin", "true");
          sessionStorage.setItem("IsGuest", "true");
          sessionStorage.setItem("SessionEmail", this.LoginEmail);
          this.router.navigate(['guest-home']);
        }
        else if (this.result == "Failed") {
          this.matsnackbar.open("Wrong Credentials", "Dismiss");
        }
        else if (this.result == "Not Approved") {
          this.matsnackbar.open("Account not approved yet", "Dismiss");
        }
      });
    
  }
}
