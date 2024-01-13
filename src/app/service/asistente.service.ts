import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Asistente } from '../model/Asistente';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {
  private urlEndPoint: string =
    'http://localhost:8080/apiAsistente/asistente';
  private urlEndPoint2: string =
    'http://localhost:8080/apiEvento';
  private httpHeaders = new HttpHeaders({ ContentType: 'application/json' });
  constructor(private http: HttpClient) {}

  recuperarAsistente(): Observable<Asistente[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Asistente[]));
  }

  crearAsistente(asistente: Asistente): Observable<Asistente> {
    return this.http.post<Asistente>(this.urlEndPoint, asistente, {
      headers: this.httpHeaders,
    });
  }

  leerAsistente(id: number): Observable<Asistente> {
    return this.http.get<Asistente>(`${this.urlEndPoint}/${id}`);
  }

  actualizarAsistente(asistente: Asistente): Observable<Asistente> {
    return this.http.put<Asistente>(
      `${this.urlEndPoint}/${asistente.idAsistente}`,
      asistente,
      {
        headers: this.httpHeaders,
      }
    );
  }

  eliminarAsistente(id: number): Observable<Asistente> {
    return this.http.delete<Asistente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.urlEndPoint2 + '/evento');
  }

  getPDF(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });

    return this.http.get<Blob>(this.urlEndPoint + '/generar_reporte', {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }
}
