import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/Product';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { CartxProduct, ShoppingCart } from './../../models/Shopping-Cart';
import { PaymentsService } from './../../services/payments.service';
import { Payment, Shipping, OrderProduct, Order } from './../../models/Payment';
import { FormBuilder, FormsModule, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.css']
})
export class PurchasePageComponent{

}
