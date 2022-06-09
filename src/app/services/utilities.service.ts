import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  
  httpOption = {
    headers : new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }

  constructor(private http:HttpClient) { }


  uploadFile(fileSelected:File) :Observable<any> {

    console.log( "file selected ; " ,  fileSelected )
    var file = new FormData() 
    file.append( 'file' , fileSelected , fileSelected?.name )


    console.log( 'files append ' + file  )

    return this.http.post<any>( `${ environment.BASE_URL }` + '/save-file'  , file  )
    .pipe( retry(1) )
  }


  // getByDescription(description:string) :Observable<any> {
  //   return this.http.get<any>( `${ environment.API_KEY }` + "&&q=" + description + "&image_type=photo" )
  //   .pipe( retry(1) )
  // }
}
