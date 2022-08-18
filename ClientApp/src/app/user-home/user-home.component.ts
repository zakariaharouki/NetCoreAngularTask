import { Component, OnInit } from '@angular/core';
import { LoadUsersService } from 'src/app/Services/load-users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  MinValidator,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { async } from '@angular/core/testing';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: 0
  };
  constructor(private loadservice: LoadUsersService) { }

  ngOnInit(): void {
    var email = sessionStorage.getItem("SessionEmail");
    this.GetUser(email);
  }
  GetUser(email) {
    this.loadservice.GetUser(email).subscribe(res => {
      console.log(res);
      this.User = res;
    });
  }
}
