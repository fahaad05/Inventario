import { Routes } from '@angular/router';

import { UserListComponent } from 'app/pages/user/list/user-list.component';
import { GarmentListComponent } from 'app/pages/garment/garment-list.component';
import { MovementGarmentComponent } from 'app/pages/movement-garment/movement-garment.component';
import { MovementUserComponent } from 'app/pages/movement-user/movement-user.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'user',     component: UserListComponent },
  { path: 'not-found',     component: NotFoundComponent },
  { path: 'garment',     component: GarmentListComponent },
  { path: 'garment/movement-garment/:id',     component: MovementGarmentComponent },
  { path: 'user/movement-user/:id',     component: MovementUserComponent },
];
