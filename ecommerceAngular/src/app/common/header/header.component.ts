import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/user/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  cartItemLen:number
  currentUser:string = "user"
  cartSubscription: Subscription
  constructor(private cartService:CartService) { }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe()
  }

  ngOnInit(): void {
    if(this.currentUser=="user"){
      this.cartSubscription = this.cartService.getCartUpdate().
      subscribe(result=>{
        this.cartItemLen = result.cartItemLength
      })
    }
  }

}
