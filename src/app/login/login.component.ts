import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!:User ;

  constructor(private userService:AuthService) { }

  ngOnInit(): void {
    this.user = new User() ;
  }


  onLogin(form:NgForm ){
    
    this.userService.findUser( form.value.username , form.value.password ) ;
  }

}
