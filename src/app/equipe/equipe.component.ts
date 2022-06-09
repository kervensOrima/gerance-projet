import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Equipe } from '../models/Equipe.model';
import Swal from 'sweetalert2';
import {  EquipesService } from '../services/equipes.service';
import { MesServiceService } from '../services/mes-service.service';
import { Service } from '../models/Service.model';
import { UUID } from 'angular2-uuid';

declare var window: any;


@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {

  formModal: any;
  info:string = "add new ";

  equipeData: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public header: string[] = ['code', 'nom', 'slogan', 'createDate', 'service', 'action'];

  public equipes: Equipe[] = [] ;
  public equipeObj!: Equipe ;
  public services:Service[] = [] ;
  public newService!:any ;

  swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary btn-sm m-2',
      cancelButton: 'btn btn-danger btn-sm m-2'
    },
    buttonsStyling: false
  })



  constructor(private equipeService: EquipesService ,private service:MesServiceService ) { }

  ngOnInit(): void {
    this.findAll()

    this.equipeObj = new Equipe() ;


    this.findAllService() ;

    this.initModal()
  }


  onChangeService(event:any){
    const id = +event?.target?.value

    this.newService = this.services.find(
        ( service ) => service.id == id
    )

    this.equipeObj.service = this.newService
  }

  findAllService() {
    this.service.findAll()
    .subscribe(
      (services:Service[]) => {
        this.services = services
      }
    )
  }

  onSearch(filterValue: string) {
    this.equipeData.filter = filterValue.trim().toLowerCase();
  }

  initModal() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('equipeModal')
    )
  }


  onSubmit(form: NgForm) {

    this.equipeObj.createDate =  new Date()


    if( form.valid )
    {

      if( form.value['id'] === undefined || form.value['id'] === null ) {
        console.log( ' we gonna save the team ')
         this.save(form)
      }
      else
      {
        console.log( ' we gonna update the team ')

        this.update(form)
      }

    }
  }

  clear(form: NgForm) {
    form.reset()

    this.equipeObj.service = new Service() ;

  }

  openModal() {
    this.equipeObj.code = UUID.UUID().substring(0 , 5).toUpperCase() ;
    this.formModal.show()
  }

  openModalUpdate(id: number) {
    this.info = " update "
    this.equipeService.findById( id )
    .subscribe(
      ( response:Equipe ) => {
        this.equipeObj = response
        console.log( this.equipeObj )
      }
    )
    this.formModal.show()
  }

  closeModal() {
    this.formModal.hide();
  }

  onDelete(id: number) {


    this.swal.fire({
      title: 'Delete ?',
      text: "Etes-vous sure de vouloir supprimer?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, continuer!',
      cancelButtonText: 'No, arreter!',
      showCloseButton: true,
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.equipeService.deleteById(id)
          .subscribe(
            (response: any) => {
              // console.log(response)

              this.swal.fire(
                'Deleted!',
                'equipe has been deleted.',
                'success'
              )

              this.findAll()

            } ,
            (errors)=> {
              this.swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors?.error?.message,
              })
            }
          )


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swal.fire(
          'cancelled',
          'supression anule',
          'error'
        )
      }

    })
  }

  findAll() {
    this.equipeService.findAll()
      .forEach( response => {

        this.equipes = response

        this.equipeData = new MatTableDataSource<any>(this.equipes)
        this.equipeData.paginator = this.paginator
        this.equipeData.sort = this.sort
      })
  }




  save(form:NgForm) {


    this.equipeService.saveEquipe( this.equipeObj )
    .subscribe(
      ( response :any ) => {

        if (response?.message != null) {

           this.swal.fire(
            'warning!',
            response?.message ,
            'warning'
          )


        } else {

          this.equipeObj = new Equipe()

          this.findAll();

          this.swal.fire(
            'saved!',
            'equipe enregistrer avec succes!!!.',
            'success'
          )

          form.reset();

        }

      } ,
      (errors) => {
        console.log( errors )
      }
    )
  }

  update(form:NgForm) {


    this.equipeService.updateEquipe( this.equipeObj , this.equipeObj?.id )
    .subscribe(
      ( response :any ) => {

        if (response?.message != null) {

          this.swal.fire(
           'warning!',
           response?.message ,
           'warning'
         )


       } else {

         this.equipeObj = new Equipe()


         form.reset();

         this.findAll();

         this.swal.fire(
           'update',
           'information mis a jour  avec succes!!!.',
           'success'
         )


       }


      } ,
      (errors) => {
        console.log( errors )
      }
    )
  }


}
