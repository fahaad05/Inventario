import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Garment } from 'app/models/Garment';
import { Movement } from 'app/models/Movement';
import { MovementType } from 'app/models/MovementType';
import { MovementDetail } from 'app/models/MovementDetail';
import { User } from 'app/models/User';
import { GarmentService } from 'app/services/garment.service';
import { MovementService } from 'app/services/movement.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'movement-garment',
  templateUrl: './movement-garment.component.html',
  styleUrls: ['./movement-garment.component.css']
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

  constructor(private garmentService: GarmentService, private movementService: MovementService, private userService: UserService,
    private route: ActivatedRoute) { }

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
          if(error.status == 404)
          //TODO Notification
          console.log("No movement");
        }
      );
    }
    else {
      console.log("No item selected!");
    }
    // this.usernames.forEach(x => console.log(x));
  }

  public onEditMovement(movementId: number, stateId: number): void {
    // console.log(movementUserDetail);
    console.log("State id:" + stateId);
    let movement = this.movementList.filter(x => x.id == movementId)[0];
    console.log("Movement: "+movement);
    this.movementService.updateMovementStatus(movement, stateId).subscribe(
      (response: Movement) => {
        this.getMovements();
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onDeleteMovement(movementId: number): void {
    console.log(movementId);
    this.movementService.deleteMovement(movementId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMovements();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onMovementOpenModal(movementDetail: MovementDetail, mode: string): void {
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
}
