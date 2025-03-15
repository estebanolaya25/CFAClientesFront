export interface DatosGeneralesDto {
    Id:number;
    IdFormulario:number;
    FechaDiligenciamiento: string;
    Empresa: number;
    TipoSolicitud:number;
    ClaseTercero:number;
    CategoriaTercero:number;
    NombreRazonSocial:string;
    TipoIdentificacion:string;
    NumeroIdentificacion:string;
    DigitoVarificacion:string;
    Pais:number;
    Ciudad:string;
    TamanoTercero:number;
    ActividadEconimoca:number;
    DireccionPrincipal:string;
    codigoPostal:string;
    CorreoElectronico:string;
    Telefono:string;
    ObligadoFE:number;
    CorreoElectronicoFE:string;
    TieneSucursalesOtrosPaises:number;
    PaisesOtrasSucursales:number;
    PreguntasAdicionales: any;
  }