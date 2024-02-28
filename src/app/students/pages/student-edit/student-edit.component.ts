import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit {
  userObj$!: Observable<UserInterface>;
  id: string;

  constructor(
    private service: FirebaseService,
    private _route: Router,
    private snackBar: SnackBarService,
    private _activRouter: ActivatedRoute
  ) {
    this.id = this._activRouter.snapshot.paramMap.get('id') || '';
  }
  getDetails() {}
  onEdit(event: { id: string; data: UserInterface }) {
    this.service
      .updateStudent(event.data, event.id)
      .then(() => {
        this._route.navigate([`students`]);
      })
      .catch((err) => this.snackBar.openSnackBar(err.message + 'update error'));
  }
  ngOnInit(): void {
    if (this.id !== '') {
      this.userObj$ = this.service.getStudent(this.id);
    }
  }
}
