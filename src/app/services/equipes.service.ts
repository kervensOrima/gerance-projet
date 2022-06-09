import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from '../models/Equipe.model';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  constructor(private http:HttpClient) { } 
  
  httpOption = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  
  public findAll():Observable<any[]> {
    return this.http.get<any[]>( `${ environment.BASE_URL }` + '/equipes' )
    .pipe( retry( 1) )
  }

  public findById( id:number):Observable<any> {
    return this.http.get<any>( `${ environment.BASE_URL }` + '/equipe/' + id  )
    .pipe( retry( 1) )
  }

  public deleteById( id:number):Observable<any> {
    return this.http.delete<any>( `${ environment.BASE_URL }` + '/equipe/' + id   )
    .pipe( retry( 1) )
  }



  public saveEquipe( equipe:Equipe ): Observable<Equipe> {
    return this.http.post<Equipe>( `${ environment.BASE_URL }` + '/equipe' , JSON.stringify( equipe) , this.httpOption )
    .pipe( retry( 1) )
  } 

  public updateEquipe( equipe:Equipe , id:number): Observable<Equipe> {
    return this.http.put<Equipe>( `${ environment.BASE_URL }` + '/equipe/' + id , JSON.stringify( equipe) , this.httpOption  )
    .pipe( retry( 1) )
  } 

  public totalEquipe() :Observable<number> {
    return this.http.get<number>( `${ environment.BASE_URL }` + '/equipe-count')
    .pipe( retry( 1) )
  }
}
