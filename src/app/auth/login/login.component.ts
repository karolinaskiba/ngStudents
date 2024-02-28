import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  [x: string]: any;
  constructor(
    private authService: AuthService,
    private _router: Router,
    private snackBar: SnackBarService
  ) {}
  loginForm = new FormGroup({
    password: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });
  login() {
    this.authService
      .login({
        email: this.loginForm.controls.email.value || '',
        password: this.loginForm.controls.password.value || '',
      })
      .subscribe({
        next: () => {
          this._router.navigate(['./students']);
        },
        error: (err) =>
          this.snackBar.openSnackBar(err.message + 'update error'),
      });
  }
  register() {
    this._router.navigate([`login/register`]);
  }
}
