import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { userLogin } from 'src/app/models/UserLogin';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private userService:UserService) { }


  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  sumbitForm() {
    const userLogin:userLogin = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }
    this.userService.loginUser(userLogin).subscribe(
      response => {
        alert('User logged in successfully!');
        this.loginForm.reset();
      },
      error => {
        console.log(error);
      }
    )
  }
}
