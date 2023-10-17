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
import { Router } from '@angular/router';


interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tvm.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TvmComponent implements OnInit {

    

    offres!: Offre[];

    //customers!: Customer[];

  //  representatives!: Representative[];

   // statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(public messageService:MessageService, private router:Router,private customerService: CustomerService, private http:HttpClient, private confirmationService:ConfirmationService) {}



    onSave(severity: string) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to save it in Gallery?',
        accept: () => {
          this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
        }
      });
    }
  










    

    showT(){
      this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    }
     suppressOffre(id:string) {
   
      console.log(id)
      var appUrl = environment.baseUrl+'delete/emploi'
      var identifiantRecruteur = sessionStorage.getItem('id');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
        })
      };
      const body = JSON.stringify({id:id});
      const resp = this.http.post<any>(appUrl, body , httpOptions);
      resp.subscribe(
        (response) => {
          // Succès de la connexion
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Offre supprimé' });
           console.log("ok")
          //   if (response.status == 200){
            window.location.reload()
    
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
           // this.nbreTotal = response.taille;
             
           
        
          }
        
        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
          console.log(error.status);
          console.error('Échec de la connexion :', error.status);
        }
      );
   
     }

    goToEdit(){
      this.router.navigate["/editOffre"]
    }
    getOffres() {
  
        console.log(sessionStorage.getItem("id"))
        var appUrl = environment.baseUrl+'emploiByRecruteur'
        var identifiantRecruteur = sessionStorage.getItem('id');
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
          })
        };
        const body = JSON.stringify({recruteur:identifiantRecruteur});
        const resp = this.http.post<any>(appUrl, body , httpOptions);
        resp.subscribe(
          (response) => {
            // Succès de la connexion
            console.log(response);
            //   if (response.status == 200){
            console.log("connected")
      
            if (response == null) {
             // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
            } else {
             // this.nbreTotal = response.taille;
              this.offres = response.contenu
              console.log(this.offres);
               //document.getElementBconyId("trash").onclick=this.suppressOffre(response.)
          
            }
          },
          (error) => {
      
            // Afficher l'erreur en cas de problème
            console.log(error.status);
            console.error('Échec de la connexion :', error.status);
          }
        );
      }

    ngOnInit() {

        this.getOffres();
       /* this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
        });
*/
        /*this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];
*/
        /*this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];*/
    }


    confirm2(id:string) {
      this.confirmationService.confirm({
          message: 'Voulez vous vraiment supprimer cette offre',
          header: 'Suppression',
          icon: 'pi pi-info-circle',
          accept: () => {
            console.log(id)
            var appUrl = environment.baseUrl+'delete/emploi'
            var identifiantRecruteur = sessionStorage.getItem('id');
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
              })
            };
            const body = JSON.stringify({id:id});
            const resp = this.http.post<any>(appUrl, body , httpOptions);
            resp.subscribe(
              (response) => {
                // Succès de la connexion
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Offre supprimée' });
                 console.log("ok")
                //   if (response.status == 200){
                  window.location.reload()
          
                if (response == null) {
                 // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
                } else {
                 // this.nbreTotal = response.taille;
                   
                 
              
                }
              
              },
              (error) => {
          
                // Afficher l'erreur en cas de problème
                console.log(error.status);
                console.error('Échec de la connexion :', error.status);
              }
            );
              
              //this.messageService.add({ severity: 'info', summary: 'Supprimée', detail: 'Offre supprimée' });
          },
          reject: ()=> {
            console.log("refuser");
          }
      });
  }






    clear(table: Table) {
        table.clear();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
        return "ok"
    }
}