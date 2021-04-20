import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Garment } from 'app/models/Garment';
import { Movement } from 'app/models/Movement';
import { MovementDetail } from 'app/models/MovementDetail';
import { User } from 'app/models/User';
import { GarmentService } from 'app/services/garment.service';
import { MovementService } from 'app/services/movement.service';
import { UserService } from 'app/services/user.service';
@Component({
  selector: 'garment-list',
  templateUrl: './garment-list.component.html',
  moduleId: module.id
})
export class GarmentListComponent implements OnInit {

  garments: Garment[];
  editGarment: Garment;
  deleteGarment: Garment;
  movementList: Movement[] = [];
  movements: MovementDetail[] = [];
  users: User[] = [];

  constructor(private garmentService: GarmentService, private movementService: MovementService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    this.userService.users$.subscribe(
      users => this.users = users);

    this.garmentService.garments$.subscribe(
      garments => this.garments = garments);

    this.getGarments();
  }

  public getGarments(): void {
    this.garments = this.garmentService.getGarments(this.garments);
  }

  public getUsers(): void {
    this.users = this.userService.getUsers(this.users);
  }

  public onAddGarment(addGarmentForm: NgForm): void {
    document.getElementById("add-garment-form-close").click();
    this.garmentService.addGarment(addGarmentForm.value).subscribe(
      (response: Garment) => {
        this.getGarments();
        this.garmentService.showNotification('top','right',2);
        addGarmentForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        addGarmentForm.reset();
        this.garmentService.showNotification('top','right',4);
      }
    );
  }

  public onUpdateGarment(garment: Garment): void {
    this.garmentService.updateGarment(garment).subscribe(
      (response: Garment) => {
        this.getGarments();
        this.garmentService.showNotification('top','right',2);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onDeleteGarment(garmentId: number): void {
    this.garmentService.deleteGarment(garmentId).subscribe(
      (response: void) => {
        this.getGarments();
        this.garmentService.showNotification('top','right',2);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }


  public onOpenModal(garment: Garment, mode: string): void {

    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addGarmentModal')
    }
    if (mode === 'edit') {
      this.editGarment = garment;
      button.setAttribute('data-target', '#editGarmentModal')
    }
    if (mode === 'dotazioni') {
      this.router.navigate(['garment/movement-garment', garment.id]);
    }
    if (mode === 'delete') {
      this.deleteGarment = garment;
      button.setAttribute('data-target', '#deleteGarmentModal')
    }
    container.appendChild(button);
    button.click();
  }



}
