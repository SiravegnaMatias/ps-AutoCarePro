import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserRequestRegistration } from 'src/app/models/UserRequestRegistration';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,private userService: UserService) { }

  registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: [''],
    email: [''],
    password: ['']
  });

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get firsName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }

  sumbitForm() {
    if (this.registerForm.valid) {
      const user: UserRequestRegistration = {
        firstName: this.registerForm.value.firstName || '',
        lastName: this.registerForm.value.lastName || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        address: this.registerForm.value.address || ''
        ,
        idRole: 3
      }

      this.userService.registerUser(user).subscribe(
        response => {
          alert('User registered successfully!');
          this.registerForm.reset();
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
