import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from 'app/pages/user/list/user-list.component';
import { GarmentListComponent } from 'app/pages/garment/garment-list.component';
import { MovementGarmentComponent } from 'app/pages/movement-garment/movement-garment.component';
import { MovementUserComponent } from 'app/pages/movement-user/movement-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    TableComponent,
    UserListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    GarmentListComponent,
    MovementGarmentComponent,
    MovementUserComponent
  ]
})

export class AdminLayoutModule {}
