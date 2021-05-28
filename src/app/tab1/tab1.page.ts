import { DadosService } from './../services/dados.service';
import { IFilme } from '../models/IFilme.model';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  titulo = 'Videos App';
  listaVideos: IFilme[] = [
    {
      nome: 'Esquadrão Trovão (2021)',
      lancamento: '09/04/2021',
      duracao: '1h 47m',
      classificacao: 58,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/Aej7rR73kpAKce6XXBLeqijAwPD.jpg',
      genero: ['Ação', 'Aventura', 'Comédia', 'Fantasia'],
    },
    {
      nome: '22 Contra a Terra (2021)',
      lancamento: '30/04/2021',
      duracao: '5m',
      classificacao: 72,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yXhjueyyNNrGinwM9WIxuwNqzbm.jpg',
      genero: ['Família', 'Animação', 'Comédia'],
    },
    {
      nome: 'New Gods Nezha Reborn (2021)',
      lancamento: '12/02/2021',
      duracao: '1h 56m',
      classificacao: 86,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iyOgNaaDX67AUMWlzsGZVO1luoh.jpg',
      genero: ['Animação', 'Ação', 'Fantasia'],
    },
    {
      nome: 'Nova Ordem Espacial (2021)',
      lancamento: '05/04/2021',
      duracao: '2h 17m',
      classificacao: 71,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hJgEf18Sw8iwtQCzCSIQqGOLaq6.jpg',
      genero: ['Drama', 'Fantasia', 'Ficção científica'],
    },
    {
      nome: 'Miraculous World Shanghai, a lenda de Ladydragon (2021)',
      lancamento: '16/04/2021',
      duracao: '56m',
      classificacao: 78,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tf9nWFyJ745mBFkXZtPWabDYBR3.jpg',
      genero: ['Animação', 'Comédia', 'Família', 'Aventura'],
    },
  ];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router
  ) {}

  exibirFilme(filme: IFilme) {
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?',
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
}
