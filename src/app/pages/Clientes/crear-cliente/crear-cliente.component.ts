import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServicioPrincipalService } from '../../Services/main.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../utils/alert-modal/alert-modal.component';
import { MensajeModalComponent } from '../../../auth/mensaje-modal/mensaje-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss'
})
export class CrearClienteComponent implements OnInit {
  private modalService = inject(NgbModal);
  formulario!: FormGroup;
  ListaTipoDocumentos: any[] = []
  generos = [
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' }
  ];

  constructor(private fb: FormBuilder,private serviciocliente : ServicioPrincipalService,private router: Router) {}

  ngOnInit(): void {
this.loadTiposDocumentos();


    this.formulario = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d{1,11}$/)]],
      nombres: ['', [Validators.required, Validators.maxLength(30)]],
      Apellido1: ['', [Validators.required, Validators.maxLength(30)]],
      Apellido2: ['', [Validators.maxLength(30)]],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direcciones: this.fb.array([this.crearDireccion()]), // Mínimo una dirección
      telefonos: this.fb.array([this.crearTelefono()]), // Mínimo un teléfono
      email: ['', [Validators.required, Validators.email]]
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
        codigo: 0, // Campo requerido por el backend
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

      const modalRef = this.modalService.open(MensajeModalComponent);
      modalRef.componentInstance.name = "Campos con errores";
      modalRef.componentInstance.title = 'Error';
      modalRef.componentInstance.isError = true;

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
