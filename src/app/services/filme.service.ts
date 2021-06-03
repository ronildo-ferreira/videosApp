import { HttpClient } from '@angular/common/http';
import { IListaFilmes } from './../models/IFilmeAPI.model';
import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  lingua = 'pt-BR';
  regiao = 'BR';
  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=3b1ff8ce14fb9c8c3a00944b05dc384e';
  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {}

  buscarFilmes(busca: string): Observable<IListaFilmes> {
    const url = `${this.apiURL}search/movie${this.key}&language=${this.lingua}&region=${this.regiao}&query=${busca}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }
  async exibirErro(erro: any) {
    const toast = await this.toastController.create({
      message: 'Erro ao acessar a API.',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
