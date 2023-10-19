import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ecme } from 'src/app/dash/api/ecme';
import { Operateur } from 'src/app/dash/api/operateur';
import { Tr } from 'src/app/dash/api/tr';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { setMilliseconds } from 'date-fns';

@Component({
    templateUrl: './addOffre.component.html',
    providers: [MessageService]
})
export class AddOffreComponent implements OnInit{

   dropdownItems:any;
   selectedType:string;
   nom:string;
   lieu:string;
   structure:string;
   type:string;
   dateFin:string;
   description:string;
   nbreAnnee:string;
   formulaireComplet:boolean;
  

   
    constructor(private http:HttpClient, private messageService: MessageService, private router:Router){

    }


   
    verifierFormulaire() {
      
      if (this.nom === undefined || this.nom === "" 
      || this.lieu === undefined || this.lieu === "" 
      || this.structure === undefined || this.structure == "" || 
      this.nbreAnnee === undefined || this.nbreAnnee == "" || 
      this.dateFin === undefined || this.dateFin === "" || 
      this.description === undefined || 
      
      this.description === "") {
        this.formulaireComplet = false;
      } else {
        this.formulaireComplet = true;
      }
    }
    

    addOffre() {
  
     
      var appUrl = environment.baseUrl+'addEmploi'
      var identifiantRecruteur = sessionStorage.getItem('id');
     
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body=JSON.stringify({
        nbExperience:this.nbreAnnee,
        recruteur:identifiantRecruteur,
        nom:this.nom,
        description:this.description,
        lieu:this.lieu,
        structure:this.structure,
        type:this.selectedType,
        dateFin:this.dateFin
      })
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
          // Succès de la connexion
      
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Offre ajoutée' });
        
        
          this.router.navigateByUrl("/table/offre");
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
           // this.nbreTotal = response.taille;
           // this.offres = response.contenu
          

          
        
          }


        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
         
          console.error('Échec de la connexion :', error.status);
        }
      );
    }
   
   
  

    
  
     
       
      
       
      
   
       
      
       
     
    


    ngOnInit(): void {
     // this.verifierFormulaire() ;
    
     //this.formulaireComplet = false;
    //console.log(sessionStorage.getItem('id'));
      this.dropdownItems= ["CDD", "STAGE", "CDI", "AUTRE"];
    
    }
 }
