import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ecme } from 'src/app/dash/api/ecme';
import { Operateur } from 'src/app/dash/api/operateur';
import { Tr } from 'src/app/dash/api/tr';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './ecme.component.html'
})
export class EcmeComponent implements OnInit{

    ecmes!:Ecme[];
    operateurs!:Operateur[]
    opName:string="all"
    selectedOperateur:Operateur
    selectedTime:string
    d1:string
    d2:string

    constructor(private http:HttpClient){

    }

    getOps() {

      var appUrl = environment.baseUrl+"operateurs-ecme";
      const resp = this.http.get<any>(appUrl);
      resp.subscribe(
        (response) => {
          // Succès de la connexion
          console.log(response);
          //   if (response.status == 200){
          console.log("connected")
  
          if (response == null) {
           // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
          } else {
            
            this.operateurs = response.content
          }
        },
        (error) => {
  
          // Afficher l'erreur en cas de problème
          console.log(error.status);
          console.error('Échec de la connexion :', error.status);
        }
      );
  
  }
  EcmeTab() {
    this.getEcme(this.d1, this.d2)
      }

      changeOp() {
        console.log(this.selectedOperateur)
        this.selectedOperateur.op = this.selectedOperateur["op"]
        this.getEcmeByop(this.selectedOperateur.op);
      }

  
      getEcme(d1:string, d2:string) {
        
        var appUrl=''
        var appUrl = environment.baseUrl+"historique/ecme/filtre";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       
       
        const date1 = new Date(d1)
        const date2 = new Date(d2)
        if (d1>d2) {
          alert("La date de debut est supérieure a la date de fin")
        }else { 
            var body=JSON.stringify({
                    "dateDebut":d1,
                    "dateFin":d2
                });
            //console.log(this.selectedTime)
        const resp = this.http.post<any>(appUrl, body=body, {headers});
          resp.subscribe(
            (response) => {
              // Succès de la connexion
              console.log(response);
             // this.operateurs = response.content[0].operateurs
              //console.log(this.operateurs)
              //   if (response.status == 200){
              console.log("connected")
      
              if (response == null) {
               // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
              } else {
                
                this.ecmes = response.content
              }
            },
            (error) => {
      
              // Afficher l'erreur en cas de problème
              console.log(error.status);
              console.error('Échec de la connexion :', error.status);
            }
          );
          }
      }

      getEcmeInitial() {
        var appUrl=''
        var appUrl = environment.baseUrl+"historique-ecme";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       
       
      
       
            //console.log(this.selectedTime)
        const resp = this.http.get<any>(appUrl, );
          resp.subscribe(
            (response) => {
              // Succès de la connexion
              console.log(response);
             // this.operateurs = response.content[0].operateurs
              //console.log(this.operateurs)
              //   if (response.status == 200){
              console.log("connected")
      
              if (response == null) {
               // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
              } else {
                
                this.ecmes = response.content
              }
            },
            (error) => {
      
              // Afficher l'erreur en cas de problème
              console.log(error.status);
              console.error('Échec de la connexion :', error.status);
            }
          );
      
      }
  

      getEcmeByop(operateur:string) {
        var appUrl=''
        var appUrl = environment.baseUrl+"historique/ecme/"+operateur;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       
       
      
       
            //console.log(this.selectedTime)
        const resp = this.http.get<any>(appUrl, );
          resp.subscribe(
            (response) => {
              // Succès de la connexion
              console.log(response);
             // this.operateurs = response.content[0].operateurs
              //console.log(this.operateurs)
              //   if (response.status == 200){
              console.log("connected")
      
              if (response == null) {
               // this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Aucun résultat' });
              } else {
                
                this.ecmes = response.content
              }
            },
            (error) => {
      
              // Afficher l'erreur en cas de problème
              console.log(error.status);
              console.error('Échec de la connexion :', error.status);
            }
          );
      
      }
    


    ngOnInit(): void {
      this.getOps()
      this.getEcmeInitial()  
    }
 }
