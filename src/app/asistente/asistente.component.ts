import { Component, OnInit } from '@angular/core';
import { Asistente } from '../model/Asistente';
import { AsistenteService } from '../service/asistente.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css'],
})
export class AsistenteComponent implements OnInit {

  titulo: string = 'Listado de Asistentes';
  listaDeEventos: Asistente[] = [];
  constructor(
    private asistenteService: AsistenteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.asistenteService
      .recuperarAsistente()
      .subscribe((lista) => {
        if (lista) {
          this.listaDeEventos = lista;
          console.log('Lista de eventos:', this.listaDeEventos);
        } else {
          console.error('La lista de eventos es nula o indefinida.');
        }
      });
  }
  
  

  descargarPDF() {
    this.asistenteService.getPDF().subscribe(
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

  eliminarAsistente(idAsistente: number): void {
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
        this.asistenteService.eliminarAsistente(idAsistente)
          .subscribe((elAsistente) => {
            this.router.navigate([this.router.url]);
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
