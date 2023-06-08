import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {Location} from '@angular/common';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/User';
import { ShopsService } from 'src/app/services/shops.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadImageComponent } from './../upload-image/upload-image.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../../models/Shop';
import { Product, Size, Material, Type, Season,ProductImage, Pricetype } from './../../models/Product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  myForm!:FormGroup;
  idproduct!:number;
  idimg!: number;
  shopname!:string;
  preview!:string;
  files:any = [];
  constructor(private activatedRouter:ActivatedRoute,
              private router:Router,
              private formBuilder:FormBuilder,
              private productService:ProductsService,
              private http:HttpClient,
              private snackBar:MatSnackBar,
              private location: Location,
              private sanitizer: DomSanitizer,
              private shopServices: ShopsService,
              private userServices: UsersService) { }

  ngOnInit(): void {
    this.shopname = this.activatedRouter.snapshot.params["shop"];
    this.idproduct= this.activatedRouter.snapshot.params["id"];
    this.getpricetypes();
    this.getSizes();
    this.getMaterials();
    this.getTypes();
    this.getSeasons();
    this.findShop();
    this.getProduct();
    this.loadForm();
  }

  back()
  {
    this.location.back();
  }
  product!:Product;
  getProduct()
  {
    if(this.idproduct != 0 && this.idproduct!= undefined)
    {
      this.productService.getProductId(this.idproduct).subscribe(
        (data:Product)=>{
          this.product = data;
        }
      );
    }
  }
  verifyProduct():boolean{
    if(this.idproduct != undefined && this.idproduct != 0)
    {
      return true;
    }
    else return false;
  }


  image!: ProductImage;
  loadForm()
  {
    this.myForm = this.formBuilder.group(
      {
        name:["",[Validators.required,Validators.maxLength(60)]],
        quantity: ["",[Validators.required]],
        price: ["",[Validators.required]],
        size: ["",[Validators.required]],
        material: ["",[Validators.required]],
        brand: ["",[Validators.required,Validators.maxLength(50)]],
        type: ["",[Validators.required]],
        season: ["",[Validators.required]],
        year: ["",[Validators.required]],
        pricetype: ["",[Validators.required]],
      }
    )
    if((this.idproduct != undefined && this.idproduct != 0)){
      this.productService.getProductId(this.idproduct).subscribe(
        (data:Product) =>{
          this.myForm.get("name")!.setValue(data.name);
          this.myForm.get("quantity")!.setValue(data.quantity);
          this.myForm.get("price")!.setValue(data.price);
          this.myForm.get("brand")!.setValue(data.brand);
          this.myForm.get("year")!.setValue(data.year);
          this.myForm.get("material")!.setValue(data.material);
          this.myForm.get("type")!.setValue(data.type);
          this.myForm.get("size")!.setValue(data.size);
          this.myForm.get("season")!.setValue(data.season);
          this.myForm.get("pricetype")!.setValue(data.pricetype);

          this.productService.getImagesAsAny().subscribe(
            res=>{
              const img = res.find((a:ProductImage)=>{
                return a.id_product == data.id;
              });
              if(img){
                this.image = img;
                this.productService.getImage(img.id).subscribe(
                  (data:ProductImage)=>{
                    this.preview = data.img;
                    console.log(this.preview);
                  }
                );
              }
          });

        }
      );
    }
    else{
      this.idproduct = 0;
      this.idimg = 0;
    }
  }

  user!:User;
  shopfound!:Shop;
  findShop()
  {
    this.shopServices.getShopsAsAny().subscribe(
      res=>{
        const shop = res.find((a:Shop)=>{
          return a.name == this.shopname;
        });
        if(shop)
        {
          this.shopfound = shop;
          this.userServices.getUserId(this.shopfound.idUser).subscribe(
            (data: User) =>{
              this.user = data;
            }
          );
        }
    });
  }

  sizes:Size[] = [];
  getSizes()
  {
    this.productService.getSizes().subscribe(
      (data:Size[]) => {
        this.sizes = data;
      }
    );
  }
  materials:Material[] = [];
  getMaterials()
  {
    this.productService.getMaterials().subscribe(
      (data:Material[]) => {
        this.materials = data;
      }
    );
  }

  types:Type[] = [];
  getTypes()
  {
    this.productService.getTypes().subscribe(
      (data:Type[]) => {
        this.types = data;
      }
    );
  }
  seasons:Season[] = [];
  getSeasons()
  {
    this.productService.getSeasons().subscribe(
      (data:Season[]) => {
        this.seasons = data;
      }
    );
  }
  pricetypes:Pricetype[] = [];
  getpricetypes()
  {
    this.productService.getPricetype().subscribe(
      (data:Pricetype[]) => {
        this.pricetypes = data;
      }
    );
  }

  saveProduct():void
  {
    let date: Date = new Date();
    const product:Product = {
      id: this.idproduct,
      idShop: this.shopfound.id,
      name: this.myForm.get("name")?.value,
      shopname: this.shopfound.name,
      pubdate: date,
      condicion: 'Disponible',
      quantity: Number(this.myForm.get("quantity")?.value),
      price: this.myForm.get("price")?.value,
      size: this.myForm.get("size")?.value,
      material: this.myForm.get("material")?.value,
      brand: this.myForm.get("brand")?.value,
      type: this.myForm.get("type")?.value,
      season: this.myForm.get("season")?.value,
      year: this.myForm.get("year")?.value,
      pricetype:this.myForm.get("pricetype")?.value
    }

    if(product.id != 0)
    {
      if(product.quantity <= 0)
      {
        product.condicion = "Agotado";
      }
      this.productService.editProduct(product).subscribe(
        next=>{
          this.saveImage(product.id);
          this.snackBar.open("El producto se editó correctamente", "ok", {duration:2000});
          this.location.back();
        }
      );
    }
    else{
      this.productService.addProduct(product).subscribe({
        next: (data)=>{
          this.saveImage(data.id);
          this.snackBar.open("El producto se agregó correctamente.", "ok");
          this.location.back();
        }
      });
    }

  }

  capturefile(event: any):any{
    const filecaptured = event.target.files[0];
    this.base64(filecaptured).then((image:any)=>{
      this.preview = image.base;
      console.log(image);
    });

    this.files.push(filecaptured);
    console.log(event.target.files);
  }

  base64 =async($event: any) => new Promise((resolve) =>{
    const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null
        });
      };
  })

  saveImage(id:number)
  {

    if(this.image != undefined)
    {
      const imgProduct: ProductImage = {
        id: this.image.id,
        id_product: id,
        img: this.preview
      }
      this.productService.editImage(imgProduct).subscribe(
        next=> {console.log("img edit");}
      );
    }
    else
    {
      if(this.preview != undefined)
      {
        const imgProduct: ProductImage = {
          id: 0,
          id_product: id,
          img: this.preview
        }
        this.productService.addImage(imgProduct).subscribe(
          next=>{
            this.router.navigate(["/shop-page", this.shopname, this.shopfound.idUser]);
          }
        );
      }
    }
  }
}
