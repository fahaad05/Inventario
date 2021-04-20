import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Garment } from 'app/models/Garment';
import { Movement } from 'app/models/Movement';
import { MovementType } from 'app/models/MovementType';
import { MovementDetail } from 'app/models/MovementDetail';
import { User } from 'app/models/User';
import { GarmentService } from 'app/services/garment.service';
import { MovementService } from 'app/services/movement.service';
import { UserService } from 'app/services/user.service';
import { NgbCalendar, NgbDate, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'movement-garment',
  templateUrl: './movement-garment.component.html',
})
export class MovementGarmentComponent implements OnInit {

  movementList: Movement[] = [];
  users: User[] = [];
  garments: Garment[];
  editMovement: Movement;
  deleteMovement: Movement;
  currentGarment: Garment;
  usernames: MovementDetail[] = [];
  editMovementStateSelected: MovementType = MovementType.ASSEGNATO;
  movDate: NgbDate;

  constructor(private garmentService: GarmentService, private movementService: MovementService, private userService: UserService,
    private route: ActivatedRoute, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {

    this.garmentService.getGarmentById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      (response: Garment) => {
        this.currentGarment = response;
        this.getMovements();
      },
      (error: HttpErrorResponse) => console.log(error.message)
    );

    this.userService.users$.subscribe(
      users => this.users = users);
    this.getUsers();

    this.garmentService.garments$.subscribe(
      garments => this.garments = garments);

  }

  public getMovements(): void {
    if (this.currentGarment) {
      this.usernames = [];
      this.movementService.getMovementsByGarmentIdWithTypeAssigned(this.currentGarment.id).subscribe(
        (response: Movement[]) => {
          this.movementList = response;
          this.movementList.forEach(m => {
            let currUser = this.users.filter(x => x.id == m.userId)[0];
            let u: MovementDetail = {
              name: currUser.name + " " + currUser.surname,
              movementId: m.id
            }
            this.usernames.push(u);
          })
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }
  }

  public onEditMovement(movementId: number, stateId: number): void {

    let date = new Date(
      this.movDate.year,
      this.movDate.month-1,
      this.movDate.day,
    );
    let movement = this.movementList.filter(x => x.id == movementId)[0];
    movement.movementDate = date;

    this.movementService.updateMovementStatus(movement, stateId, date).subscribe(
      (response: Movement) => {
        this.getMovements();
        this.garmentService.showNotification('top','right',2);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.garmentService.showNotification('top','right',4);
      }
    );
  }

  public onDeleteMovement(movementId: number): void {
    this.movementService.deleteMovement(movementId).subscribe(
      (response: void) => {
        this.getMovements();
        this.garmentService.showNotification('top','right',2);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.garmentService.showNotification('top','right',4);
      }
    );
  }

  public onMovementOpenModal(movementDetail: MovementDetail, mode: string): void {
    this.selectToday();

    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'riconsegna') {
      this.editMovement = this.movementList.filter(x => x.id == movementDetail.movementId)[0];
      this.editMovementStateSelected = MovementType.RICONSEGNATO;
      button.setAttribute('data-target', '#editMovementModal')
    }
    if (mode === 'danneggiato') {
      this.editMovement = this.movementList.filter(x => x.id == movementDetail.movementId)[0];
      this.editMovementStateSelected = MovementType.DANNEGGIATO;
      button.setAttribute('data-target', '#editMovementModal')
    }
    if (mode === 'perso') {
      this.editMovement = this.movementList.filter(x => x.id == movementDetail.movementId)[0];
      this.editMovementStateSelected = MovementType.PERSO;
      button.setAttribute('data-target', '#editMovementModal')
    }
    if (mode === 'annulla') {
      this.deleteMovement = this.movementList.filter(x => x.id == movementDetail.movementId)[0];
      button.setAttribute('data-target', '#deleteMovementModal')
    }
    container.appendChild(button);
    button.click();
  }


  public getGarments(): void {
    this.garments = this.garmentService.getGarments(this.garments);
  }

  public getUsers(): void {
    this.users = this.userService.getUsers(this.users);
  }

  public selectToday(): void {
    const today = new Date();
    this.movDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}
