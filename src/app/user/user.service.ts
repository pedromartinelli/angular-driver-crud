import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://10.145.57.235:8080/api/usuarios');
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(
      'http://10.145.57.235:8080/api/usuarios/' + userId
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://10.145.57.235:8080/api/usuarios', user);
  }

  updateUser(user: User): Observable<User> {
    console.log('Entrei');
    return this.http.put<User>(
      'http://10.145.57.235:8080/api/usuarios/' + user.id,
      user
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(
      'http://10.145.57.235:8080/api/usuarios/' + userId
    );
  }
}
