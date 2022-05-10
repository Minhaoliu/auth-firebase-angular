import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}


  
  getAllProducts() {
    return this.authService.$user.pipe(
      take(1),
      mergeMap(user => {
        let params =  new HttpParams().set('auth', user.token);
        return this.http.get('https://auth-project-2578e-default-rtdb.firebaseio.com/products.json', {params})
      })
    )
  }
}