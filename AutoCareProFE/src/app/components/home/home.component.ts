import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  idUser!: number;
  userLogged: User = {  firstName: '', email: '',lastName:'', address: '', role: {id:0, name:''}};
  constructor(private loginService: LoginService, private userService: UserService,private router:Router) {
  }
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      if (isLoggedIn) {
        const userData = this.loginService.currentUserData.value;
        this.idUser = userData.id;

        this.userService.getUserById(this.idUser).subscribe((user: User) => {
          this.userLogged = user;
        });
      }
    });
  }

  signOut(){
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}



