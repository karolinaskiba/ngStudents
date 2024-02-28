import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://ngapp-f736b-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}
  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.apiUrl + '/users.json');
  }
  addUser(data: UserInterface): Observable<any> {
    return this.http.post(this.apiUrl + '/users.json', data);
  }
}
