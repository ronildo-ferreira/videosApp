import { IListaGenero } from './../models/IGenero.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  lingua = 'pt-BR';
  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=3b1ff8ce14fb9c8c3a00944b05dc384e';

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {}

  buscarGeneros(): Observable<IListaGenero> {
    const url = `${this.apiURL}genre/movie/list${this.key}&language=${this.lingua}`;
    return this.http.get<IListaGenero>(url).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }
  async exibirErro(erro: any) {
    const toast = await this.toastController.create({
      message: 'Erro ao acessar a API.',
      duration: 2000,
      color: 'danger',
      position: 'middle',
    });
    toast.present();
    return null;
  }
}
