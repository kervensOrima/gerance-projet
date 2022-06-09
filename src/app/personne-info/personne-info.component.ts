import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personnel } from '../models/Personnel.model';
import { PersonnelService } from '../services/personnel.service';

@Component({
  selector: 'app-personne-info',
  templateUrl: './personne-info.component.html',
  styleUrls: ['./personne-info.component.scss']
})
export class PersonneInfoComponent implements OnInit {

  personnel:Personnel = new Personnel();

  constructor( private activatedRoute :ActivatedRoute ,
    private personnelService:PersonnelService ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params[ 'id'] ;

    this.personnelService .findById( +id )
    .subscribe(
      (response:Personnel) => {
         this.personnel = response
      } ,
      (errors) => {
        console.log( errors ) ;
      }
    )

  }

  deleteProfession(id:any ) {
    
      this.personnelService.deleteProfessionById( +id)
      .subscribe(
        (response) => {
          console.log( response )
          this.ngOnInit()
        }
      )
  }

  deletePhone(id:any ) {
    this.personnelService.deletePhoneById( +id)
    .subscribe(
      (response) => {
        console.log( response )
        this.ngOnInit()
      }
    )
  }

}
