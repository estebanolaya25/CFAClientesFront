import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { LayaoutComponent } from './layaout/layaout.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from '../auth/authservices/auth.services';
import { NgbDateParserFormatter, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuItemComponent } from './layaout/menu-item.component';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlertModalComponent } from './utils/alert-modal/alert-modal.component';
import { ServicioPrincipalService } from './Services/main.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomDateParserFormatter } from './utils/FormatoFecha/custom-date-parser-formatter';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ReporteComponent } from './Reportes/reporte/reporte.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';

import { InicioComponent } from './inicio/inicio.component';

import { ConfirmDeleteModalComponent } from './utils/confirm-delete-modal/confirm-delete-modal.component';

import { ReporteFiltrosComponent } from './Reporte/reporte-filtros/reporte-filtros.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarComponent } from './layaout/sidebar/sidebar.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // o cualquier otra localización que prefieras
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { NgxFileDropModule } from 'ngx-file-drop';

import { AlertaGuardadoSinValidacionComponent } from './utils/alerta-guardado-sin-validacion/alerta-guardado-sin-validacion.component';

import { RechazoModalComponent } from './utils/rechazo-modal/rechazo-modal.component';

import { CrearClienteComponent } from './Clientes/crear-cliente/crear-cliente.component';
import { ListasClientesComponent } from './clientes/listas-clientes/listas-clientes.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';


registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [

    LayaoutComponent,
    MenuItemComponent,

    AlertModalComponent,

    MiCuentaComponent,
    ReporteComponent,
    UpdatePassComponent,
    InicioComponent,

    ConfirmDeleteModalComponent,

    ReporteFiltrosComponent,
    SidebarComponent,
   

    AlertaGuardadoSinValidacionComponent,
    
    RechazoModalComponent,

    CrearClienteComponent,
      ListasClientesComponent,
      EditarClienteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxChartsModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbPaginationModule ,
    NgxFileDropModule
  ],exports: [
    LayaoutComponent,


  ],
 
  providers:[
    AuthService,
    ServicioPrincipalService,
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    // { provide: LOCALE_ID, useValue: 'es-CO' } ,
    { provide: NgbDatepickerConfig, useValue: { locale: 'es-CO' } }
    
  ]
})
export class PagesModule { }
