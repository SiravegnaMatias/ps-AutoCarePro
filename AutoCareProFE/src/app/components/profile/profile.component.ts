import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUpdate } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 
  userId!: number;

 

  formUser!: FormGroup;
  isDisabled: boolean = true;

  constructor(private router: Router, 
              private fb: FormBuilder,
              private loginService: LoginService, 
              private userService: UserService,
              private  alertService:AlertService
            ) {
  }
  ngOnInit(): void {

    this.formUser = this.fb.group({
      firstName: ['',[Validators.required, Validators.maxLength(35), Validators.minLength(4)]],
      lastName: ['',[Validators.required, Validators.maxLength(35), Validators.minLength(4)]],
      email: ['',[ Validators.required, Validators.email]],
      address: ['',[Validators.required, Validators.maxLength(65), Validators.minLength(4)]],
      phone: [''],
    });
    this.formUser.disable();

    this.loginService.currentUserData.subscribe((data) => {
      this.userId = data.id;

      this.refreshUser();
    })
  }

  refreshUser(){
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.formUser.patchValue(data);
    })
  }
  goToVehicles() {
    this.router.navigate(['/home/my-cars']);
  }

  goToBookings() {
    this.router.navigate(['/home/my-bookings']);
  }

  toggleEdit() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.formUser.disable();
    } else {
      this.formUser.enable();
    }
  }

  confirmChanges() {
    const userUpdate:UserUpdate	 = {
      firstName: this.formUser.value.firstName,
      lastName: this.formUser.value.lastName,
      address: this.formUser.value.address,
      phone: this.formUser.value.phone
    }
    if(this.formUser.valid){
      this.userService.updateUser(userUpdate, this.userId).subscribe({
        next: (response) => {
          if (response) {
            this.alertService.succesfullLogin('Usuario actualizado correctamente');
            this.toggleEdit();
          } else {
            this.alertService.somethingWentWrong('Error actualizando el usuario', 'No se ha podido actualizar el usuario, por favor intente de nuevo');
          }
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.alertService.somethingWentWrong('Error actualizando el usuario', 'No se ha podido actualizar el usuario, por favor intente de nuevo');
        }
      });
    }else {
      this.formUser.markAllAsTouched();
    }
    
  }

  cancelChanges(){
    this.refreshUser();
    this.isDisabled = true;
  }

  get firstName(){
    return this.formUser.get('firstName');
  }

  get lastName(){
    return this.formUser.get('lastName');
  }

  get email(){
    return this.formUser.get('email');
  }

  get address(){
    return this.formUser.get('address');
  }

  get phone(){
    return this.formUser.get('phone');
  }
}
