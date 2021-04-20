import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Garment } from 'app/models/Garment';
import { GarmentService } from 'app/services/garment.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  private users: User[];
  private garments: Garment[];

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router, private userService: UserService,
    private garmentService: GarmentService) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });

    this.userService.users$.subscribe(
      users => this.users = users);

    this.garmentService.garments$.subscribe(
      garments => this.garments = garments);
  }

  public search(key: string): void {
    if (document.getElementById("garment-list"))
      this.searchGarment(key);
    else {
      if (document.getElementById("user-list"))
        this.searchUser(key);
    }
  }

  public searchUser(key: string): void {
    const results: User[] = [];
    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }

    if (results.length === 0 || !key) {
      this.getUsers();
    }
    else {
      this.users = results;
      this.userService.setNewUsers(results);
    }
  }

  public searchGarment(key: string): void {
    const results: Garment[] = [];
    for (const garment of this.garments) {
      if (garment.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(garment);
      }
    }

    if (results.length === 0 || !key) {
      this.getGarments();
    }
    else {
      this.garments = results;
      this.garmentService.setNewGarments(results);
    }
  }

  public getUsers(): void {
    this.users = this.userService.getUsers(this.users);
  }

  public getGarments(): void {
    this.garments = this.garmentService.getGarments(this.garments);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Magazzino';
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

}
