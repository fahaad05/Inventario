import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Garment } from 'app/models/Garment';
import { Movement } from 'app/models/Movement';
import { User } from 'app/models/User';
import { GarmentService } from 'app/services/garment.service';
import { MovementService } from 'app/services/movement.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'movement-create',
  templateUrl: './movement-create.component.html',
  styleUrls: ['./movement-create.component.css']
})
export class MovementCreateComponent implements OnInit {

  createMovementForm: FormGroup;
  users: User[] = [];
  garments: Garment[] = [];
  allGarments: Garment[] = [];
  selectedGarments: number[];
  selectedUserId: number;
  model: NgbDateStruct;

  constructor(private fb: FormBuilder, private userService: UserService, private garmentService: GarmentService,
    private movementService: MovementService) { }

  ngOnInit(): void {

    this.garmentService.garments$.subscribe(
      garments => this.allGarments = garments);

    this.userService.users$.subscribe(
      users => this.users = users);

    this.createMovementForm = this.fb.group({
      name: ['', Validators.required],
      garmentsList: ['', Validators.required],
      date: []
    });
  }

  onSubmit() {
    document.getElementById("add-movement-form-close").click();

    this.selectedGarments.forEach(i => {
      let movement: Movement = {
        userId: this.selectedUserId,
        garmentId: i
      };
      this.movementService.addMovement(movement).subscribe(
        (response: Movement) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.warn(error.message);
        }
      )
    });

    this.createMovementForm.reset();

    setTimeout(() => {
      this.getGarments();
      this.getUsers();
    }, 1000);

  }

  onOpenMovementModal() {

    this.getAvailableGarments();
    this.getUsers();

    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    button.setAttribute('data-target', '#addMovementModal')

    container.appendChild(button);
    button.click();
  }

  public getAvailableGarments(): void {
    this.garmentService.getAvailableGarments().subscribe(
      (response: Garment[]) => {
        this.garments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public getGarments(): void {
    this.allGarments = this.garmentService.getGarments(this.allGarments);
  }

  public getUsers(): void {
    this.users = this.userService.getUsers(this.users);
  }

}
