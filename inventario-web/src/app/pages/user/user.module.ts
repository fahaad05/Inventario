// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UserListComponent } from './list/user-list.component';
// import { UserDetailComponent } from './detail/user-detail.component';
// import { UserDetailModule } from './detail/user-detail.module';
// import { Routes } from '@angular/router';

// const routes: Routes = [
// 	{
// 		path: '',
// 		component: UserListComponent
// 	},
// 	{
// 		path: 'create',
// 		loadChildren: () => import('./detail/user-detail.module').then(m => m.UserDetailModule),
// 	},
// 	{
// 		path: ':id/edit',
// 		loadChildren: () => import('./detail/user-detail.module').then(m => m.UserDetailModule)
// 	}
// ];

// @NgModule({
//   declarations: [

//   ],
//   imports: [
//     CommonModule,
//     UserDetailModule
//   ],
//   providers: [],
//   entryComponents: [UserDetailComponent]
// })
// export class UserModule { }
