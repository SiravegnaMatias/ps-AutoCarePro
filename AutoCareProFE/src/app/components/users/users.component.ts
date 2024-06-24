import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:User[] = [];
  filteredUsers: User[] = [];
  isFilter: boolean = false;
  filterForm!: FormGroup;
  roles: string[] = ['Admin', 'Detailer', 'Cliente']


  constructor(private userService:UserService,private fb:FormBuilder

  ){}


  ngOnInit(): void {
    this.initForm();
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  initForm() {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      role: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const { name, email, role } = this.filterForm.value;

    this.filteredUsers = this.users.filter(user => {
      return (!name || (`${user.firstName} ${user.lastName}`.toLowerCase().includes(name.toLowerCase())))
        && (!email || user.email.toLowerCase().includes(email.toLowerCase()))
        && (!role || user.role.name.toLowerCase() === role.toLowerCase());
    });
  }

  toggleFilter() {
    this.isFilter = !this.isFilter;
  }

  cleanFilters(){
    this.filterForm.reset();
    this.applyFilters();
  }
}
