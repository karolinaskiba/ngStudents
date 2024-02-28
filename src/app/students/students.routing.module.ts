import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentAddComponent } from './pages/student-add/student-add.component';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';

const ROUTES: Route[] = [
  { path: '', component: StudentsListComponent },
  { path: 'add', component: StudentAddComponent },
  { path: ':id/edit', component: StudentEditComponent },
  { path: ':id', component: StudentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
