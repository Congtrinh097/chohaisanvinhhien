import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { User } from '../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService) { }
  
  getUsers(): void {
    this.userService.getUsers().subscribe(users=>this.users = users);
  }

  ngOnInit() {
    this.getUsers();
    console.log(this.users);
  }

 

}
