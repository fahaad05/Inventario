import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Movement } from 'app/models/Movement';
import { User } from 'app/models/User';
import { Garment } from 'app/models/Garment';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private apiServerUrl = environment.apiBaseUrl;

  private garmentMovementsSource = new Subject<Garment>();
  garmentsMovements$ = this.garmentMovementsSource.asObservable();

  private userMovementsSource = new Subject<User>();
  userMovements$ = this.userMovementsSource.asObservable();

  constructor(private http: HttpClient) {}

  public addMovement(movement: Movement): Observable<Movement> {
    return this.http.post<Movement>(`${this.apiServerUrl}/movement/add`, movement);
  }

  public getMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(`${this.apiServerUrl}/movement/all`);
  }

  public getMovementsByGarmentIdWithTypeAssigned(garmentId: number): Observable<Movement[]>{
    return this.http.get<Movement[]>(`${this.apiServerUrl}/movement/find/garment/${garmentId}`);
  }

  public getMovementsByUserIdWithTypeAssigned(userId: number): Observable<Movement[]>{
    return this.http.get<Movement[]>(`${this.apiServerUrl}/movement/find/user/${userId}`);
  }

  public getMovementsByUserIdWithTypeNotAssigned(userId: number): Observable<Movement[]>{
    return this.http.get<Movement[]>(`${this.apiServerUrl}/movement/find/user/${userId}/notAssigned`);
  }

  public updateMovementStatus(movement: Movement, statusId: number): Observable<Movement> {
    return this.http.put<Movement>(`${this.apiServerUrl}/movement/update/status/${statusId}`, movement);
  }

  public deleteMovement(movementId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/movement/delete/${movementId}`);
  }

  setCurrentGarmentMovements(garment: Garment) {
    this.garmentMovementsSource.next( garment );
    console.log(garment);
  }

  setCurrentUserMovements(user: User) {
    this.userMovementsSource.next( user );
  }

}
