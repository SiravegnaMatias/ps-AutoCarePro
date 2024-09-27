import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { userLogin } from 'src/app/models/UserLogin';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  showPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private alertService:AlertService
    
  ) { }


  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

 

  sumbitForm() {
    const userLogin: userLogin = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }
    if(this.loginForm.valid){
     this.loginService.login(userLogin).subscribe({
        next: (response) => {
          if (response) {
            this.alertService.succesfullLogin("Bienvenido a AutoCarePro");
            this.route.navigate(['/home']);
          } else {
            this.alertService.somethingWentWrong('Error al iniciar sesion', 'No se ha podido iniciar sesion, por favor intente de nuevo');
          }
        },
        error: (err) => {
          console.error('Error logging in:', err);
          this.alertService.somethingWentWrong('Error al iniciar sesion', 'No se ha podido iniciar sesion, por favor intente de nuevo');
        }
  
      }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;  // Alterna la visibilidad de la contraseña
  }
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
