import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/Users';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getUsers() {
    return this.http.get<User[]>(environment.apiUrl);
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/${id}`);
  }

  addUser(userData: User) {
    return this.http.post<User>(environment.apiUrl, userData);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${environment.apiUrl}/${id}`);
  }

  openSnackBar(id: number, message: string) {
    this.snackBar.open(
      message,
      'OK',
      {duration: 3000}
    );
  }
}
