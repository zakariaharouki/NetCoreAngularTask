import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  url: any;
 
  public login(Email: string, password: string): Observable<any> {
    this.url =
      'https://localhost:7299/Main';
    return this.httpClient.post(this.url, { Email: Email, Password:password } ,{ responseType: 'text' });
    //, {
    //  headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods': ' GET;POST; PATCH; PUT; DELETE; OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token' })
    //}
  }
}
