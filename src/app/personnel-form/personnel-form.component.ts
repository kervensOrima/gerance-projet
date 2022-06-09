import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UUID } from 'angular2-uuid';
import Swal from 'sweetalert2';
import { Equipe } from '../models/Equipe.model';
import { Personnel } from '../models/Personnel.model';
import { EquipesService } from '../services/equipes.service';
import { PersonnelService } from '../services/personnel.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.scss']
})
export class PersonnelFormComponent implements OnInit , OnChanges {

  public personnelForm!:FormGroup ;
  fileSelected!:any ;
  fileName!:string ;

  
  public personnel!:Personnel ;
  public  newEquipe:any;
  public equipes:Equipe[] = []

  swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary btn-sm m-2',
      cancelButton: 'btn btn-danger btn-sm m-2'
    },
    buttonsStyling: false
  })

  constructor( 
    private equipeService :EquipesService , 
    private formBuider :FormBuilder ,
    private personnelService : PersonnelService ,
    private activatedRoute:ActivatedRoute ,
    private util:UtilitiesService ) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log( "Change =>> " , changes );
    // const id = +this.activatedRoute.snapshot.params['id'] ;
    // if( id != null && id != undefined && id != NaN && id ) {
    //   this.findById( id ) ;
    // }
  }

  ngOnInit(): void {
    this.initForm()

    this.findAllEquipe()

    this.personnel = new Personnel() ;

    const id = +this.activatedRoute.snapshot.params['id'] ;
    if( id != null && id != undefined && id != NaN && id ) {
      this.findById( id ) ;
    }

  }

  findAllEquipe() : void {
    this.equipeService.findAll()
    .forEach( e => {
      this.equipes = e
    })
  }

  onChangeEquipe(event:any){
    const id = +event?.target?.value 

    this.newEquipe = this.equipes.find(
        ( equipe ) => equipe.id == id 
    )

    this.personnel.equipe = this.newEquipe
  }

  onChangeFile(event:any) {
    this.fileSelected = event.target?.files[0]
    this.fileName = event.target.files[0]?.name
  }


  initForm() {
       this.personnelForm = this.formBuider.group(
         {
           id: [] ,
           code:[] ,
           fullName : [ ,[ Validators.required , Validators.minLength(3) , Validators.maxLength(100)]] ,
           adresse : [ , [ Validators.required , Validators.minLength(5) , Validators.maxLength(40)]],
           email : [ , [ Validators.required , Validators.minLength(5) , Validators.maxLength(40) , Validators.email ]],
           actif : [ true  ] ,
           dateNaissance:[ , [ Validators.required ]  ],
           salaire : [ ,[ Validators.required , Validators.min(1) , Validators.max(999999999)]] ,
           sexe : [ , [ Validators.required ]] ,
           photo : [] ,
           equipe : [ ,[Validators.required  ]  ] ,
           phones :  this.formBuider.array(   [ this.phone()] ),
           professions :  this.formBuider.array(  [this.profession() ])
         }
       )
  }

  phone() {
     return this.formBuider.group(
       {
          id : [] ,
          phone : [ , [ Validators.required , Validators.pattern( '^[0-9]{8}$') , Validators.maxLength(8) , Validators.minLength(8) ] ] ,
       }
     )
  }

  profession() {
    return this.formBuider.group(
      {
        id : [ ] ,
        profession: [ , [Validators.required , Validators.minLength(5) , Validators.maxLength(50)]]
      }
    )
  }

  get phonesArray() {
    return <FormArray> this.personnelForm?.get( 'phones')
  }

  get professionsArray() {
    return <FormArray> this.personnelForm?.get( 'professions' )
  }

  public addPhone() {
    this.phonesArray.push( this.phone() )
  }

  public removePhone( index:number) {
    this.phonesArray.removeAt( index )
  }


  public addProfession() {
    this.professionsArray.push( this.profession() )
  } 

  public removeProfession( index:number) {
    console.log( index )
    this.professionsArray.removeAt( index )
  }

  onSavePersonnel(){

    if( this.personnelForm.valid ){
     

      this.personnel = {
         id: this.personnelForm?.get('id')?.value ,
         fullName: this.personnelForm?.get('fullName')?.value ,
         adresse: this.personnelForm?.get('adresse')?.value,
         email: this.personnelForm?.get('email')?.value ,
         code:  UUID.UUID().substring(0 , 5).toUpperCase() ,
         sexe: this.personnelForm?.get('sexe')?.value ,
         actif: this.personnelForm?.get('actif')?.value ,
         dateNaissance: this.personnelForm?.get('dateNaissance')?.value,
         salaire: this.personnelForm?.get('salaire')?.value ,
         photo:this.fileName ,
         equipe:this.newEquipe ,
         phones:  this.personnelForm?.get('phones')?.value ?? [] ,
         professions: this.personnelForm?.get('professions')?.value ?? [] 
      }



      if( this.personnelForm?.get('id')?.value === undefined || this.personnelForm?.get('id')?.value === null ) {
        this.save()
      }
      else 
      {
        this.update()
      }
    }

  }

  clear() {
    this.personnelForm.reset()
  }

  private save(){

    this.personnelService.savePersonnel( this.personnel )
    .subscribe(
      (data:any) => {
        // console.log( data )

         this.personnelForm.reset()
         this.swal.fire(
                  'saved!',
                  'personnel enregistrer avec succes!!!.',
                  'success'
                )
          this.upload();
      } 
      ,
      (errors) => {
        console.log( errors )
      }

    )
    

  }


  upload() {
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

  private update() {

    this.personnelService.updatePersonnel( this.personnel )
    .subscribe(
      (data:any) => {
        console.log( data )
      } 
      ,
      (errors) => {
        console.log( errors )
      }
      
    )
  }

  private findById( id :number ):void{
    this.personnelService.findById( id ) 
    .subscribe(
      (personnel:any) => {
        this.personnel = personnel ;

        console.log( this.personnel ) ;
        this.personnelForm?.get( 'phones')?.patchValue( this.personnel.phones  )
        this.personnelForm?.get( 'professions')?.patchValue( this.personnel.professions  )

        // this.personnelForm.patchValue( this.personnel ) ;
      },
      (errors)=> {
        throw errors ;
      }
    )
  }

}
