import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadUsersService {

  constructor(private httpClient: HttpClient) { }
  url: any;
  public GetUsers(): Observable<any> {
    this.url = 'https://localhost:7299/Main/GetAllUsers';
    return this.httpClient.get<any>(this.url);
  }
  public GetUser(Email: string): Observable<any> {
    this.url = 'https://localhost:7299/Main/GetUser?Email=' + Email;
    return this.httpClient.get<any>(this.url);
  }
}
