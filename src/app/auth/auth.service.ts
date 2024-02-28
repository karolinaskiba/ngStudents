import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsInterface } from '../models/credentials.model';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { AuthInterface } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private UserData: UserInfo;

  constructor(
    private auth: Auth,
    private router: Router,
    public ngZone: NgZone
  ) {}

  login(credentials: AuthInterface): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    ).then((userCredentials) => {
      this.UserData = userCredentials.user;
      return;
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const primise = signOut(this.auth).then(() => {
      return;
    });
    return from(primise);
  }
  register(credentials: CredentialsInterface): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    ).then((response) =>
      updateProfile(response.user, { displayName: credentials.username })
    );
    return from(promise);
  }

  get user() {
    return this.UserData;
  }
  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    return !!this.UserData;
  }
}
