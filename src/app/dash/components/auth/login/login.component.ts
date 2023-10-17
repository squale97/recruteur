import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { BackendService } from 'src/app/dash/service/backend.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];

    password!: string;
    username!:string;
    

    constructor(public layoutService: LayoutService,
       private messageService: MessageService ,
        private backendService:BackendService, 
        private router:Router,
        private http:HttpClient
        ) { }

    ngOnInit(): void {
       
     
    }
logAccount() {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body = JSON.stringify({email:this.username,password:this.password});

      console.log(this.username)
     var resp =  this.http.post<any>(environment.baseUrl+"loginUser", body, httpOptions);
  

   resp.subscribe(
    (response) => {
      // Succès de la connexion
      console.log(response);
      //   if (response.status == 200){
      console.log("connected")
      if (response == null) {
        // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
       } else {
        console.log(response);
        if (response.recruteur == "oui") {
       // sessionStorage.setItem("access_token", response.content.key)
        //sessionStorage.setItem("username",response.content.account.email)
          
        localStorage.setItem('admin',response.nom)
        // local
         localStorage.setItem('mail',response.username)
         sessionStorage.setItem("id", response.id)
         sessionStorage.setItem("abonnement", response.abonnement)
         console.log(response.abonnement)
         if (response.abonnement == "valide") {
          this.router.navigateByUrl("/")
         }else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Votre abonnemenrt n'est pas valide" });
         }
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Bienvenu sur l'espace recruteur" });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Vous n'etes pas recruteur" });
        }
       
       }
     },
     (error) => {

      
       console.log(error.status);
       console.error('Échec de la connexion :', error.status);
     }
   
   );
    
}

}
