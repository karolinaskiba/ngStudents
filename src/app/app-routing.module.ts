import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'students',
        //canActivate: [AuthGuard],

        loadChildren: () =>
          import('src/app/students/students.module').then(
            (x) => x.StudentsModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((x) => x.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
