import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private urlEndPoint: string = 'http://localhost:8080/apiEvento/evento';
  private httpHeaders = new HttpHeaders({ ContentType: 'application/json' });
  constructor(private http: HttpClient) {}

  recuperarEventos(): Observable<Evento[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Evento[]));
  }

  crearEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.urlEndPoint, evento, {
      headers: this.httpHeaders,
    });
  }

  leerEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.urlEndPoint}/${id}`);
  }

  actualizarEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(
      `${this.urlEndPoint}/${evento.idEvento}`,
      evento,
      {
        headers: this.httpHeaders,
      }
    );
  }

  eliminarEvento(id: number): Observable<Evento> {
    return this.http.delete<Evento>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  getPDF(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });

    return this.http.get<Blob>(this.urlEndPoint + '/generar_reporte', {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }
}
