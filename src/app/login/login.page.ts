import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;
  constructor(public toastController: ToastController, private route: Router) {}

  ngOnInit() {}

  login() {
    if ((this.email === 'admin@admin.com' && this.senha === 'admin')) {
      this.route.navigateByUrl('tabs/tab1');
      this.presentToast('Seja Bem Vindo!', 'success');
    } else {
      this.presentToast('Erro! E-mail e/ou Senha inválida!', 'danger');
    }
  }
  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: cor,
    });
    toast.present();
  }
}
