import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers:[MessageService]
})

export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private router:Router, public layoutService: LayoutService, private messageService:MessageService) { }
    ngOnInit(): void {
        


        this.items = [
            {
                label: sessionStorage.getItem('username'),
                items: [
                    {
                        label: 'Se Déconnecter',
                        icon: 'pi pi-user',
                        command: () => {
                            this.logout();
                        }
                    },
                    /*{
                        label: 'Delete',
                        icon: 'pi pi-times',
                        //command: () => {
                            //this.delete();
                      //  }
                    }*/
                ]
            },
        ]
    }

    logout() {
        sessionStorage.removeItem("access_token")
        console.log(sessionStorage.getItem("access_token"))
        this.router.navigateByUrl("/auth/login")
    }
   
}
