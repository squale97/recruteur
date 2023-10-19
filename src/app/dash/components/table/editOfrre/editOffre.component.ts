import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ecme } from 'src/app/dash/api/ecme';
import { Operateur } from 'src/app/dash/api/operateur';
import { Tr } from 'src/app/dash/api/tr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
    templateUrl: './editOffre.component.html'
})
export class EditOffreComponent implements OnInit{

   dropdownItems:any;
   selectedType:string;
   id:string;
   nom:string;
   lieu:string;
   structure:string;
   anneeExp:string;
   dateFin:string;
   description:String;
   validite:any;
   date:string;
   validiteTest:string;
   loading:boolean=false;
   

    constructor(private route:ActivatedRoute,private http:HttpClient, private router:Router){

    }

   
   
  

    getOffreById() {

      var appUrl = environment.baseUrl+'emploiById'
      var identifiantRecruteur = sessionStorage.getItem('id');
      this.route.queryParams
      .subscribe(params => {
      
        this.id = params["id"];
      
      this.dropdownItems = ["CDD", "STAGE", "CDI", "AUTRE"];
      
    }
      )
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body = JSON.stringify({id:this.id});
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
         
   
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {

           
            this.nom = response.contenu[0].nom;
            this.lieu = response.contenu[0].lieu;
            this.structure = response.contenu[0].structure;
            this.anneeExp = response.contenu[0].nbExperience;
           
            this.validiteTest = response.contenu[0].validite;
            this.description = response.contenu[0].description 
            this.date = response.contenu[0].dateFin          // this.nbreTotal = response.taille;
           // this.offres = response.contenu
           // console.log(this.offres);
            
        
          }
        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
          console.log(error.status);
          console.error('Échec de la connexion :', error.status);
        }
      );
    }
  
     updateEmploi () {
      this.loading=true
      this.route.queryParams
      .subscribe(params => {
       
        this.id = params["id"];
        
     
      
    }
      )
  let body=JSON.stringify({
        nom:this.nom,
        lieu:this.lieu,
        structure:this.structure,
        type:this.selectedType,
        validite:this.validiteTest,
        dateFin:this.date,
        description:this.description,
        id:this.id,
        nbExperience:this.anneeExp,
        
      })

    
      var appUrl = environment.baseUrl+'update/emploi'
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
    //  const body = JSON.stringify({id:this.id});
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
          // Succès de la connexion
            this.loading=false
           this.router.navigateByUrl("/table/offre")
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
           
          }
        },
        (error) => {
    
          console.log(error.status);
          console.error('Échec de la connexion :', error.status);
        }
      );
     }
       
      
       
      
   
       
      
       
     
    


    ngOnInit(): void {
      if (this.validiteTest == "valide") {
        this.validite = ["valide", "invalide"]
      }else {
        this.validite = ["invalide","valide"]
      }
      this.getOffreById();
     
 }
}