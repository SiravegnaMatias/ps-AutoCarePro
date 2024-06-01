import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUpdate } from 'src/app/models/User';
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

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, private userService: UserService) {
  }
  ngOnInit(): void {

    this.formUser = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      phone: [''],
    });
    this.formUser.disable();

    this.loginService.currentUserData.subscribe((data) => {
      this.userId = data.id;

      this.userService.getUserById(this.userId).subscribe((data) => {
        this.formUser.patchValue(data);
      })
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
    this.userService.updateUser(userUpdate, this.userId).subscribe({
      next: (response) => {
        if (response) {
          alert('User updated');
          this.toggleEdit();
        } else {
          alert('Failed to update user');
        }
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Failed to update user');
      }
    });
  }
}
