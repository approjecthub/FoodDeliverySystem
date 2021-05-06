import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EcomNotificationService } from '../ecom-notification.service';
import { AuthData } from './auth.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: Boolean = false
  private currentUserRole: string = ''
  private authSubject = new Subject<{ currentUserRole: string, isAuthenticated: Boolean }>()

  constructor(private http: HttpClient, private notification: EcomNotificationService, private router:Router) { }

  getAuthdetails(){
    return {isAuthenticated:this.isAuthenticated , currentUserRole:this.currentUserRole}
  }

  getAuthSubject(){
    return this.authSubject.asObservable()
  }

  signupNewUser(email: string, password: string, role: string) {
    const authData: AuthData = { email, password, role }
    console.log(authData);

    this.http.post('http://127.0.0.1:3000/user/signup', authData)
      .subscribe(response => {
        console.log(response)
        this.notification.showSuccess('user is successfully signedup', null)
        this.router.navigate(['/'])
      }, err => {
        console.log(err);
        this.notification.showError("signup failed", null)
      })


  }

  loginUser(loginForm: FormGroup) {

    const authData: AuthData = {
      email: loginForm.value.email,
      password: loginForm.value.password,
      role: loginForm.value.role
    }


    this.http.post<{token:string, duration:number, userid:string, role:string}>('http://127.0.0.1:3000/user/login', authData)
      .subscribe(response => {
        console.log(response)
        this.notification.showSuccess('user is successfully loggedin', null)
        loginForm.reset()
        this.currentUserRole = response.role
        this.isAuthenticated = true
        this.authSubject.next({
          
          currentUserRole: this.currentUserRole,
          isAuthenticated:this.isAuthenticated 
        })
        this.router.navigate(['/'])
      }, err => {
        console.log(err);
        this.notification.showError("login failed", null)
      })
  }

  logoutUser(){
    this.currentUserRole = ''
    this.isAuthenticated = false
    this.authSubject.next({
      currentUserRole: this.currentUserRole,
      isAuthenticated:this.isAuthenticated 
    })
    this.notification.showSuccess('user is successfully loggedin', null)
    this.router.navigate(['/'])
  }
}
