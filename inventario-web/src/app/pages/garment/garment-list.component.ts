import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./garment-list.component.css'],
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
        console.log(response);
        this.getGarments();
        addGarmentForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addGarmentForm.reset();
      }
    );
  }

  public onUpdateGarment(garment: Garment): void {
    this.garmentService.updateGarment(garment).subscribe(
      (response: Garment) => {
        console.log(response);
        this.getGarments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteGarment(garmentId: number): void {
    console.log(garmentId);
    this.garmentService.deleteGarment(garmentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getGarments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public searchGarment(key: string): void {
  //   const results: Garment[] = [];
  //   for (const garment of this.garments) {
  //     if (garment.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(garment);
  //     }
  //   }

  //   this.garments = results;
  //   this.garmentService.setNewGarments(results);
  //   if (results.length === 0 || !key) {
  //     this.getGarments();
  //   }
  // }


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
      this.router.navigate(['/movement-garment', garment.id]);
    }
    if (mode === 'delete') {
      this.deleteGarment = garment;
      button.setAttribute('data-target', '#deleteGarmentModal')
    }
    container.appendChild(button);
    button.click();
  }



}
