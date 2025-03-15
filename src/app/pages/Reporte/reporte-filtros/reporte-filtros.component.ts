import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioPrincipalService } from '../../Services/main.services';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InternalDataService } from '../../Services/InternalDataService';
import { AlertModalComponent } from '../../utils/alert-modal/alert-modal.component';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporte-filtros',
  templateUrl: './reporte-filtros.component.html',
  styleUrl: './reporte-filtros.component.scss'
})
export class ReporteFiltrosComponent {
  isLoading = true;
  filterFormFecha: FormGroup;
  filterbynombre: FormGroup;
  filterbyNumeroDocumento: FormGroup;
  dataSource: any[] = [];
  usuarios: any[] = [];
  estados: any[] = [];
  
  totalItems: number;
  currentPage = 1;
  pageSize = 30;
  issuperAdmin: boolean = false;


  constructor(
    private fb: FormBuilder,
    private serviciocliente: ServicioPrincipalService,
    private router: Router,
    private modalService: NgbModal,
    private ServicioEdit: InternalDataService
  ) {
    this.filterFormFecha = this.fb.group({    

      fechaNacimientoDesde: [''],
      fechaNacimientoHasta: ['']
    });

    this.filterbynombre = this.fb.group({    
      nombre:['']
    });

    this.filterbyNumeroDocumento = this.fb.group({    
      NumeroDocumento:['']
    });
  }
  ngOnInit() {
    this.loadInitialData(); 
    this.serviciocliente.CurrentUser().subscribe((data: any)=> {


  
     this.isLoading = false;
    });   
  }



  loadInitialData(): void {

    this.isLoading = true;


  
    this.isLoading = false;
  }




  onAreaChange(event: Event) {
    const AreaSeleccioanda = Number((event.target as HTMLSelectElement).value);




    // Por ejemplo, cargar datos adicionales basados en el área seleccionada.
  }

  loadClientes(idarea:number): void {

    
  }



  

  onSearchbyname(): void {

    

    this.serviciocliente.getReporteServicioFiltro(this.filterbynombre.value.nombre).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "ReporteFormulario.xlsx";  // Puedes cambiar esto para usar el nombre del archivo real
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });


  }



  onSearchNumeroDocumento(): void {

    

    this.serviciocliente.getReporteServicioFiltroxnumerodocumento(this.filterbyNumeroDocumento.value.NumeroDocumento).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "ReporteFormulario.xlsx";  // Puedes cambiar esto para usar el nombre del archivo real
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });


  }


  ConsultaMasTelefonos(): void {

    

    this.serviciocliente.getReporteClientesmas1telefono().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "ReporteFormulario.xlsx";  // Puedes cambiar esto para usar el nombre del archivo real
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });


  }

  
  ConsultaMasDirecciones(): void {

    

    this.serviciocliente.getReporteClientesmas1Direcciones().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "ReporteFormulario.xlsx";  // Puedes cambiar esto para usar el nombre del archivo real
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });


  }


  exportToExcel2(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hoja1');
  
    // Definir estilo para los encabezados (títulos)
    const headerStyle = {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00BFFF' } // Fondo azul claro
      },
      font: {
        color: { argb: 'FFFFFF' }, // Texto en color blanco
        bold: true
      }
    };
  
   
    const dataToExport = this.dataSource.map(item => ({
      Id: item.id,
      Nombre: item.nombreUsuario,
      NombreArea: item.nombreArea,
      NombreActividad: item.nombreActividad,
      NombreCliente: item.nombreCliente,
      NombreServicio: item.nombreServicio,
      NumeroHoras: item.numeroHoras,
      FechaActividad:item.fechaActividad,
      Observacion:item.observacion
    }));
  
  
    // Agregar encabezados a la hoja de trabajo
    worksheet.addRow(['ID', 'Nombre', 'NombreArea','NombreActividad', 'NombreCliente','NombreServicio','NumeroHoras','FechaActividad','Observacion']);
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '00BFFF' } // Fondo azul claro
    };
    cell.font = {
      color: { argb: 'FFFFFF' }, // Texto en color blanco
      bold: true
    };
  });
    // Agregar datos a la hoja de trabajo
    dataToExport.forEach(item => {
      worksheet.addRow([item.Id, item.Nombre, item.NombreArea,item.NombreActividad, item.NombreCliente,item.NombreServicio,item.NumeroHoras,item.FechaActividad,item.Observacion]);
    });
  
    // Ajustar ancho de columnas (opcional)
    worksheet.columns.forEach(column => {
      column.width = 15;
    });
  
    // Generar el nombre de archivo
    const fecha = new Date();
    const fechatotal = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}_${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
    const nombreArchivo = `export-${fechatotal}.xlsx`;
  
    // Guardar el archivo y descargarlo
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, nombreArchivo);
    });
  }

  loadItems(): void {
    // Aquí cargarías los datos paginados si fuera necesario
  }
  formatDate(date: { day: number, month: number, year: number } | null): string {
    if (!date) {
      return '';
    }
    const day = date.day < 10 ? '0' + date.day : date.day;
    const month = date.month < 10 ? '0' + date.month : date.month;
    return `${day}-${month}-${date.year}`;
  }

  onReset(): void {
    

    this.dataSource = [];

  // Reinicia la paginación si es necesario
  this.currentPage = 1;
  this.totalItems = 0;
  }
}

