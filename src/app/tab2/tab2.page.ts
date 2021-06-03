import { IGenero } from './../models/IGenero.model';
import { GeneroService } from './../services/genero.service';

import { DadosService } from './../services/dados.service';

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IListaSeries, ISerieApi } from '../models/ISerieAPI.model';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  titulo = 'Séries';
  listaSerie: IListaSeries;
  generos: string[] = [];
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public serieService: SerieService,
    public generoService: GeneroService,
    public route: Router
  ) {}

  buscarSerie(evento: any) {
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.serieService.buscarSerie(busca).subscribe((dados) => {
        console.log(dados);
        this.listaSerie = dados;
      });
    }
  }
  exibirSerie(serie: ISerieApi) {
    this.dadosService.guardarDados('serie', serie);
    this.route.navigateByUrl('/dados-serie');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o Serie?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.apresentarToast();
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'O Filme foi adicionado aos favoritos.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
  ngOnInit() {
    this.generoService.buscarGeneros('tv').subscribe((dados) => {
      console.log('Generos: ', dados.genres);
      dados.genres.forEach((genero) => {
        this.generos[genero.id] = genero.name;
      });
      this.dadosService.guardarDados('generos', this.generos);
    });
  }
}
