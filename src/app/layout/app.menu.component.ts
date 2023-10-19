import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Paiements',
                items: [
                    { label: 'Mes offres', icon: 'pi pi-file', routerLink: ['/table/offre'] },
                 //   { label: 'Paiement TR', icon: 'pi pi-fw pi-id-card', routerLink: ['/table/tr'] },
                    //{ label: 'Paiement Ecme', icon: 'pi pi-fw pi-id-card', routerLink: ['/table/ecme'] },
                   
                    
                ]
            },
          
          
            
            
          
        ];
    }
}
