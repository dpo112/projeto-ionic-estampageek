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
      title: 'Masculino',
      url: '',
      icon: 'man'
    },
    {
      title: 'Feminino',
      url: '',
      icon: 'woman'
    },
    {
      title: 'Infantil',
      url: '',
      icon: 'person'
    },
    {
      title: 'sair',
      url: 'logoff',
      icon: 'exit',
    },
    {
      title: 'Cadastrar',
      url: '/produto-cadastro',
      icon: 'exit',
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
