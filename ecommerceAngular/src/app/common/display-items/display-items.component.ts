import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcomNotificationService } from 'src/app/ecom-notification.service';
import { Item } from '../item.model';
import { ItemService } from '../../admin/items.service';
import { CartService } from 'src/app/user/cart.service';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements OnInit {
  items:Item[]
  
  showConfirmation:boolean = false
  itemId:string
  currentUser:string = "user"
  constructor(private itemService:ItemService, public notification:EcomNotificationService, public router:Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.itemService.getItems().
    subscribe(data=>{
      this.items = data.items
    })
  }

  setShowConfirmation(){
    // console.log(this.itemId)
    this.showConfirmation = !this.showConfirmation
  }

  deleteItem(){
    this.itemService.deleteItem(this.itemId).subscribe(res=>{
      console.log(res);
      this.items = this.items.filter(data=>{
        return data.id!=this.itemId
      })
      this.notification.showSuccess('Item is successfully deleted',null)
    },
    err=>{
      console.log(err)
      this.notification.showError('Item deletion failed',null)
    })
  }

  callEdit(){  
    this.router.navigate([`/admin/edit-item/${this.itemId}`])
  }

  addToCart(item:Item){
    this.cartService.addToCart(item)
  }
}
