import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:User[] = [];
  constructor(private userService:UserService){}
  ngOnInit(): void {
    // this.userService.getUsers().subscribe(data => {
    //   this.users = data;
    // });
    this.users = this.userService.getUsersOff();
  }
}
