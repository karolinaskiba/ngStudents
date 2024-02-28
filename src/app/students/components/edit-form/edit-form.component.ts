import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user.model';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  @Output() edit: EventEmitter<{ id: string; data: UserInterface }>;
  @Input() userObj$: Observable<UserInterface>;
  userObj: UserInterface;

  constructor(
    private _activRouter: ActivatedRoute,
    private snackBar: SnackBarService
  ) {
    this.edit = new EventEmitter();
  }

  onSave() {
    let id = this._activRouter.snapshot.paramMap.get('id') || '';
    this.edit.emit({ id: id, data: this.studentForm.value as UserInterface });
  }
  ngOnInit() {
    this.userObj$.subscribe({
      next: (response: UserInterface) => {
        this.studentForm.controls.firstName.setValue(response.firstName);
        this.studentForm.controls.lastName.setValue(response.lastName);
        this.studentForm.controls.phone.setValue(response.phone);
        this.studentForm.controls.school.setValue(response.school);
        this.studentForm.controls.parent.setValue(response.parent);
        this.studentForm.controls.email.setValue(response.email);
      },
      error: (err) => this.snackBar.openSnackBar(err.message + 'update error'),
    });
  }

  studentForm = new FormGroup({
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    phone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    school: new FormControl<string | null | undefined>('', Validators.required),
    parent: new FormControl<string | null | undefined>('', Validators.required),
    email: new FormControl<string | null | undefined>('', [
      Validators.required,
      Validators.email,
    ]),
  });
}
