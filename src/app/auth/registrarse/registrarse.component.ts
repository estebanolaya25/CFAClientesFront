import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../authservices/auth.services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {
  private modalService = inject(NgbModal);
  ListaTipoDocumentos: any[] = [];
  Mensaje:string='';
  boolerror=false;
  isLoading = false;
  isError: boolean=false;
  @Input() error: string | null;
  user: any;
  @Output() submitEM = new EventEmitter();
  email: string = '';
  password: string = '';
  @ViewChild('modal') modal: ElementRef;
  Lang:string='es';
 

  recuperarForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required] ),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router,private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    // Opcional: cargar el idioma basado en una preferencia del usuario
    this.Lang = localStorage.getItem('language') || 'es';
    this.translate.use(this.Lang);
  }




  loadTiposDocumentos(): void {
    this.authService.ListaTiposDocumentos(this.Lang).subscribe(data => {
      this.ListaTipoDocumentos = data;
    });
  }

  abrirModal() {
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'block'; // Mostrar el modal
    modalElement.classList.add('show'); // Añadir clase 'show' para Bootstrap
    document.body.classList.add('modal-open'); // Prevenir el desplazamiento
  }

  cerrarModal() {
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'none'; // Ocultar el modal
    modalElement.classList.remove('show'); // Quitar clase 'show'
    document.body.classList.remove('modal-open'); // Permitir el desplazamiento
  }
}
