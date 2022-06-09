import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../models/Service.model';
import { MesServiceService } from '../services/mes-service.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {

  service!:Service ;

  constructor(private activated:ActivatedRoute , private serviceS :MesServiceService) { }

  ngOnInit(): void {

   const id = this.activated.snapshot.params['id']
   console.log( id )

   this.findService( id )
  }


  findService( id:number) {
    this.serviceS.findById( id )
    .subscribe(
      (response:Service) => {
        this.service = response
      } ,
      (errors) => {
        console.log( errors )
      },
      ()  =>
      console.log( 'success')
    )
  }

}
