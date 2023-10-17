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
import { co } from '@fullcalendar/core/internal-common';
import * as html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './detailCandidat.component.html',
    providers: [MessageService, ConfirmationService]
})
export class DetailCandidatComponent implements OnInit {

  dropdownItems:any;
  selectedType:string;

    candidatures!: Candidature[];
    id:string;
    description:string;
    nom:string;
    prenom:string;
    email:string;
    titre:string;
    anneeExp:string;
    motivation:string;
    candidatureId:string;
    candidatCvId:string;
    visible: boolean = false;
    data:any;
    pdfOptions:any

    constructor(private route:ActivatedRoute, private router:Router,private customerService: CustomerService, private http:HttpClient,) {}


    /*convertToPDF(element) {
      // Remplacez 'elementId' par l'ID de l'élément HTML que vous souhaitez convertir en PDF.
  
      const options = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
  
    var cv =   html2pdf().from(element).set(options).outputPdf((pdf) => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        // Créez un lien pour télécharger le PDF généré
        /*const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        a.click();
       
      
      });
   
    }*/
convertToPdf(page:HTMLElement) {
    const doc = new jsPDF({
      unit: 'px',
      //format: this.pdfOptions.value.pageFormat === 'A4' ? [595, 842] : [842, 1191]
    });

    doc.html(page, {
      callback: (doc: jsPDF) => {
        doc.deletePage(doc.getNumberOfPages());
        doc.save('pdf-export');
      }
    });
  }

  downloadAsPDF(page:HTMLElement) {
    const options = {
      margin: 10, // Marges en pixels
      filename: 'page_en_pdf.pdf', // Nom du fichier PDF
      image: { type: 'jpeg', quality: 0.98 }, // Format d'image et qualité
      html2canvas: { scale: 2 }, // Facteur d'échelle pour l'aperçu
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Options de PDF
    };
  
    //const content = this.generateHTMLContent(); // Générez le contenu HTML
  
    html2pdf().from(page).set(options).outputPdf(pdf => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
  
      // Créez un lien pour télécharger le PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = 'page_en_pdf.pdf';
      link.click();
  
      URL.revokeObjectURL(url);
    });
  }
  
    
    showDialog() {
        this.visible = true;
    }
   getUserCv() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.candidatCvId = params["candidat"];
    
    
  })
   //  window.location.href="https://ecvback.codingagain.com/user/cv?id="+this.id;
   var appUrl = environment.baseUrl+'web/user/cv'
   const headers= new HttpHeaders({
    //'Accept': 'text/html',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
})
   const httpOptions = {headers
    ,
    responseType: 'text' as 'json'
};
   
    const body=JSON.stringify({
      id:this.candidatCvId,})

    //const resp = 
    this.http.post<any>(appUrl, body, httpOptions )
     
  .subscribe(
      (response:any) => {
        
        
        console.log(response);
       // const link = document.createElement('a');
       // html2canvas(response).then((canvas) => {
         // const imgData = canvas.toDataURL('image/png');
         // const pdf = new jsPDF('p', 'mm', 'a4');
         // pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 dimensions
          //pdf.save('contenu.pdf');
        //});
       // this.data = response;
       var a = document.createElement('a')
       
     var test =   window.open('CV', 'cv');
     test.document.write(response)
     test.document.write(
      
      ` <script>
    
        window.print()
     
      </script>
    
      `
      
    
      
      )
     

    // this.convertToPdf(response);
  //  this.downloadAsPDF(response)
      // this.router.navigate(['/table/cv', { data: response }]);
  
        if (response == null) {
         // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
        } else {
       
         
          
      
        }
      },
      (error) => {
  
        // Afficher l'erreur en cas de problème
        console.log(error);
        console.error('Échec de la connexion :', error.status);
      }
    );
    }


    getUserCvOnly() {
      this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.candidatCvId = params["candidat"];
      
      
    })
     //  window.location.href="https://ecvback.codingagain.com/user/cv?id="+this.id;
     var appUrl = environment.baseUrl+'web/user/cv'
     const headers= new HttpHeaders({
      //'Accept': 'text/html',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
  })
     const httpOptions = {headers
      ,
      responseType: 'text' as 'json'
  };
     
      const body=JSON.stringify({
        id:this.candidatCvId,})
  
      //const resp = 
      this.http.post<any>(appUrl, body, httpOptions )
       
    .subscribe(
        (response:any) => {
          
          
          console.log(response);
         // const link = document.createElement('a');
         // html2canvas(response).then((canvas) => {
           // const imgData = canvas.toDataURL('image/png');
           // const pdf = new jsPDF('p', 'mm', 'a4');
           // pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 dimensions
            //pdf.save('contenu.pdf');
          //});
         // this.data = response;
         var a = document.createElement('a')
         
       var test =   window.open('CV', 'cv');
       test.document.write(response)
      
       
  
      // this.convertToPdf(response);
    //  this.downloadAsPDF(response)
        // this.router.navigate(['/table/cv', { data: response }]);
    
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
         
           
            
        
          }
        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
          console.log(error);
          console.error('Échec de la connexion :', error.status);
        }
      );
      }
    //customers!: Customer[];

  //  representatives!: Representative[];

   // statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    



    getCandidature() {
  
      console.log(sessionStorage.getItem("id"))
      var appUrl = environment.baseUrl+'candidatureById'
      var identifiantRecruteur = sessionStorage.getItem('id');
      this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.id = params["candidature"];
        console.log(this.id);
     
      
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
            this.motivation = response.contenu[0].motivation
           
            
        
          }
        },
        (error) => {
    
          // Afficher l'erreur en cas de problème
          console.log(error.status);
          console.error('Échec de la connexion :', error.status);
        }
      );
    }


    
    getCandidat() {
  
        console.log(sessionStorage.getItem("id"))
        var appUrl = environment.baseUrl+'userById'
        var identifiantRecruteur = sessionStorage.getItem('id');
        this.route.queryParams
        .subscribe(params => {
          console.log(params); 
          this.id = params["candidat"];
          console.log(this.id);
          this.selectedType = params['statut']
          if (this.selectedType.includes("En cours")) {
            this.dropdownItems = ["En cours","Retenir", "Rejeter"]
          }else if (this.selectedType.includes("Retenue")){
            this.dropdownItems = ["Retenue","En cours", "Rejeter"]
          }
        
      }
        )
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
          })
        };
        const body = JSON.stringify({id:this.id});
        console.log(body)
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
              this.nom = response.contenu[0].nom
              this.prenom = response.contenu[0].prenom
              this.email = response.contenu[0].email
              this.description = response.contenu[0].description
              this.titre  = response.contenu[0].titre
              this.anneeExp = response.contenu[0].nbExperience
             
              
          
            }
          },
          (error) => {
      
            // Afficher l'erreur en cas de problème
            console.log(error.status);
            console.error('Échec de la connexion :', error.status);
          }
        );
      }


      validCandidat() {
        this.route.queryParams
        .subscribe(params => {
          console.log(params); 
          this.candidatureId = params["candidature"];
        
       
        
      }
        )
        const  body=JSON.stringify({
          "id":this.candidatureId,
          "statut":this.selectedType
         })
    
         var appUrl = environment.baseUrl+'update/candidature/statut'; 
         const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + btoa(environment.userAuth + ':' + environment.passAuth)
          })
        };
      console.log(body)
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
      this.dropdownItems= ["En cours", "Retenue", "Rejeter"];
        this.getCandidat();
        this.getCandidature();
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