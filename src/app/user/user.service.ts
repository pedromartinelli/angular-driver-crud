import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://10.145.57.235:8080/api';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/usuarios`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/usuarios/` + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/usuarios`, user);
  }

  updateUser(user: User): Observable<User> {
    console.log('Entrei');
    return this.http.put<User>(`${this.baseUrl}/usuarios/` + user.id, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/usuarios/` + userId);
  }
}
