import { Client } from "./Client.model";
import { Equipe } from "./Equipe.model";






export class Service {


 public id!:number ;
 public nom!:string  ;
 public description!:string ;
 public imageURL!:string ;
 public createDate!:Date ;
 public disponible!: string ;
 public active!:boolean ;
 public likeUser!:number ;
 public price!:number  ;
 public equipes?:Equipe[] ;
 public clients?:Client[] ;

}