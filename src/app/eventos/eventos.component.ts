import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import Swal from 'sweetalert2';
import { EventoService } from '../service/evento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  titulo: string = 'Listado de Eventos';
  listaDeEventos: Evento[] = [];
  /*[
    {
      idEvento: 1,
      nombreEvento: 'posada',
      descripcionEvento: 'venir en pijama',
      fechaCreacion: '2023-12-19',
    },
    {
      idEvento: 2,
      nombreEvento: 'piñata',
      descripcionEvento: 'romper la piñata',
      fechaCreacion: '2023-12-19',
    },
    {
      idEvento: 3,
      nombreEvento: 'villancicos',
      descripcionEvento: 'cantar muucho',
      fechaCreacion: '2023-12-19',
    },
  ];*/
  constructor(
    private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventoService
      .recuperarEventos()
      .subscribe((lista) => (this.listaDeEventos = lista));
    
    console.log(this.listaDeEventos);
    
  }

  delete(): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminar!',
          text: 'El registro se eliminó satisfactoriamente.',
          icon: 'success',
        });
      }
    });
  }

  descargarPDF() {
    this.eventoService.getPDF().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        // Puedes usar esta URL para abrir el PDF en una nueva pestaña o descargarlo
        window.open(url);
      },
      (error) => {
        console.error('Error al obtener el archivo PDF', error);
      }
    );
  }
}
