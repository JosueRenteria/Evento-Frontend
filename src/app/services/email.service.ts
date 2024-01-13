import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private apiUrl = 'http://localhost:8080/apiEvento/enviar-correo';

  constructor(private http: HttpClient) { }

  enviarCorreo(destinatario: string, asunto: string, cuerpo: string): Observable<any> {
    const payload = { destinatario, asunto, cuerpo };
    return this.http.post(this.apiUrl, payload);
  }
}
