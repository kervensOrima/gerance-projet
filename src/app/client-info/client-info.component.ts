import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../models/Service.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {


  public info:any ;
  public total:number =0.0;


  constructor(
    private activatedRoute :ActivatedRoute ,
    private clientService :ClientService ,
    private router:Router
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id']

    this.clientService.findById( id )
    .subscribe(
      (result) => {
        this.info = result

        for( let index = 0 ; index < result?.services.length ; index++  ) {
          this.total += result?.services[index]?.price ;
        }

        console.table(  "Services : " , this.info?.services )

      }
    )




  }


  valider() :void {

  }

  annuler() :void {

  }

  retour() {
    this.router.navigate( ['dashboard-v2'] ) ;
  }

}
