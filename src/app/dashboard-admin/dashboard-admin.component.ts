import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
declare var window: any ;

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  public currentPage:number =0;
  public totalPages!:number;
  public page!:any ;
  public currentSize:number = 10
  formModal :any
  public today !:number ;


  constructor(private clientService:ClientService ,
    private router:Router) { }

  initModal() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('formModal')
    )
  }

  onChowInfo(id:number) {
    this.router.navigate( ['client-info' , id ]);
  }



  ngOnInit(): void {

    this.clientService.today()
    .subscribe(
      (result) => this.today= result
    )



    this.pageClient( 0 , 10)
    this.initModal()
  }

  onChangeSize(event:any) {
    this.currentSize = event?.target?.value
    this.pageClient( this.currentPage , this.currentSize  )
  }

  pageClient( page:number , size :number ) : void  {

    this.clientService.pageClient( page , size )
    .subscribe(
      (page:any) => {
        this.page = page
        this.totalPages = page?.totalPages
      }
    )
  }


  otherPage(str: string) {
    if( str === 'next' ) {
      if( this.currentPage + 1  < this.totalPages ) {
        this.currentPage++ ;
      }
    }
    if( str === 'last' ) {

      if( this.currentPage  > 0 ) {
        this.currentPage--
      }
    }
    this.pageClient( this.currentPage , this.currentSize )
  }
}
