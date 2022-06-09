import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personnel } from '../models/Personnel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private http:HttpClient) { }

    
  httpOption = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  
  public findAll():Observable<any[]> {
    return this.http.get<any[]>( `${ environment.BASE_URL }` + '/personnels' )
    .pipe( retry( 1) )
  }

  public findById( id:number):Observable<Personnel> {
    return this.http.get<Personnel>( `${ environment.BASE_URL }` + '/personnel/' + id  )
    .pipe( retry( 1) )
  }

  public deleteById( id:number):Observable<any> {
    return this.http.delete<any>( `${ environment.BASE_URL }` + '/personnel/' + id   )
    .pipe( retry( 1) )
  }


  public deleteProfessionById( id:number):Observable<any> {
    return this.http.delete<any>( `${ environment.BASE_URL }` + '/personnel-profession/' + id   )
    .pipe( retry( 1) )
  }


  public deletePhoneById( id:number):Observable<any> {
    return this.http.delete<any>( `${ environment.BASE_URL }` + '/personnel-phone/' + id   )
    .pipe( retry( 1) )
  }


  public savePersonnel( personnel:any ): Observable<any> {
    return this.http.post<any>( `${ environment.BASE_URL }` + '/personnel' , JSON.stringify( personnel ) , this.httpOption )
    .pipe( retry( 1) )
  } 

  public updatePersonnel( personnel:any ): Observable<any> {
    return this.http.put<any>( `${ environment.BASE_URL }` + '/personnel/' , JSON.stringify( personnel ) , this.httpOption  )
    .pipe( retry( 1) )
  } 

  public totalPersonnel() :Observable<number> {
    return this.http.get<number>( `${ environment.BASE_URL }` + '/count-personnel')
    .pipe( retry( 1) )
  }
}
