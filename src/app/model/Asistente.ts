import { Evento } from './Evento';

export class Asistente {
  idAsistente: number = 0;
  email: string = '';
  fechaRegistro: string = '';
  nombre: string = '';
  materno: string = '';
  paterno: string = '';

  evento: Evento = new Evento();
  //eventos: Array<Evento> = [];
}
