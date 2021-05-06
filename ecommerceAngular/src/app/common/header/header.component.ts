import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/user/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuth:Boolean = false
  cartItemLen:number
  currentUser:string = ""
  cartSubscription: Subscription
  authSubscription:Subscription
  constructor(private cartService:CartService, private authService: AuthService) { }
  ngOnDestroy(): void {
    if(this.cartSubscription)this.cartSubscription.unsubscribe()

    this.authSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthSubject()
    .subscribe(result=>{
      this.currentUser = result.currentUserRole
      this.isAuth = result.isAuthenticated
      if(this.cartSubscription)this.cartSubscription.unsubscribe()

      if (this.currentUser=="user"){

        this.cartSubscription = this.cartService.getCartUpdate().
        subscribe(result=>{
        this.cartItemLen = result.cartItemLength
      })
      }
    })

  }
  logout(){
    this.authService.logoutUser()
  }

}
