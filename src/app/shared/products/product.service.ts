import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(
    private authService: AuthService
  ) {}


  
  // getAllProducts() {
  //   return this.user.pipe(
  //     take(1),
  //     mergeMap((user) => {
  //       let params =  new HttpParams().set('auth', user.token);
  //       return this.http.get('https://auth-project-2578e-default-rtdb.firebaseio.com/products.json', {params})
  //     })
  //   )
  // }
}