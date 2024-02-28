import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserInterface } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent {
  constructor(private service: FirebaseService, private _route: Router) {}
  list$!: Observable<UserInterface[]>;
  ngOnInit(): void {
    this.list$ = this.service.getUsers();
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'phone'];

  onAddNew() {
    this._route.navigate([`/students/add`]);
  }
  onDetails(id: string) {
    this._route.navigate([`/students/${id}`]);
  }
}
