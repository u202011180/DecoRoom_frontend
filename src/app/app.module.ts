import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NavbarLogsignComponent } from './components/navbar-logsign/navbar-logsign.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GlobalNavbarComponent } from './components/global-navbar/global-navbar.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DialogdeleteComponent } from './components/dialogdelete/dialogdelete.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShowProductsComponent } from './components/show-products/show-products.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { PurchasePageComponent } from './components/purchase-page/purchase-page.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { FooterComponent } from './components/footer/footer.component';


//angular material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarLogsignComponent,
    LoginPageComponent,
    SignupPageComponent,
    UserDetailsComponent,
    GlobalNavbarComponent,
    EditUserComponent,
    DialogdeleteComponent,
    ShopFormComponent,
    ShopComponent,
    ShopPageComponent,
    ProductFormComponent,
    MainPageComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    ShowProductsComponent,
    UploadImageComponent,
    ProductFiltersComponent,
    PurchasePageComponent,
    OrdersComponent,
    MyordersComponent,
    FooterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
