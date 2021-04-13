import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Garment } from 'app/models/Garment';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarmentService {

  private apiServerUrl = environment.apiBaseUrl;
  private garmentsSource = new Subject<Garment[]>();
  garments$ = this.garmentsSource.asObservable();

  constructor(private http: HttpClient) {}

  public getGarmentsHttp(): Observable<Garment[]> {
    return this.http.get<Garment[]>(`${this.apiServerUrl}/garment/all`);
  }

  public getGarments(garmentsList: Garment[]): Garment[] {
    this.getGarmentsHttp().subscribe(
      (response: Garment[]) => {
        garmentsList = response,
          this.setNewGarments(response);
          return garmentsList;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    return null;
  }

  public getGarmentById(garmentId: number): Observable<Garment> {
    return this.http.get<Garment>(`${this.apiServerUrl}/garment/find/id/${garmentId}`);
  }

  public getAvailableGarments(): Observable<Garment[]> {
    return this.http.get<Garment[]>(`${this.apiServerUrl}/garment/all/available`);
  }

  public addGarment(garment: Garment): Observable<Garment> {
    return this.http.post<Garment>(`${this.apiServerUrl}/garment/add`, garment);
  }

  public updateGarment(garment: Garment): Observable<Garment> {
    return this.http.put<Garment>(`${this.apiServerUrl}/garment/update`, garment);
  }

  public deleteGarment(garmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/garment/delete/${garmentId}`);
  }

  setNewGarments(garments: Garment[]) {
    this.garmentsSource.next( garments );
  }

}
