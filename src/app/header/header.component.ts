import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private authService: AuthService,) { }

  ngOnInit() {
    this.authService.user.subscribe(res => !!res ? this.isLoggedIn = true : this.isLoggedIn = false)
  }

  signOut() {
    this.authService.signOut();
  }

}