import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private _router: Router,
    private snackBar: SnackBarService
  ) {}

  refisterForm = new FormGroup({
    password: new FormControl<string | null>(null, Validators.required),
    username: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });
  register() {
    this.authService
      .register({
        email: this.refisterForm.controls.email.value || '',
        password: this.refisterForm.controls.password.value || '',
        username: this.refisterForm.controls.username.value || '',
      })
      .subscribe({
        next: () => {
          this._router.navigate(['./']);
        },
        error: (err) =>
          this.snackBar.openSnackBar(err.message + 'update error'),
      });
  }
}
