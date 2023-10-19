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
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';



interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './code.component.html',
    providers: [MessageService, ConfirmationService]
})
export class CodeComponent implements OnInit {

    

  email:string;
  code:string;
  formulaireComplet:boolean;

    constructor(public messageService:MessageService, private router:Router,private customerService: CustomerService, private http:HttpClient,private route: ActivatedRoute, private confirmationService:ConfirmationService) {}
   
    verifierFormulaire() {
      
      if (this.code === undefined || this.code === "" 
   
      
     ) {
        this.formulaireComplet = false;
      } else {
        this.formulaireComplet = true;
      }
    }

    verifCode() {
    
      var appUrl = environment.baseUrl+'validecode'
      var identifiantRecruteur = sessionStorage.getItem('id');
     
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body=JSON.stringify({
       email:this.email,
       code:this.code,
        
      })
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
         
      
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Code vérifiée avec succès!! Vous pouvez changer votre mot de passe"  });
        
          const navigationExtras: NavigationExtras = {
            queryParams: { email: this.email, client:response.client}
            // Vous pouvez également utiliser queryParamsHandling pour gérer les paramètres déjà présents dans l'URL.
            // queryParamsHandling: 'merge' ou 'preserve'
          };
          setTimeout(() => {
            this.router.navigate(["/auth/resetPass/updatePass"], navigationExtras );
          }, 3000); ; 
           
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
          
          
        
          }


        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
         
          console.error('Échec de la connexion :', error.status);
        }
      );

    }
   
  









  

    ngOnInit() {
      //this.email = this.route.snapshot.paramMap.get('email');
    
      this.route.queryParams
        .subscribe(params => {
       
          this.email = params["email"];
        
       
        
      }
        ) 
    }


   






   
}