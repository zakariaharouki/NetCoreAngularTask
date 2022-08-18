import { Component, OnInit ,OnChanges} from '@angular/core';
import { LoadUsersService } from 'src/app/Services/load-users.service';
import { DeleteService } from 'src/app/Services/delete.service';
import { ApproveService } from 'src/app/Services/approve.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon'
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  UserList: any = [];
  User: any;
  result: any;
  snackmessage: any = null;
  
  constructor(
    private http: HttpClient,
    public loadusersservice: LoadUsersService,
    public approveservice: ApproveService,
    public router: Router,
    public deleteservice: DeleteService,
    private matsnackbar: MatSnackBar
  ) { }
  deleteClick(item) {
    this.deleteservice.deleteUser(item).subscribe((data) => {
      this.result =data;
      if (this.result == "Success") {
        this.snackmessage = "User with ID : " + item + "was deleted successfully";
        this.RefreshUsers();
      }
    });
  }
  approveClick(item): void {
    this.approveservice.ApproveUser(item).subscribe((data) => {
      this.result = data;
      if (this.result == 'Success') {
        this.snackmessage = "User with ID : " + item + " was approved";
        this.RefreshUsers();
      }
    });
  }
  ngOnInit(): void {
    if (sessionStorage.getItem("IsLoggedin") == "true" && sessionStorage.getItem("IsAdmin")) {
      this.RefreshUsers();
    }
    else {
      this.router.navigate(["login"]);
    }
   
   
  }

  RefreshUsers():void{
    /*    this.loadusersservice.GetUsers().subscribe(res => { this.UserList = res });*/
    this.loadusersservice.GetUsers().subscribe((data) => {
      this.UserList = data;

    });
    if (this.snackmessage !== null) {
      this.matsnackbar.open(this.snackmessage, "Dismiss");
    }
  }

}
