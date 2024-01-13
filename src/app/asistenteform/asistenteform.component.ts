import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import { Asistente } from '../model/Asistente';
import { AsistenteService } from '../service/asistente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-asistenteform',
  templateUrl: './asistenteform.component.html',
  styleUrls: ['./asistenteform.component.css'],
})
export class AsistenteformComponent implements OnInit {

  titulo: string = 'asistente form';
  listaDeEventos: Evento[] = [];
  asistente: Asistente = new Asistente();
  constructor(
    private asistenteService: AsistenteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.asistenteService
        .leerAsistente(id)
        .subscribe((elAsistente) => {
          this.asistente = elAsistente;
          console.log('Asistente JSON:', elAsistente);
        });
    });
  
    this.asistenteService
      .obtenerEventos()
      .subscribe((eventosRecuperados) => {
        this.listaDeEventos = eventosRecuperados;
        console.log('Lista de Eventos JSON:', eventosRecuperados);
      });
  }
  

  registrarAsistente(): void {
    // Asigna manualmente el idEvento que desees
    this.asistente.evento = {
      idEvento: 2,
      nombreEvento: 'Nombre del Evento',
      descripccionEvento: 'Descripción del Evento',
      fechaCreacion: '2023-01-12' // Asegúrate de asignar una fecha válida
    };

    this.asistenteService
        .crearAsistente(this.asistente)
        .subscribe((elAsistente) => {
            this.router.navigate(['/asistentes']);
            this.enviarCorreo(this.asistente.email);
        });
    
    Swal.fire(
        'Registrar Asistente',
        `${this.asistente.nombre} Se ha registrado correctamente.`,
        'success'
    );
  }

  private enviarCorreo(destinatario: string): void {
    const asunto = 'Registro de Asistencia';
    const cuerpo = 'Se registraron correctamente los datos, checa tu asistencia';

    this.emailService.enviarCorreo(destinatario, asunto, cuerpo).subscribe(
      () => {
        console.log('Correo enviado con éxito');
      },
      (error) => {
        // Manejo de errores
        console.error('Error al enviar el correo', error);
      }
    );
  }


  actualizarAsistente(): void {

    // Asigna manualmente el idEvento que desees
    this.asistente.evento = {
      idEvento: 2,
      nombreEvento: 'Nombre del Evento',
      descripccionEvento: 'Descripción del Evento',
      fechaCreacion: '2023-01-12' // Asegúrate de asignar una fecha válida
    };

    this.asistenteService
      .actualizarAsistente(this.asistente)
      .subscribe((elAsistente) => {
        this.router.navigate(['/asistentes']);
      });
    Swal.fire(
      'Actualizar Asistente',
      `${this.asistente.nombre} Se ha actualizado correctamente.`,
      'success'
    );
  }

  eliminarAsistente(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.asistenteService.eliminarAsistente(this.asistente.idAsistente)
          .subscribe((elAsistente) => {
            this.router.navigate(['/asistentes']);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    })
  }
}
