import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServicioPrincipalService } from '../../Services/main.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../utils/alert-modal/alert-modal.component';
import { MensajeModalComponent } from '../../../auth/mensaje-modal/mensaje-modal.component';
import { Router } from '@angular/router';
import { InternalDataService } from '../../Services/InternalDataService';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent implements OnInit {
  cliente: any = {};
  private modalService = inject(NgbModal);
  formulario!: FormGroup;
  ListaTipoDocumentos: any[] = []
  generos = [
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' }
  ];

  constructor(private userDataService: InternalDataService,private fb: FormBuilder,private serviciocliente : ServicioPrincipalService,private router: Router) {}

  ngOnInit(): void {
this.loadTiposDocumentos();
this.cliente = this.userDataService.getCliente();

if (this.cliente==undefined || this.cliente==null)
{
  this.router.navigate(['/pages/dash/ListaClientes']);

}

    this.formulario = this.fb.group({
      codigo:[this.cliente.codigo],
      tipoDocumento: [this.cliente.idTipoDocumento, Validators.required],
      numeroDocumento: [this.cliente.numeroDocumento, [Validators.required, Validators.pattern(/^\d{1,11}$/)]],
      nombres: [this.cliente.nombres, [Validators.required, Validators.maxLength(30)]],
      Apellido1: [this.cliente.apellido1, [Validators.required, Validators.maxLength(30)]],
      Apellido2: [this.cliente.apellido2, [Validators.maxLength(30)]],
      genero: [this.cliente.genero, Validators.required],
      fechaNacimiento: [this.cliente.fechaNacimiento, Validators.required],
      direcciones: this.fb.array([]), // Mínimo una dirección
      telefonos: this.fb.array([]), // Mínimo un teléfono
      email: [this.cliente.email, [Validators.required, Validators.email]]
    });

    const direccionesArray = this.formulario.get('direcciones') as FormArray;
this.cliente.direcciones.forEach((direccion: any) => {
  direccionesArray.push(this.crearDireccionConDatos(direccion));
});

// Llenar teléfonos
const telefonosArray = this.formulario.get('telefonos') as FormArray;
this.cliente.telefonos.forEach((telefono: any) => {
  telefonosArray.push(this.crearTelefonoConDatos(telefono));
});
  }

  crearDireccionConDatos(direccion: any): FormGroup {
    return this.fb.group({
      id: [direccion.id],
      direccion: [direccion.direccion, Validators.required],
      tipo: [direccion.clase, Validators.required] // Cambia 'clase' según tus datos
    });
  }

  crearTelefonoConDatos(telefono: any): FormGroup {
    return this.fb.group({
      id: [telefono.id],
      telefono: [telefono.telefono, [Validators.required, Validators.pattern(/^\d{1,15}$/)]],
      tipo: [telefono.clase, Validators.required] // Cambia 'clase' según tus datos
    });
  }
  

  loadTiposDocumentos(): void {
    this.serviciocliente.ListaTiposDocumentos().subscribe(data => {
      this.ListaTipoDocumentos = data;
    });
  }

  // Método para inicializar un grupo para direcciones
  crearDireccion(): FormGroup {
    return this.fb.group({
      id:[0],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      tipo: ['', Validators.required], // Ejemplo: casa, laboral
      idCliente:[0]
    });
  }

  // Método para inicializar un grupo para teléfonos
  crearTelefono(): FormGroup {
    return this.fb.group({
      id:[0],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{1,10}$/)]],
      tipo: ['', Validators.required] ,
      idCliente:[0]
    });
  }

  // Obtener las direcciones como FormArray
  get direcciones(): FormArray {
    return this.formulario.get('direcciones') as FormArray;
  }

  // Obtener los teléfonos como FormArray
  get telefonos(): FormArray {
    return this.formulario.get('telefonos') as FormArray;
  }

  // Agregar una nueva dirección
  agregarDireccion(): void {
    this.direcciones.push(this.crearDireccion());
  }

  // Eliminar una dirección específica
  eliminarDireccion(index: number): void {
    this.direcciones.removeAt(index);
  }

  // Agregar un nuevo teléfono
  agregarTelefono(): void {
    this.telefonos.push(this.crearTelefono());
  }

  // Eliminar un teléfono específico
  eliminarTelefono(index: number): void {
    this.telefonos.removeAt(index);
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      // Convertir el valor del formulario a JSON


    

      const formularioJson3 = {
        codigo: this.formulario.value.codigo, // Campo requerido por el backend
        idTipoDocumento: parseInt(this.formulario.value.tipoDocumento), // Asegúrate de enviar este campo
        tipoDocumento: "string", // Elimina este si `idTipoDocumento` es suficiente
        numeroDocumento: this.formulario.value.numeroDocumento,
        nombres: this.formulario.value.nombres,
        apellido1: this.formulario.value.Apellido1, // Cambia el nombre aquí
        apellido2: this.formulario.value.Apellido2 || "Sin segundo apellido", // Envía un valor por defecto si es opcional
        genero: this.formulario.value.genero,
        fechaNacimiento: this.formulario.value.fechaNacimiento,
        direcciones: this.formulario.value.direcciones.map((direccion: any) => ({
          id: direccion.id || 0,
          direccion: direccion.direccion,
          clase: direccion.tipo, // Cambia 'tipo' a 'clase'
          idCliente: direccion.idCliente || 0
        })),
        telefonos: this.formulario.value.telefonos.map((telefono: any) => ({
          id: telefono.id || 0,
          telefono: telefono.telefono,
          clase: telefono.tipo, // Cambia 'tipo' a 'clase'
          idCliente: telefono.idCliente || 0
        })),
        email: this.formulario.value.email
      };
  
      console.log(formularioJson3)
      const formularioJson = this.formulario.value
      this.serviciocliente.GuardarInfoCliente(formularioJson3).subscribe(
        (response) => {
         // this.isLoading = false;
          const modalRef = this.modalService.open(MensajeModalComponent);
          modalRef.componentInstance.name = 'Usuario creado correctamente';
          modalRef.componentInstance.title = '';
          modalRef.componentInstance.isError = false;
          this.router.navigate(['/pages/dash/ListaClientes']);
        },
        (error) => {
          //this.isLoading = false;


          const modalRef = this.modalService.open(MensajeModalComponent);
          modalRef.componentInstance.name = error.error;
          modalRef.componentInstance.title = 'Error';
          modalRef.componentInstance.isError = true;

          //this.resetForm();
        });


      // Aquí puedes enviar los datos al backend si es necesario
    } else {

this.marcarFormularioComoTocado();
      
      const formularioJson = JSON.stringify(this.formulario.value, null, 2);
    }
  }
  

  marcarFormularioComoTocado(): void {
    this.markAllAsTouched(this.formulario);
  }
  
  private markAllAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
