import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Garment } from 'app/models/Garment';
import { Movement } from 'app/models/Movement';
import { MovementType } from 'app/models/MovementType';
import { User } from 'app/models/User';
import { GarmentService } from 'app/services/garment.service';
import { MovementService } from 'app/services/movement.service';
import { UserService } from 'app/services/user.service';
import { MovementUserDetail } from 'app/models/MovementUserDetail';
import { OldMovementDetail } from 'app/models/OldMovementDetail';
import { NgbCalendar, NgbDate, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movement-user',
  templateUrl: './movement-user.component.html',
})
export class MovementUserComponent implements OnInit {

  movementList: Movement[] = [];
  users: User[] = [];
  garments: Garment[];
  editMovement: Movement;
  deleteMovement: Movement;
  currentUser: User;
  garmentsDetailList: MovementUserDetail[] = [];
  oldMovements: OldMovementDetail[] = [];
  editMovementStateSelected: MovementType = MovementType.ASSEGNATO;
  movDate: NgbDate;

  constructor(private garmentService: GarmentService, private movementService: MovementService, private userService: UserService,
    private route: ActivatedRoute, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {

    this.userService.getUserById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      (response: User) => {
        this.currentUser = response;
        this.getMovements();
        this.getOldMovements();
      },
      (error: HttpErrorResponse) => console.log(error.message)
    );

    this.userService.users$.subscribe(
      users => this.users = users);

    this.garmentService.garments$.subscribe(
      garments => this.garments = garments);
    this.getGarments();
  }



  public getMovements(): void {
    if (this.currentUser) {
      this.garmentsDetailList = [];
      this.movementService.getMovementsByUserIdWithTypeAssigned(this.currentUser.id).subscribe(
        (response: Movement[]) => {
          this.movementList = response;
          this.movementList.forEach(m => {
            let currGarment = this.garments.filter(x => x.id == m.garmentId)[0];
            let u: MovementUserDetail = {
              name: currGarment.name,
              size: currGarment.size,
              movementId: m.id
            }
            this.garmentsDetailList.push(u);
          })
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.garmentService.showNotification('top', 'right', 4);
        }
      );
    }
  }


  public getOldMovements(): void {
    if (this.currentUser) {
      this.oldMovements = [];
      this.movementService.getMovementsByUserIdWithTypeNotAssigned(this.currentUser.id).subscribe(
        (response: Movement[]) => {
          response.forEach(m => {
            let currGarment = this.garments.filter(x => x.id == m.garmentId)[0];

            let u: OldMovementDetail = {
              name: currGarment.name,
              size: currGarment.size,
              state: m.movementType,
              date: this.dateFromApiFormatToClient(m.movementDate),
            }
            this.oldMovements.push(u);
          });
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
      this.movDate.month - 1,
      this.movDate.day,
    );

    let movement = this.movementList.filter(x => x.id == movementId)[0];

    movement.movementDate = date;
    this.movementService.updateMovementStatus(movement, stateId, date).subscribe(
      (response: Movement) => {
        this.getMovements();
        this.getOldMovements();
        this.garmentService.showNotification('top', 'right', 2);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.garmentService.showNotification('top', 'right', 4);
      }
    );
  }

  public onDeleteMovement(movementId: number): void {
    this.movementService.deleteMovement(movementId).subscribe(
      (response: void) => {
        this.getMovements();
        this.getOldMovements();
        this.garmentService.showNotification('top', 'right', 2);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.garmentService.showNotification('top', 'right', 4);
      }
    );
  }

  public onMovementOpenModal(movementDetail: MovementUserDetail, mode: string): void {
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


  private dateVisualize(date: NgbDate): string {
    return date.day + '/' + date.month + '/' + date.year;
  }

  private dateFromApiFormatToClient(date: Date): string {
    let newDate = null;
    if (date) {
      let tmp = new Date(date);

      newDate = new NgbDate(
        tmp.getFullYear(),
        tmp.getMonth() + 1,
        tmp.getDate());
      return this.dateVisualize(newDate);
    }
    return '';
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
