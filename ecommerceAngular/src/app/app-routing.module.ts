import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateItemsComponent } from "./admin/create-items/create-items.component";
import { DisplayItemsComponent } from "./common/display-items/display-items.component";
import { EditItemsComponent } from "./admin/edit-items/edit-items.component";
import { CartitemsComponent } from "./user/cartitems/cartitems.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";

export const appRoutes:Routes=[
    {path:'admin/create', component:CreateItemsComponent},
    {path:'', component:DisplayItemsComponent},
    {path:'admin/edit-item/:itemId', component:EditItemsComponent},
    {path:'user/cart', component:CartitemsComponent},
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
    
})

export class AppRoute{

}