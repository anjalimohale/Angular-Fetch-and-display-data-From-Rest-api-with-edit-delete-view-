import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';

@Injectable()
export class UserService {

  private serviceUrl = 'https://reqres.in/api/users';
  
  constructor(private http: HttpClient) { }

  nextUrl:any;

  getPage(currentPage): Observable<any> {
        this.nextUrl = this.serviceUrl+"?page="+currentPage;
        return this.http.get(this.nextUrl, {responseType: 'json'}); 
   } 
}