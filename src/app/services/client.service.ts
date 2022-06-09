import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  httpOption = {
    headers : new HttpHeaders ({
      'Content-Type' : 'application/json'
    })
  }

  public saveClientDemande( client:Client) :Observable<Client> {
    return this.http.post<Client>( `${ environment.BASE_URL }` + '/client' ,  JSON.stringify(client)  , this.httpOption )
    .pipe(
      tap( (response) => {
        console.log( response )
      }) ,
      catchError( (error) => {
        return of( error )
      })
     )
  }

  public findAll() {
    return this.http.get<Client[]>( `${ environment.BASE_URL }` + '/clients')
    .pipe(
      tap( (response) =>{
          console.log( response )
      }) ,
      catchError( (errors) =>{
        return of(errors)
      }) ,
      retry(1)
      )
  }

  public findById( id :number ) {
    return this.http.get<Client[]>( `${ environment.BASE_URL }` + '/client/' + id )
    .pipe(
      tap( (response) =>{
          console.log( response )
      }) ,
      catchError( (errors) =>{
        return of(errors)
      }) ,
      retry(1)
      )
  }

  public today() {
    return this.http.get<number>( `${ environment.BASE_URL }` + '/today')
    .pipe(
      tap( (response) =>{
          console.log( response )
      }) ,
      catchError( (errors) =>{
        return of(errors)
      }) ,
      retry(1)
      )
  }

   public pageClient(page:number , size :number):Observable<any> {
    return this.http.get<any>( `${ environment.BASE_URL }` + '/page-client/' + page + '/' + size )
    .pipe(
      tap( (response) =>{
        console.log( response )
    }) ,
    catchError( (errors) =>{
      return of(errors)
    }) ,
    retry(1)
    )
  }

  public pageClients(page:number , size :number , sort:string) {
    return this.http.get<any>( `${ environment.BASE_URL }` + '/page-client/' + page + '/' + size + '/' + sort )
    .pipe(
      tap( (response) =>{
        console.log( response )
    }) ,
    catchError( (errors) =>{
      return of(errors)
    }) ,
    retry(1)
    )
  }




}
