import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { userLogin } from 'src/app/models/UserLogin';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) { }


  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  sumbitForm() {
    const userLogin: userLogin = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }
    this.loginService.login(userLogin).subscribe({
      next: (response) => {
        if (response) {
          alert('Login Successfull');
          this.route.navigate(['/home']);
        } else {
          alert('Login Failed');
        }
      },
      error: (err) => {
        console.error('Error logging in:', err);
        alert('Failed to login');
      }

    }
    );
  }
}
