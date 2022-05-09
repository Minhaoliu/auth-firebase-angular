import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(res => !!res ? this.isLoggedIn = true : this.isLoggedIn = false)
  }

}