import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SnackBarService } from '../../../services/snackBar/snackBar.service';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent {
  constructor(
    private service: FirebaseService,
    private _router: Router,
    private snackBar: SnackBarService
  ) {}
  studentForm = new FormGroup({
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    phone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    school: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    parent: new FormControl<string | null | undefined>('', Validators.required),
  });
  onSubmit() {
    this.service
      .addStudent(this.studentForm.value as UserInterface)
      .then(() => {
        this._router.navigate([`/students`]);
        this.snackBar.openSnackBar('success');
      })
      .catch((err) => this.snackBar.openSnackBar('err'));
  }
}
