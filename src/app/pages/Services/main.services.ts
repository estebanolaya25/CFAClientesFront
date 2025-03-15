import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment.prod';
import { Cliente } from '../Models/ClienteModelDto';
import { Area } from '../Models/AreaModelDto';
import { Servicio } from '../Models/ServiciosModelDto';
import { Actividad } from '../Models/ActividadModelDto';
import { RegistroActividades } from '../Models/RegistroActividadDto';
import { DatosGeneralesDto } from '../Models/DatosGeneralesDto';
import { SSF } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ServicioPrincipalService {

  private tokenKey = 'auth_token';
  private apiUrl =`${environment.apiUrl}/`;    

  private readonly apiCurrenUser: string = 'auth/current';
  private readonly Apichangepassword: string = 'auth/passwordchange';


  private readonly apilistClientes: string = 'Clientes/ListaClientes';


  private readonly ApiGuardaInfoCliente: string = 'Clientes/GuardaDatosCliente';

  


  private readonly apilistTipoDocumentos: string = 'ListasSeleccion/listaTiposDocumentos';



  private readonly ApiUpdatepassword: string = 'auth/passwordUpdate';
  //url reporte



  private readonly ApiRpteArea :string = 'Reporte/reportehorastrabajadasarea';
  private readonly ApiRpteUsuario: string = 'Reporte/ReporteRegistroTiemposxUsuario';
  private readonly ApiRpreCliente: string = 'Reporte/ReporteRegistroTiemposxCliente';
  private readonly apiReporteServicio: string = 'Reporte/ReporteRegistroTiemposxServicio';

  private readonly apiReporteServicioFiltros: string = 'Clientes/GenerarReportexNombre';

  
  private readonly apiReporteServicioFiltrosxnumerodocumento: string = 'Clientes/GenerarReportexNumeroDocumento';


  private readonly apiReporteClientesmas1telefono: string = 'Clientes/GenerarReportemasuntelefrono';
  private readonly apiReporteClientesmas1Direcciones: string = 'Clientes/GenerarReportemasunDireccion';


  private readonly apideleteRegistro: string = 'Clientes/EliminarCliente?Codigo=';


  private readonly apivalidadocumento: string = 'RegistroFormulario/ValidaDocumentoFirmado';
  private headers: any;
  private token: any;
  constructor(private http: HttpClient) { 

    this.token= this.gettoken();
    this.headers = {           
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      };

  }

  gettoken(): string | null {
    const tokenString = localStorage.getItem(this.tokenKey);
  if (!tokenString) {
    return null;  // No hay token almacenado
  }  
  try {
    const localestorage = JSON.parse(tokenString);
    const token = localestorage.token.access_token;
    return token;
  } catch (e) {
    console.error('Error parsing token from localStorage', e);
    return null;
  }
}


GuardarInfoCliente(data:any): Observable<any>{
  return  this.http.post(`${this.apiUrl}${this.ApiGuardaInfoCliente}`, data, this.headers);
}


ListaTiposDocumentos(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}${this.apilistTipoDocumentos}`,this.headers);
}


getClientes(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}${this.apilistClientes}`,this.headers);
}

CurrentUser(): Observable<any>{  
  return this.http.get<any>(`${this.apiUrl}${this.apiCurrenUser}`,this.headers);
}

validaFirmadocumento(IdFormualio:number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}${this.apivalidadocumento}?IdFormulario=${IdFormualio}`,this.headers);
}

changepassword(data:any): Observable<any>{
  return  this.http.post(`${this.apiUrl}${this.Apichangepassword}`, data, this.headers);
}



DeleteRegistro(IdRegistro:number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}${this.apideleteRegistro}${IdRegistro}`,this.headers);
}














//Reportes

getReporteArea(): Observable<any>{  
  return this.http.get<any>(`${this.apiUrl}${this.ApiRpteArea}`,this.headers);
}

getReporteUsuarios(): Observable<any>{  
  return this.http.get<any>(`${this.apiUrl}${this.ApiRpteUsuario}`,this.headers);
}

getAReporteCliente(): Observable<any>{  
  return this.http.get<any>(`${this.apiUrl}${this.ApiRpreCliente}`,this.headers);
}

getReporteServicio(): Observable<any>{  
  return this.http.get<any>(`${this.apiUrl}${this.apiReporteServicio}`,this.headers);
  }

  getReporteServicioFiltro(filtro:string): Observable<any>{  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return  this.http.get(`${this.apiUrl}${this.apiReporteServicioFiltros}?Nombre=${filtro}`, {
      headers,
      responseType: 'blob'
    });
  }


  getReporteServicioFiltroxnumerodocumento(filtro:string): Observable<any>{  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return  this.http.get(`${this.apiUrl}${this.apiReporteServicioFiltrosxnumerodocumento}?NumeroDocumento=${filtro}`, {
      headers,
      responseType: 'blob'
    });
  }


  getReporteClientesmas1telefono(): Observable<any>{  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return  this.http.get(`${this.apiUrl}${this.apiReporteClientesmas1telefono}`, {
      headers,
      responseType: 'blob'
    });
  }

  getReporteClientesmas1Direcciones(): Observable<any>{  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return  this.http.get(`${this.apiUrl}${this.apiReporteClientesmas1Direcciones}`, {
      headers,
      responseType: 'blob'
    });
  }






  updatepassword(data:any): Observable<any>{
    return  this.http.post(`${this.apiUrl}${this.ApiUpdatepassword}`, data, this.headers);
  }






//apiUploadArchivosolo
}