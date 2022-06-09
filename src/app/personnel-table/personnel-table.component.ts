import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Personnel } from '../models/Personnel.model';
import { PersonnelService } from '../services/personnel.service';

declare var window:any ;

@Component({
  selector: 'app-personnel-table',
  templateUrl: './personnel-table.component.html',
  styleUrls: ['./personnel-table.component.scss']
})
export class PersonnelTableComponent implements OnInit {

  header:string[] = [ 'fullName' , 'code' , 'adresse' , 'email' , 'actif', 'salaire' , 'equipe' ,  'action']
  public personnelData:any ;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  modal1:any 
  
  personnel!:Personnel ;

  personnels:Personnel[] = [] ;


  swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary btn-sm m-2',
      cancelButton: 'btn btn-danger btn-sm m-2'
    },
    buttonsStyling: false
  })
  
  
  
  constructor(private personnelService:PersonnelService , private router:Router ) { }

  ngOnInit(): void {

    this.findAll() 

    this.initModal()
    
  }

  findAll() {
    this.personnelService.findAll()
    .forEach(  p => {
      this.personnels = p ;
      
      this.personnelData = new MatTableDataSource<any>( this.personnels )
      this.personnelData.paginator = this.paginator 
      this.personnelData.sort = this.sort
    })

  }


  initModal() {

    this.modal1 = new window.bootstrap.Modal(
      document.getElementById( 'phoneAndAdresseModal')
    )
  }


  onViewPhoneAndAdresse( id:number ) {

    this.personnelService.findById( id )
    .subscribe(
         (personnel :Personnel) => {
           this.personnel = personnel
         } ,
         (errors) => {
          console.log( errors )
         }
    )

    this.modal1.show()
    
  }

  onSearch(filterValue:string) {
    this.personnelData.filter = filterValue.trim().toLowerCase();
  }

  openModalUpdate( id:number) {
    console.log( id )
  }

  onDelete( id:number ){

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

        this.personnelService.deleteById(id)
          .subscribe(
            (response :any ) => {

              this.swal.fire(
                'deleted!',
                'Personnel has been deleted.',
                'success'
              )
              this.findAll()

            },
            (errors: any) => {
              // console.log( errors )
              this.swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors?.error?.message,
              })
            }
          )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swal.fire(
          'Cancelled',
          'Suppresion non effectue',
          'error'
        )
      }

    })
  }


  onUpdatePersonnel(id:number) {
    this.router.navigate( ['/personnel-form' , id  ])
  }

  onViewPersonnel( id :number ) {
    this.router.navigate( ['/personnel-info' , id  ])
  }


}
