import { Component, inject } from '@angular/core';
import { ServicioPrincipalService } from '../../Services/main.services';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { InternalDataService } from '../../Services/InternalDataService';
import { ConfirmDeleteModalComponent } from '../../utils/confirm-delete-modal/confirm-delete-modal.component';
import { AlertModalComponent } from '../../utils/alert-modal/alert-modal.component';

@Component({
  selector: 'app-listas-clientes',
  templateUrl: './listas-clientes.component.html',
  styleUrl: './listas-clientes.component.scss'
})
export class ListasClientesComponent {
    private modalService = inject(NgbModal);
  dataSource: any[] = [];
  totalItems = 0; // Inicializado a 0
  filteredDataSource:any[] = [];
  currentPage = 1;
  pageSize = 9;
  isLoading = false;
  searchTerm: string = '';

  constructor(private userDataService: InternalDataService,private serviciocliente: ServicioPrincipalService, private paginationConfig: NgbPaginationConfig,private router: Router) {
    this.paginationConfig.boundaryLinks = true;
    this.paginationConfig.rotate = true;
  }

  ngOnInit() {
    this.loadItems(); // Llama a la función para cargar los ítems
  }

  loadItems() {
    this.isLoading = true;
    this.serviciocliente.getClientes().subscribe((data: any[])=> {
      this.dataSource = data; // Asigna los datos obtenidos al dataSource
      this.filteredDataSource = data;
      this.totalItems = data.length; // Establece el total de ítems
      this.isLoading = false;
    });
   
  }

  edit(element: any) {
    this.userDataService.setCliente(element);
    this.router.navigate(['/pages/dash/EditarCliente']);
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
  
    // Definir datos a exportar (dataSource debe ser un arreglo con los datos que quieres exportar)
    const dataToExport = this.dataSource.map(item => ({
      Id: item.id,
      Nombre: item.nombres,
      Apelido: item.apellidos,
      Identificacion: item.identificacion,
      Email: item.email,
      Activo: item.activo,
    }));
  
  
    // Agregar encabezados a la hoja de trabajo
    worksheet.addRow(['ID', 'Nombre', 'Apellido', 'Identificacion','Email','Activo']);
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
      worksheet.addRow([item.Id, item.Nombre, item.Apelido, item.Identificacion,item.Email,item.Activo]);
    });
  
    // Ajustar ancho de columnas (opcional)
    worksheet.columns.forEach(column => {
      column.width = 15;
    });
  
    // Generar el nombre de archivo
    const fecha = new Date();
    const fechatotal = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}_${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
    const nombreArchivo = `Usuarios-${fechatotal}.xlsx`;
  
    // Guardar el archivo y descargarlo
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, nombreArchivo);
    });
  }

  crearUsuario(){
    this.router.navigate(['/pages/dash/CrearCliente']);
  }

  applyFilter() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredDataSource = [...this.dataSource];
    } else {
      this.filteredDataSource = this.dataSource.filter(element =>
        (element.nombres && element.nombres.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (element.apellido1 && element.apellido1.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (element.apellido2 && element.apellido2.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  
    this.totalItems = this.filteredDataSource.length;
    this.currentPage = 1;
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.filteredDataSource.slice(startIndex, endIndex);
  }

  openConfirmDeleteModal(item: any): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.componentInstance.itemName = item.codigo;

    modalRef.result.then((result) => {
      if (result) {
        this.deleteRegistro(item.codigo);
      }
    }).catch((error) => {
      console.log('Modal dismissed with error:', error);
    });
  }

  deleteRegistro(id: number): void {

    this.serviciocliente.DeleteRegistro(id).subscribe( (response) => {    

      const modalRef = this.modalService.open(AlertModalComponent);
      modalRef.componentInstance.name = 'Registro Eliminado correctamente';
      modalRef.componentInstance.title = '';
      modalRef.componentInstance.isError=false;
      // Aquí podrías manejar la respuesta del servidor si es necesario
                              //private router: Router
      this.loadItems();
    },
    (error) => {
      const modalRef = this.modalService.open(AlertModalComponent);
      modalRef.componentInstance.name = 'Error al Eliminar Registro de Tiempo';
      modalRef.componentInstance.Error = 'Regisro Tiempo';
      modalRef.componentInstance.isError=true;
    });
  
  }


}
