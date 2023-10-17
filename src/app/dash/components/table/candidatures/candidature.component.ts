import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/dash/api/customer';
import { CustomerService } from 'src/app/dash/service/customer.service';
import { Product } from 'src/app/dash/api/product';
import { ProductService } from 'src/app/dash/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offre } from 'src/app/dash/api/offre';
import { Candidature } from 'src/app/dash/api/candidature';
import { ActivatedRoute, Router } from '@angular/router';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './candidature.component.html',
    providers: [MessageService, ConfirmationService]
})
export class CandidatureComponent implements OnInit {

    

    candidatures!: Candidature[];
    id:string

    //customers!: Customer[];

  //  representatives!: Representative[];

   // statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor(private route:ActivatedRoute, private router:Router,private customerService: CustomerService, private http:HttpClient,) {}



    
    getCandidatures() {
  
        console.log(sessionStorage.getItem("id"))
        var appUrl = environment.baseUrl+'candidatureByEmploi'
        var identifiantRecruteur = sessionStorage.getItem('id');
        this.route.queryParams
        .subscribe(params => {
          console.log(params); 
          this.id = params["offre"];
          console.log(this.id);
       
        
      }
        )
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
          })
        };
        const body = JSON.stringify({emploi:this.id});
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
             // this.offres = response.contenu
              console.log(response);
              this.candidatures = response.contenu
              
          
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

        this.getCandidatures();
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