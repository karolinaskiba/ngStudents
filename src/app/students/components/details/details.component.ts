import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserInterface } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() userObj$: Observable<UserInterface>;
  userObj: any;

  student: any;
  constructor(
    private service: FirebaseService,
    private _route: Router,
    private snackBar: SnackBarService,
    private _activRouter: ActivatedRoute
  ) {}

  goToEditPage() {
    let id = this._activRouter.snapshot.paramMap.get('id') || '';
    if (id !== '') this._route.navigate([`students/${id}/edit`]);
  }

  deteleStudent() {
    let id = this._activRouter.snapshot.paramMap.get('id') || '';
    this.service
      .deleteStudent(id)
      .then(() => {
        this._route.navigate([`/students`]);
        this.snackBar.openSnackBar('success');
      })
      .catch((err) => this.snackBar.openSnackBar(err.message + 'update error'));
  }
  ngOnInit() {
    this.userObj$.subscribe({
      next: (obj: UserInterface) => {
        this.userObj = obj;
      },
      error: (err) => this.snackBar.openSnackBar(err.message + 'update error'),
    });
  }
}
