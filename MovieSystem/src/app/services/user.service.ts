import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserData } from '../registration/registration.component';
import { Friend } from '../friends/friends.component';

const baseURL = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient){}
  user: UserData;
  addUser(newUser: UserData): Observable<UserData>{
      const headers = { 'content-type': 'application/json'};
      const body = JSON.stringify(newUser);
      return this.http.post<UserData>(baseURL, body, {headers});
  }
  getUsers(): Observable<UserData[]>{
    return this.http.get<UserData[]>(baseURL);
  }
  getUser(username: string): Observable<UserData>{
    return this.http.get<UserData>(baseURL + `/${username}`);
  }
  getUserByEmail(email: string): Observable<UserData>{
    return this.http.get<UserData>(baseURL + `/${email}/1`);
  }
  editUser(username: string, editedUser: UserData): Observable<UserData>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(editedUser);
    return this.http.patch<UserData>(baseURL + `/${username}`, body, {headers});
  }
  addFriend(id: string, friendName: Friend): Observable<UserData>{
    this.user = JSON.parse(localStorage.getItem('user'));
    const findIndex = this.user.friends.indexOf(friendName);
    if (findIndex === -1){
      this.user.friends.push(friendName);
    }else{
      this.user.friends.splice(findIndex, 1);
    }
    localStorage.setItem('user', JSON.stringify(this.user));
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({friends: friendName});

    return this.http.put<UserData>(baseURL + `/${id}`, body, {headers});
  }

  deleteUser(user: UserData): Observable<UserData> {
    return this.http.delete<UserData>(baseURL + `/${user._id}`);
  }
}
