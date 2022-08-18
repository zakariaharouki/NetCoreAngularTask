import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  constructor(private httpClient: HttpClient) { }
  url: any;
  public ApproveUser(userid: any): Observable<any> {
    this.url = 'https://localhost:7299/Main/ApproveUser?id=' + userid;
    return this.httpClient.get<any>(this.url);
  }
}
