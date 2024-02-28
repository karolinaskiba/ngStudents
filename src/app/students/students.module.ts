import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { DetailsComponent } from './components/details/details.component';
import { StudentsRoutingModule } from './students.routing.module';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableExampleComponent } from './components/table-example/table-example.component';
import { StudentAddComponent } from './pages/student-add/student-add.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    ListTableComponent,
    DetailsComponent,
    TableExampleComponent,
    StudentAddComponent,
    StudentFormComponent,
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudentsRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentsListComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    ListTableComponent,
    DetailsComponent,
    TableExampleComponent,
    StudentAddComponent,
    StudentFormComponent,
    EditFormComponent,
  ],
})
export class StudentsModule {}
