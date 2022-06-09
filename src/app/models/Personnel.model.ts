import { Equipe } from "./Equipe.model";
import { Phone } from "./Phone.model";
import { Profession } from "./Profession.model";


export class Personnel {
    
    public id?:number ;
    public fullName!:string;
    public adresse!:string;
    public email!:string ;
    public code!:string ;
    public sexe!:string ;
    public actif!:boolean ;
    public dateNaissance!:Date ;
    public salaire!:number;
    public photo!:string ;
    public equipe!:Equipe ;
    public phones?:Phone[] ;
    public professions?:Profession[] ;
}