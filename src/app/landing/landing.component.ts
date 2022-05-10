import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { exhaustMap, mergeMap, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    
  }

  ngOnInit() {
    this.authService.user.subscribe(res => !!res ? this.isLoggedIn = true : this.isLoggedIn = false);
    this.getAllProducts().subscribe(resp=> console.log(resp));
  }

  getAllProducts() {


    return this.authService.user.pipe(
      exhaustMap((user) => {

        console.log(user.token);
        let params =  new HttpParams().set('auth', user.token);
        return this.http.get('https://auth-project-2578e-default-rtdb.firebaseio.com/products.json', {params: params})

      })
    )



    
  }

}