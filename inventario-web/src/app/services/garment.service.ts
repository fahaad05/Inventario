import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Garment } from 'app/models/Garment';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarmentService {

  private apiServerUrl = environment.apiBaseUrl;
  private garmentsSource = new Subject<Garment[]>();
  garments$ = this.garmentsSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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
        console.log(error.message);
        this.showNotification('top','right',4);
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

  showNotification(from, align, result) {
    // const color = Math.floor(Math.random() * 5 + 1);
    const color = result;

    switch (color) {
      case 1:
        this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Salvato</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 3:
        this.toastr.warning(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 4:
        this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Errore.</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 5:
        this.toastr.show(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
  }
}
