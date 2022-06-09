import { Personnel } from "./Personnel.model";
import { Service } from "./Service.model";


export class Equipe {
    
    public id!:number ;
    public code?:string ;
    public nom!:string ;
    public slogan!:string ;
    public createDate?:Date ;
    public service!:Service ;
    public personnels?:Personnel[] ;
}