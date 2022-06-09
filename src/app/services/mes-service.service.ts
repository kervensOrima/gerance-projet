import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Service } from '../models/Service.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MesServiceService {


  httpOption = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private http : HttpClient) { }


  pageServices( page :number , size :number) :Observable<any> {
    return this.http.get<any>( `${ environment.BASE_URL }` + "/page-service/" + page +"/"+ size ) 
    .pipe( retry( 1) )
  }


  likeService(id:number) {
    return this.http.get( `${ environment.BASE_URL }` + '/update-quantite-service/' + +id )
    .pipe( retry( 1) )
  }


  public totalService() :Observable<number> {
    return this.http.get<number>( `${ environment.BASE_URL }` + '/total-service')
    .pipe( retry( 1) )
  }


  public totalServiceActive( active :boolean ) :Observable<number> {
    return this.http.get<number>( `${ environment.BASE_URL }` + '/total-service-active/' + active )
    .pipe( retry( 1) )
  }

  public findAll():Observable<any[]> {
    return this.http.get<any[]>( `${ environment.BASE_URL }` + '/services' )
    .pipe( retry( 1) )
  }


   
  public findById( id:number):Observable<any> {
    return this.http.get<any>( `${ environment.BASE_URL }` + '/service/' + id  )
    .pipe( retry( 1) )
  }


  public findByName( name:string):Observable<any[]> {
    return this.http.get<any[]>( `${ environment.BASE_URL }` + '/service/name/' + name  )
    .pipe( retry( 1) )
  }

  public findByDescription( description:string):Observable<any[]> {
    return this.http.get<any[]>( `${ environment.BASE_URL }` + '/service/description/' + description   )
    .pipe( retry( 1) )
  }

  public deleteById( id:number):Observable<void> {
    return this.http.delete<void>( `${ environment.BASE_URL }` + '/service/' + id   )
    .pipe( retry( 1) )
  }
  

  public activeService(active:boolean , id:number):Observable<void>{
    return this.http.get<void>(`${ environment.BASE_URL }` + '/active-service/' + active + '/' + id )
    .pipe( retry( 1) )
  }


  public saveService( service:Service ): Observable<Service> {
    return this.http.post<Service>( `${ environment.BASE_URL }` + '/service' , JSON.stringify( service) , this.httpOption )
    .pipe( retry( 1) )
  } 

  public updateService( service:Service , id:number): Observable<Service> {
    return this.http.put<Service>( `${ environment.BASE_URL }` + '/service/' + id , JSON.stringify( service) , this.httpOption  )
    .pipe( retry( 1) )
  } 

}
