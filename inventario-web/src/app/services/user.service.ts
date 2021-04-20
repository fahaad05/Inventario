import { Injectable } from '@angular/core';
import { User as User } from 'app/models/User';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { GarmentService } from './garment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  private usersSource = new Subject<User[]>();
  users$ = this.usersSource.asObservable();

  constructor(private http: HttpClient, private garmentService: GarmentService) {}

  public getUsersHttp(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public getUsers(usersList: User[]): User[] {
    this.getUsersHttp().subscribe(
      (response: User[]) => {
        usersList = response;
        this.setNewUsers(response);
        return usersList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.garmentService.showNotification('top','right',4);
      }
    );
    return null;
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/id/${userId}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  setNewUsers(users: User[]) {
    this.usersSource.next( users );
  }

}
