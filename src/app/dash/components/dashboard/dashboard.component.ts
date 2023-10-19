import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Offre } from '../../api/offre';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { BackendService } from '../../service/backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tvm } from '../../api/tvm';
import { Tr } from '../../api/tr';
import { Ecme } from '../../api/ecme';
import { Operateur } from '../../api/operateur';
import { format, startOfDay } from 'date-fns';
import { parse } from 'date-fns';


interface Time {
    name: string;
    label: string;
}
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    chartData: any;
    chartDataP:any
    times!:Time[]
    products!: Product[];
    tvms!:Tvm[];
    trs!:Tr[];
    ecmes!:Ecme[];
    dataTvm!:[];
    dataTr!:[];
    dataEcme!:[];
    
    dataTvmP!:[];
    dataTrP!:[];
    dataEcmeP!:[];
    selectedTime: string
    selectedTimeP: string;
    chartOptions: any;
    chartOptionsP: any;
    subscription!: Subscription;
    tvmCount: String;
    trCount:String;
    ecmeCount:String;
    operateurs:string
    selectedOperateur:string;

    d1:string;
    d2:string;

    d1P:string;
    d2P:string;
    today = new Date(); // Obtenez la date et l'heure actuelles
    formattedDateinit = format(startOfDay(this.today), 'yyyy-MM-dd');
   
    nbreTotal:number;
    nbreValide:number=0;
    nbreInvalide:number=0;
    nbreCandidat:number;
    id:string;
    offres:Offre[];
    nbreCandidatures:number=0;
    nbreConsultations:number=0;
    stats:number[]=[];
    offreValid:number=0;
    offreInvalid:number=0;


    //@Inject
    constructor(
       
        
        private http:HttpClient,

        private productService: ProductService, public layoutService: LayoutService) {
  
    }


    getStats() {
        
    }

getOffres() {
    

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
   

      if (response == null) {
       // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
      } else {
        this.nbreTotal = response.taille;
        this.offres = response.contenu
       
        for (let i = 0; i <this.nbreTotal ;i++) {
            //this.nbreCandidatures =+ response.contenu[i].nbCandidature
            //this.nbreConsultations =+ response.contenu[i].nbConsultation
        }
      
      }
      //this.stats.push(this.nbreTotal, this.nbreCandidatures, this.nbreConsultations)
    
   
    },
    (error) => {

      // Afficher l'erreur en cas de problème
     // console.log(error.status);
      console.error('Échec de la connexion :', error.status);
    }
  );
}
















initChart() {
  
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
      
  
        if (response == null) {
         // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
        } else {
          this.nbreTotal = response.taille;
          this.offres = response.contenu
       
          for (let i = 0; i <this.nbreTotal ;i++) {
              this.nbreCandidatures = this.nbreCandidatures+ response.contenu[i].nbCandidature
              this.nbreConsultations = this.nbreConsultations+ response.contenu[i].nbConsultation
            
            }

            //console.log(this.nbreCandidatures)
        
        for (let i = 0; i <this.nbreTotal ;i++) {
            if (response.contenu[i].validite == "invalide") {
                this.offreInvalid = this.offreInvalid+1

            }
            if (response.contenu[i].validite == "valide") {
                this.offreValid = this.offreValid+1

            }
             
        }
      
        }
        this.stats.push(this.nbreTotal, this.nbreCandidatures, this.nbreConsultations)
      
      

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        
        this.chartData = {
            labels: ['Offres', 'Candidatures', 'Consultations'],
            datasets: [
                {
                    data: [this.nbreTotal,this.nbreCandidatures,this.nbreConsultations],//this.stats,//[300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.chartOptions = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
      
      },
      (error) => {
  
        // Afficher l'erreur en cas de problème
        console.log(error.status);
        console.error('Échec de la connexion :', error.status);
      }
    );
  }
  
  
  
   
        
      

/*
          
          const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
        labels: ['Abscence', 'Consultation', 'Vérification', "Paiement"],
        datasets: [
            {
                label: 'TVM',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                tension: .4
            },
            {
                label: 'Ecme',
                data: [33, 78, 80, 19, 66, 17, 90],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--green-600'),
                borderColor: documentStyle.getPropertyValue('--green-600'),
                tension: .4
            },

            {
                label: 'TR',
                data: [28, 48, 40, 19, 86, 27, ],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--yellow-600'),
                borderColor: documentStyle.getPropertyValue('--yellow-600'),
                tension: .4
            }
        ]
    };
  
    this.chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
        

    */









    ngOnInit() {
    
      
      this.getOffres();
  
      //setTimeout(this.initChart, 7000)
     this.initChart()
       
        
       
     
      


    }
        

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
