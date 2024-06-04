import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRequestRegistration } from 'src/app/models/UserRequestRegistration';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userService: UserService, 
                private route: ActivatedRoute,
                private router:Router,
                private alertService:AlertService
              ) { }

  private role!:string;

  ngOnInit(): void {
   this.route.data.subscribe( data => {
      this.role = data['role'];
   })
  }


  registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: [''],
    email: [''],
    password: [''],
    termsAndConditions: [false,Validators.requiredTrue]
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
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get termsAndConditions() {
    return this.registerForm.get('termsAndConditions');
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
        idRole: this.role === 'client' ? 3 : 2
      }

      this.userService.registerUser(user).subscribe({
        next: (response) => {
          alert('User registered successfully!');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error registering user:', err);
          alert('Failed to register user');
          
        }
      });
    }else {
      this.registerForm.markAllAsTouched();
      this.alertService.error('Please fill all the fields');
    }
  }
}
