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
    templateUrl: './update.component.html',
    providers: [MessageService, ConfirmationService]
})
export class UpdateComponent implements OnInit {

    

  email:string;
  password:string
  formulaireComplet:boolean;
  client:string

  constructor(public messageService:MessageService, private router:Router,private customerService: CustomerService, private http:HttpClient,private route: ActivatedRoute, private confirmationService:ConfirmationService) {}

    verifierFormulaire() {
      
      if (this.email === undefined || this.email === "" 
   
      
     ) {
        this.formulaireComplet = false;
      } else {
        this.formulaireComplet = true;
      }
    }


    updatePassword() {
      var appUrl = environment.baseUrl+'update/user/password'
      
     
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body=JSON.stringify({
       email:this.email,
       password:this.password,
       id:this.client
        
      })
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
         
      
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Votre mot de passe a été réinitialiser!! Veuillez vous reconnecter"  });
          const navigationExtras: NavigationExtras = {
            queryParams: { email: this.email}
           
          };
          setTimeout(() => {
            this.router.navigateByUrl("/auth/login");
          }, 3000); 
           
          if (response == null) {
          
          } else {
         

          
        
          }


        },
        (error) => {
    
          
         
          console.error('Échec de la connexion :', error.status);
        }
      );

    }
   
  









  

    ngOnInit() {

      this.route.queryParams
      .subscribe(params => {
     
        this.email = params["email"];
        this.client = params["client"];
      
     
      
    }
      ) 
     
       
    }


   






   
}