import { Component, OnInit } from '@angular/core';
import { MesServiceService } from 'src/app/services/mes-service.service';

@Component({
  selector: 'app-my-footer',
  templateUrl: './my-footer.component.html',
  styleUrls: ['./my-footer.component.scss']
})
export class MyFooterComponent implements OnInit {

  constructor( private service: MesServiceService) { }

  services!:any[] ;

  ngOnInit(): void {

    this.service.findAll()
    .forEach( e => {
      console.log( e )
      this.services = e
    })
  }

}
