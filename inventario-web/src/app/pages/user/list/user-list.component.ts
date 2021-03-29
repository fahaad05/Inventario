import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'app/models/User';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'user-list',
  moduleId: module.id,
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  users: User[];
  editUser: User;
  deleteUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onAddUser(addUserForm: NgForm): void {
    document.getElementById("add-user-form-close").click();
    this.userService.addUser(addUserForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addUserForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addUserForm.reset();
      }
    );
  }

  public onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUser(userId: number): void {
    console.log(userId);
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUser(key: string): void {
    const results: User[] = [];
    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
      this.users = results;
      this.userService.setNewUsers(results);

      if (results.length === 0 || !key) {
        this.getUsers();
      }
    }
  }


  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal')
    }
    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#editUserModal')
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal')
    }
    container.appendChild(button);
    button.click();
  }

}