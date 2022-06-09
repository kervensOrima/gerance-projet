import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public connected:boolean = false ;

  user:any = [
    {
      'id' : 1 ,
      'username' : 'user',
      'password' : '12345'
    } ,
    {
      'id' : 2 ,
      'username' : 'admin',
      'password' : '12345'
    }
  ]

  constructor(private router:Router) { }

  public findUser(username:string  ,password :string) :void {

    const user:any = this.user.find(
      (user:any) => user.username === username && user.password === password 
    )

    if( user === undefined && user === null ) {
      this.connected = false 
      // console.log( 'Not connected : ' +  user , this.connected )
    } else {
      this.connected = true
      this.router.navigate( ['/dashboard-v1'])
    }
  }


}
