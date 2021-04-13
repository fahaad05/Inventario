import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UserListComponent } from 'app/pages/user/list/user-list.component';
import { GarmentListComponent } from 'app/pages/garment/garment-list.component';
import { MovementGarmentComponent } from 'app/pages/movement-garment/movement-garment.component';
import { MovementUserComponent } from 'app/pages/movement-user/movement-user.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user',     component: UserListComponent },
  { path: 'garment',     component: GarmentListComponent },
  { path: 'movement-garment/:id',     component: MovementGarmentComponent },
  { path: 'movement-user/:id',     component: MovementUserComponent },
  { path: 'table', component: TableComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'notifications', component: NotificationsComponent }
];
