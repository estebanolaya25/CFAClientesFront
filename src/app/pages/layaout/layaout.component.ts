import { Component } from '@angular/core';
import { AuthService } from '../../auth/authservices/auth.services';
import { ServicioPrincipalService } from '../Services/main.services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-layaout',
  templateUrl: './layaout.component.html',
  styleUrl: './layaout.component.scss'
})
export class LayaoutComponent {
  sidebarOpen = false;
  usuario='';
  rol='';
  idiomaActual:any = '';
  menuItems:any[]=[];

 

  

menuAsminsUser = [
  {
    "label": "Inicio",
    "icon":  "", // "icon"o de dashboard (ejemplo)
    "link": "inicio",
    "children": []
  },  
    {
      "label": "Clientes",
      "icon": "bi bi-person-lines-fill", // "icon"o de servicios (ejemplo)
      "children": [
        {
          "label": "Listar Clientes",
          "icon": "bi bi-people-fill", // "icon"o de listar servicios (ejemplo)
          "link": "ListaClientes" // Ruta hacia la página de listar servicios
        },
        {
          "label": "Crear Cliente",
          "icon": "bi bi-plus-circle", // "icon"o de crear servicios (ejemplo)
          "link": "CrearCliente" // Ruta hacia la página de crear servicios
        }
      ]
    },
    { 
      "label": "Reporte",
      "icon": "bi bi-file-bar-graph", 
      "link": "ReporteFiltros",
      "children": []

    }//dash/ReporteFiltros
];



  constructor( private servicioautht:AuthService,private serviciocliente: ServicioPrincipalService,private router: Router,private translateService: TranslateService) {
    this.idiomaActual = this.translateService.currentLang || this.translateService.getBrowserLang();
    console.log("Idioma actual:", this.idiomaActual);
  }


  ngOnInit(): void {

    this.serviciocliente.CurrentUser().subscribe((data: any)=> {     
      if (data) {
        this.usuario = data.nombre + ' ' + data.apellido;
          this.menuItems = this.menuAsminsUser; 
        if (data.actualizarPass) {
          this.router.navigate(['/pages/dash/ActualizarPass']);
        }
      }else
      {
        this.servicioautht.logout();
      }
    });



  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  //ListaActividades
  signOut() {
    this.servicioautht.clearToken();
    window.location.reload();
    // Aquí puedes añadir la lógica para cerrar la sesión, por ejemplo:
    // this.authService.logout();
  }

  myaccount() {
    this.router.navigate(['/pages/dash/MiCuentaComponent']);
  }

  area = {
    nombre: '',
    jefe: '',
    descripcion: '',
    empleados: 0
  };

  onSubmit() {
    console.log('Área guardada:', this.area);
    // Aquí puedes añadir la lógica para enviar los datos al servidor
  }
}
