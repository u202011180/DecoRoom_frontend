import { Component,OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  myForm!:FormGroup;
  id!:number;
  password!:string;
  constructor(private userService:UsersService,
              private router:Router,
              private activatedRouter:ActivatedRoute,
              private formBuilder:FormBuilder,
              private http:HttpClient,
              private snackBar:MatSnackBar,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.editForm();
  }

  editForm(){

    this.myForm = this.formBuilder.group(
      {
        name:[""],
        lastname:[""],
        email:[""],
        dni:[""],
        phone:[""],
        adress:[""]
      }
    )
    this.userService.getUserId(this.id).subscribe(
      (data:User)=>{
        this.myForm.get("name")!.setValue(data.name);
        this.myForm.get("lastname")!.setValue(data.lastname);
        this.myForm.get("email")!.setValue(data.email);
        this.myForm.get("dni")!.setValue(data.dni);
        this.myForm.get("phone")!.setValue(data.phone);
        this.myForm.get("adress")!.setValue(data.adress);
        this.password = data.password;
      }
    );
  }

  editUser()
  {
    const user:User = {
      id:this.id,
      name:this.myForm.get("name")?.value,
      lastname:this.myForm.get("lastname")?.value,
      email:this.myForm.get("email")?.value,
      dni:this.myForm.get("dni")?.value,
      phone:this.myForm.get("phone")?.value,
      adress:this.myForm.get("adress")?.value,
      password: this.password
    }

    this.userService.editUser(user).subscribe(
      {
        next:(data) =>{
          this.snackBar.open("El empleado se actualizó", "ok");
          this.router.navigate(["/user", user.id]);
        },
        error:(err)=>{
          console.log(err);
        }
      }
    );
  }
}
