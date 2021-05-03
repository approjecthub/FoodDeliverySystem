import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { DisplayItemsComponent } from './common/display-items/display-items.component';
import { CreateItemsComponent } from './admin/create-items/create-items.component';
import { AppRoute } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EditItemsComponent } from './admin/edit-items/edit-items.component';
import { CartitemsComponent } from './user/cartitems/cartitems.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayItemsComponent,
    CreateItemsComponent,
    EditItemsComponent,
    CartitemsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoute,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
})
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
