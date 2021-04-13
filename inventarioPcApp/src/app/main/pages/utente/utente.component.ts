import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utente } from '../../../models/utente';
import { UtenteService } from '../../../services/utente.service';

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent implements OnInit {

  utenti: Utente[];

  constructor(private utenteService: UtenteService){}

  ngOnInit() {
    this.getUtenti();
  }

  public getUtenti(): void {
     this.utenteService.getUtenti().subscribe(
      (response: Utente[]) => {
        this.utenti = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
