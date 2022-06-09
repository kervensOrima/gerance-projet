import { Service } from "./Service.model";



export class Client {

    public id!:number ;
    public fullName!:string ;
    public adresse!:string ;
    public email!:string ;
    public phoneNumber!:string ;
    public valid!:boolean ;
    public dateDemande?:Date = new Date() ;
    public dateAccomplissement?:Date  ;
    public disponible!:Date ;
    public montantVerse!:number ;
    public numeroIdentite?:string ;
    public services!:Service[]
}
