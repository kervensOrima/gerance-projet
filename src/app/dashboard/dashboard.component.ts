import { Component, OnInit } from '@angular/core';
import { EquipesService } from '../services/equipes.service';
import { MesServiceService } from '../services/mes-service.service';
import { PersonnelService } from '../services/personnel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
 public totalService:number = 0;
 public  totalServiceActive:number = 0;
 public pourcentage:number = 0 ;
 public totalEquipe:number = 0 ;
 public totalPersonnel:number = 0;
  
  constructor( private service :MesServiceService , private equipeService : EquipesService ,
    private personnelService:PersonnelService ) { }

  ngOnInit(): void {
    this.getNumbers() ;
  }


  getNumbers() {
  
    //get total service active
    this.service.totalServiceActive( true )
    .subscribe(
      (response:number) => {
        this.totalServiceActive = response ;
      }
    )

    //get total service
    this.service.totalService()
    .subscribe(
      (response:number) => {
        this.totalService = response
        this.pourcentage = (this.totalServiceActive * 100 ) / response
        
      } 
    )

    //get total equipe
    this.equipeService.totalEquipe()
    .subscribe(
      (response) => {
        this.totalEquipe = response ;
      }
    )

    this.personnelService.totalPersonnel()
    .subscribe( 
      response => {
        this.totalPersonnel = response
      }
    )
  }

}
