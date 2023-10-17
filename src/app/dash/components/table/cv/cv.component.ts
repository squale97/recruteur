import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ecme } from 'src/app/dash/api/ecme';
import { Operateur } from 'src/app/dash/api/operateur';
import { Tr } from 'src/app/dash/api/tr';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { setMilliseconds } from 'date-fns';

@Component({
    templateUrl: './cv.component.html',
    providers: [MessageService]
})
export class CvComponent implements OnInit{

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
  

   data: string;

   constructor(private route: ActivatedRoute, ) {}
 
   ngOnInit(): void {
     // Récupérez les données de la requête POST depuis ActivatedRoute
     this.route.params.subscribe((params) => {
      this.data = params['data'];
    });
   }


   

   
   
  

    
  
     
       
      
       
      
   
       
      
       
     
    


   
 }
