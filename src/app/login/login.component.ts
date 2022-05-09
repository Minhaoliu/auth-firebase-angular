import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean;
  errorMessage: string = '';
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(res => {
      if(!!res) {
        this.router.navigate(['landing']);
      }
    })
  }

  login(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).subscribe(res => {
      this.router.navigate(['landing']);
    }, err => {
      this.errorMessage = err;
    })
  }

}