import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './dash/components/notfound/notfound.component';
import { ProductService } from './dash/service/product.service';
import { CountryService } from './dash/service/country.service';
import { CustomerService } from './dash/service/customer.service';
import { EventService } from './dash/service/event.service';
import { IconService } from './dash/service/icon.service';
import { NodeService } from './dash/service/node.service';
import { PhotoService } from './dash/service/photo.service';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
