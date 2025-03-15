import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayaoutComponent } from './layaout/layaout.component';
import { JWT_OPTIONS } from '@auth0/angular-jwt';

import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';

import { ReporteComponent } from './Reportes/reporte/reporte.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReporteFiltrosComponent } from './Reporte/reporte-filtros/reporte-filtros.component';
import { CrearClienteComponent } from './Clientes/crear-cliente/crear-cliente.component';
import { ListasClientesComponent } from './clientes/listas-clientes/listas-clientes.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';





const routes: Routes = [{
  path: 'dash',
  component: LayaoutComponent,
  children: [
    {
    path: 'Inicio',
    component: InicioComponent,//EditUserComponent
     },
                  {
                  path: 'MiCuentaComponent', //CrearUsuariosComponent
                  component: MiCuentaComponent,
                   }, {
                    path: 'ActualizarPass',  //ReporteComponent
                    component: UpdatePassComponent,
                     }, {
                      path: 'CrearCliente', 
                      component: CrearClienteComponent,
                       }
                       , {
                        path: 'ListaClientes', 
                        component: ListasClientesComponent,
                         }
                         
                           , {
                            path: 'Reporte', 
                            component: ReporteComponent,
                             }
                             , {
                              path: 'ReporteFiltros', 
                              component: ReporteFiltrosComponent,
                               },
                                {
                                path: 'EditarCliente', 
                                component: EditarClienteComponent,
                                 }//EditarClienteComponent
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers:[  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
})
export class PagesRoutingModule { }
