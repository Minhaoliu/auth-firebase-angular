import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';
import { ProductService } from '../shared/products/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authService.getLoginInfo().subscribe(info => console.log(info))
    // this.productService.getAllProducts().subscribe((resp) => {
    //     if(!!resp) {
    //       this.isLoggedIn = true; 
    //     }
    //   }
    // );
  }

}