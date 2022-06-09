import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Client } from 'src/app/models/Client.model';
import { ClientService } from 'src/app/services/client.service';
import { MesServiceService } from 'src/app/services/mes-service.service';
import {Service} from "../../models/Service.model";

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

  disponible!:Date
  public client!:Client ;
  public newVal!:any ;
  public services:Service[] = [ ] ;
  public listService:Service[] = []
  public message!:string ;
  ifValid:boolean = false ;
  notLoad:boolean = true ;

  public showForm:boolean=true ;

  public numero:number = 1 ;


  constructor( private clientService:ClientService , private service:MesServiceService ) { }

  ngOnInit(): void {
    this.notLoad = true
    this.client = new Client() ;
    this.findServices() ;

    setTimeout(() => {
       this.notLoad = false
    } , 1000 )
  }

  currentSlide(n:number) : void {
    console.log( n )
  }

  deleteChoice(id:number) {
   for( let i = 0 ; i < this.listService.length ; i++ ) {
     if( this.listService[i].id == id ) {
        this.listService.splice(i , 1) ;
     }
   }
  }

  onChangeService(event:any) {
    const id = event?.target?.value

    this.newVal  = this.services.find(
      ( service:Service) => service.id == id
    )

   if( this.newVal != null ){
       if( this.listService.indexOf( this.newVal ) !== -1  ){
         this.message = 'service deja selectionner!!!'
       }else{
        this.listService.push( this.newVal )
       }
   }

  }

  onSubmit(clientForm:NgForm ) {
    this.ifValid = true ;

    //passer tous les service choisi a l'objet client
    this.client.services = this.listService

    // this.showForm = false ;
    this.clientService.saveClientDemande( this.client )
    .subscribe(
      () => {
        console.log( 'Successfull')
        this.ifValid = false ;
      }
    )
  }

  last(): void {
    setTimeout(
      ()=> {
        this.showForm = true ;
      } ,
      1000
    )
  }

  changeImage(str:string) {

    if( str.toLowerCase() === 'next' ){


      if( this.numero == 10 ) {
        this.numero = 1 ;
      }

      this.numero++ ;

    }else{
      if( this.numero == 1 ) {
        this.numero = 10
      }

      this.numero--

    }


  }

  findServices() :void {
    this.service.findAll()
    .forEach( s => {
      this.services = s
    })
  }
}
