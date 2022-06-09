import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Service } from '../models/Service.model';
import { MesServiceService } from '../services/mes-service.service';
import { UtilitiesService } from '../services/utilities.service';

declare var window: any;





@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit , OnDestroy , OnChanges {

  public info: string = 'add new ';
  public services: any[] = []
  fileName!: string;
  valider:boolean = true ;
  screenLoader :boolean = true ;

  header:string[] = [ 'nom' , 'active' , 'prix' , 'like' , 'disponible' ,  'action']
  public servicesData:any ;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  fileSelected!: any;

  public ser!: Service;

  formModal: any;

  constructor(
    private service: MesServiceService,
    private router: Router,
    private util: UtilitiesService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.ser = new Service();

    //get all employee
    this.findAll()

    this.initModal();

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log( changes )
  }

  onSearch(filterValue: string) {
    this.servicesData.filter = filterValue.trim().toLowerCase();
  }

  swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary btn-sm m-2',
        cancelButton: 'btn btn-danger btn-sm m-2'
      },
      buttonsStyling: false
    })


  onDelete(id: number) {


    this.swalWithBootstrapButtons.fire({
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

        this.service.deleteById(id)
          .subscribe(
            (response :any ) => {

              // console.log( response )

              this.swalWithBootstrapButtons.fire(
                'Deleted!',
                'Service has been deleted.',
                'success'
              )
              this.findAll()

            },
            (errors: any) => {
              // console.log( errors )
              this.swalWithBootstrapButtons.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors?.error?.message,
              })
            }
          )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalWithBootstrapButtons.fire(
          'Cancelled',
          'Suppresion non effectue',
          'error'
        )
      }

    })
  }



  onActive(item: any) {
    this.service.activeService(item?.active === null ? false : true, item?.id)
      .subscribe(
        (response) => {
          console.log(response)
          this.findAll()
        },
        (error) => {
          console.log(error)
        },
        () => {
          console.log('success')
        }
      )
  }



  findAll() {
    this.service.findAll()
      .subscribe(
        (response) => {
           this.services = response;

          this.servicesData = new MatTableDataSource<any>( this.services )
          this.servicesData.paginator = this.paginator
          this.servicesData.sort = this.sort

        },
        (error) => {
          console.log(error)
          this.screenLoader = false
        }
      )
  }

  initModal() {
    //save modal
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('serviceModal')
    )
  }


  @HostListener('window:shift.a' , ['$event'] )
  openModal() {
    this.formModal.show();
  }

  @HostListener('window:shift.x' , ['$event'] )
  closeModal() {
    this.formModal.hide();
  }

  clear(form: NgForm) {
    form.reset()
  }

  onSaveService(form: NgForm) {
    this.valider = false ;
    this.ser = {
      id: form?.value['id'] ,
      nom: form.value['nom'],
      description: form.value['description'],
      imageURL: this.fileName,
      createDate: new Date(),
      disponible: form.value['disponible'],
      active: form.value['active'],
      likeUser: 0,
      price: form.value['price']
    }
    if (form.valid) {
      if (this.ser?.id === null || this.ser?.id === undefined ) {
        //save
        this.service.saveService(this.ser)
          .subscribe(
            (response: any) => {

              if (response?.message != null) {

                this.swalWithBootstrapButtons.fire(
                  'Error!',
                  response?.message,
                  'warning'
                )

              } else {

                this.ser = new Service()

                this.findAll();

                form.reset();
                this.swalWithBootstrapButtons.fire(
                  'saved!',
                  'service enregistrer avec succes!!!.',
                  'success'
                )
               this.upload();
              }
            },
            (errors) => {
              console.log(errors)
            },
            () => {
             this.valider = true
            }
          )

      } else {
        this.service.updateService(this.ser, this.ser.id)
          .subscribe(
            (response: any) => {
              if (response?.message != null) {
                // console.log( 'not update ')
                this.swalWithBootstrapButtons.fire(
                  'Error!',
                  response?.message,
                  'warning'
                )

              } else {

                this.findAll();

                form.reset();

                this.ser = new Service();

                this.swalWithBootstrapButtons.fire(
                  'update!',
                  'service mise a jour avec succes!!!.',
                  'success'
                )

                this.upload()
              }
            },
            (errors) => {
              console.log(errors)
            },
            () => {
             this.valider = true
            }
          )

      }

    } else {
      console.log('form is invalid!!!')
    }
  }



  openModalUpdate(id: number) {
    this.info = 'Update'
    //recherche le service
    this.service.findById(id)
      .subscribe(
        (response: Service) => {
          this.ser = response
        }
      )
    this.formModal.show();
  }

  onViewService(id: number) {
    this.router.navigate(['/service-info', id])
  }


  onChangeFile(event: any) {
    this.fileSelected = event.target?.files[0]
    this.fileName = event.target.files[0]?.name
  }


  upload(){
    //uploader photo
    this.util.uploadFile(this.fileSelected)
    .subscribe(
      (response: any) => {
        console.log(response)
      },
      (errors) => {
        console.log(errors)
      },
      () => {
        console.log('success!')
      }
    )
  }




}
