import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/dash/api/customer';
import { CustomerService } from 'src/app/dash/service/customer.service';
import { Product } from 'src/app/dash/api/product';
import { ProductService } from 'src/app/dash/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offre } from 'src/app/dash/api/offre';
import { NavigationExtras, Router } from '@angular/router';



interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './reset.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ResetComponent implements OnInit {

    

  email:string;
  formulaireComplet:boolean;

    constructor(public messageService:MessageService, private router:Router,private customerService: CustomerService, private http:HttpClient, private confirmationService:ConfirmationService) {}

    verifierFormulaire() {
      
      if (this.email === undefined || this.email === "" 
   
      
     ) {
        this.formulaireComplet = false;
      } else {
        this.formulaireComplet = true;
      }
    }


    verifEmail() {
      var appUrl = environment.baseUrl+'getcode'
      var identifiantRecruteur = sessionStorage.getItem('id');
     
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body=JSON.stringify({
       email:this.email,
        
      })
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
         
      
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Un code de réinitialisation vous a été envoyé par mail vers l'adresse que vous avez mentionnée"  });
          const navigationExtras: NavigationExtras = {
            queryParams: { email: this.email}
            // Vous pouvez également utiliser queryParamsHandling pour gérer les paramètres déjà présents dans l'URL.
            // queryParamsHandling: 'merge' ou 'preserve'
          };
          setTimeout(() => {
            this.router.navigate(["/auth/resetPass/codeVerification"], navigationExtras );
          }, 3000); 
           
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
           // this.nbreTotal = response.taille;
           // this.offres = response.contenu
            //this.router.navigateByUrl("/auth/resetPass/codeVerification");

          
        
          }


        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
         
          console.error('Échec de la connexion :', error.status);
        }
      );

    }
   
  









  

    ngOnInit() {

     
       
    }


   






   
}