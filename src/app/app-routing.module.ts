import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'cadastro-usuario', loadChildren: './cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule' },
  { path: 'recuperar-senha', loadChildren: './recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'produto', loadChildren: './produto/produto.module#ProdutoPageModule' },
  { path: 'produto-cadastro', loadChildren: './produto-cadastro/produto-cadastro.module#ProdutoCadastroPageModule' },
  { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' },
  { path: 'produto-detalhe', loadChildren: './produto-detalhe/produto-detalhe.module#ProdutoDetalhePageModule' },
  { path: 'perfil-lista', loadChildren: './perfil-lista/perfil-lista.module#PerfilListaPageModule' },
  { path: 'pedido-status', loadChildren: './pedido-status/pedido-status.module#PedidoStatusPageModule' },
  { path: 'pedido-confirmacao', loadChildren: './pedido-confirmacao/pedido-confirmacao.module#PedidoConfirmacaoPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

