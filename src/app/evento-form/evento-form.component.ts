import { Component } from '@angular/core';
import { Evento } from '../model/Evento';
import { EventoService } from '../service/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent {
  titulo: string = 'Eventos form';
  evento: Evento = new Evento();
  constructor(
    private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.eventoService
        .leerEvento(id)
        .subscribe((elEvento) => (this.evento = elEvento));
    });
  }

  registrarEvento():void{
    this.eventoService.crearEvento(this.evento).subscribe((eventoCreado)=>{
      this.router.navigate(['/eventos']);
    });
    Swal.fire(
      'Registrar evento',
      `${this.evento.nombreEvento} Se ha registrado correctamente.`,
      'success'
    );
  }

  actualizarEvento():void{
    this.eventoService.actualizarEvento(this.evento).subscribe((eventoAct)=>{
      this.router.navigate(['/eventos']);
    });
    Swal.fire(
      'Actualizar Asistente',
      `${this.evento.nombreEvento} Se ha actualizado correctamente.`,
      'success'
    );
  }

  eliminarEvento():void{
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
        this.eventoService.eliminarEvento(this.evento.idEvento).subscribe((eventoElim)=>{

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
