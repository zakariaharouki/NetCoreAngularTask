import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}
  url: any;

  public signup(
    Email: string,
    password: string,
    Firstname: string,
    Lastname: string,
    Dob: string,
    Role: string
  ): Observable<any> {
    debugger
    this.url = 'https://localhost:7299/User';
    return this.httpClient.post(
      this.url,
      {
        Email: Email,
        Password: password,
        Firstname: Firstname,
        Lastname: Lastname,
        Dob: Dob,
        Role: Role,
      },
      { responseType: 'text' }
    );
    //, {
    //  headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods': ' GET;POST; PATCH; PUT; DELETE; OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token' })
    //}
  }
}
