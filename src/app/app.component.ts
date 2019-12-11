import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [

    {
      title: 'Login',
      url: '/login',
      icon: ''
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: ''
    },
    {
      title: 'Cadastro Email',
      url: '/cadastro-usuario',
      icon: ''
    },
    {
      title: 'Cadastro dados Pessoais',
      url: '/cadastro-dados',
      icon: '',
    },
    {
      title: 'Recuperar senha',
      url: '/recuperar-senha',
      icon: '',
    },
    {
      title: 'Home',
      url: '/home',
      icon: '',
    },
    {
      title: 'Produtos',
      url: '/produto',
      icon: '',
    },
    {
      title: 'Produto masculino',
      url: '/prod-masculino',
      icon: '',
    },
    {
      title: 'Produto Feminino',
      url: '/prod-feminino',
      icon: '',
    },
    {
      title: 'Produto Infantil',
      url: '/prod-infantil',
      icon: '',
    },
    {
      title: 'Cadastro Produto',
      url: '/produto-cadastro',
      icon: '',
    },
    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: '',
    },
    {
      title: 'Produto detalhe',
      url: '/produto-detalhe',
      icon: '',
    },
    {
      title: 'Pedido confirmação',
      url: '/pedido-confirmacao',
      icon: '',
    },
    {
      title: 'Pagamento PayPal',
      url: '/pagamento-pay-pal',
      icon: '',
    },
    {
      title: 'Favorito',
      url: '',
      icon: '',
    },
    {
      title: 'Perfil cadastro',
      url: '/perfil',
      icon: '',
    },
    {
      title: 'perfil lista',
      url: '/perfil-lista',
      icon: '',
    },
    {
      title: 'Pedido status',
      url: '/pedido-status',
      icon: '',
    },
    {
      title: 'Endereço lista',
      url: '/endereco-lista',
      icon: '',
    },
    {
      title: 'Dados Pessoais',
      url: '/dados-pessoais',
      icon: '',
    }
 
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
