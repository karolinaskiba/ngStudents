import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  userObj$!: Observable<UserInterface>;
  id: string;
  constructor(
    private service: FirebaseService,
    private _activRouter: ActivatedRoute
  ) {
    this.id = this._activRouter.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.id !== '') {
      this.userObj$ = this.service.getStudent(this.id);
    }
  }
}
