import { Component, OnDestroy, OnInit } from '@angular/core';
import { MesServiceService } from 'src/app/services/mes-service.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.scss']
})
export class HomeServiceComponent implements OnInit, OnDestroy {

  public pageServices!: any[];
  public totalPages !: number;
  public first!: boolean;
  public last!: boolean;
  image!:string ;
  total:Array<Number> = []
  currentPage:number = 0;
  isLiked!: string;

  constructor(private service: MesServiceService , private util:UtilitiesService) { }


  ngOnInit(): void {
    this.pageService(0, 9)
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
    this.pageService( this.currentPage , 9 )
  }

  pageService(page: number, size: number): void {
    this.total = [] ;
    this.service.pageServices(page, size)
      .subscribe(
        (response: any) => {

          this.totalPages = response?.totalPages
          this.pageServices = response?.content
          this.first = response?.first
          this.last = response?.last

         for( let i = 0 ;  i< response?.totalPages ; i++ ){
            this.total.push(i)
         }
        },
        (error) => {
          console.log('Error trouve ' + error.message)
        },
        () => {
          // console.log('Successfully load ')
        }
      )

  }

  ngOnDestroy(): void {
  }



  likeService(str: string, id: number): void {
    this.isLiked = localStorage.getItem(str) ?? 'noLike';

    if (this.isLiked === 'liked') {
      console.log(str + ' is already liked by this guys')
    }else if (this.isLiked === 'noLike') {

      localStorage.setItem(str, 'liked');

      this.service.likeService(id)
        .subscribe(
          (response) => {
            //Reafficher la page courante
            this.pageService( this.currentPage ,9);
          },
          (error) => {
            console.log(error)
          },
          () => {
            console.log('success')
          }
        )
    }

  }


  page(i:number) {
    this.currentPage = i
    this.pageService( this.currentPage , 9 )
  }
}
