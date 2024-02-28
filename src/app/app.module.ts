import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';

import { UsersService } from './services/users.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
        },
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    StudentsModule,
    AuthModule,
    provideAuth(() => getAuth()),
  ],
  providers: [UsersService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
