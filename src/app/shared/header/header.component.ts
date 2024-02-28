import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrower = new EventEmitter();
  constructor(
    private authService: AuthService,
    private _router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {}

  onToggleDrower() {
    this.toggleDrower.emit();
  }
  login() {
    this._router.navigate([`/login`]);
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.snackBar.openSnackBar('logout');
        this._router.navigate([`/`]);
      },
      error: (err) => {
        this.snackBar.openSnackBar('error' + err.message);
      },
    });
  }
}
