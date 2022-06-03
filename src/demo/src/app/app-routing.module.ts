import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from 'src/demo/src/app/table/table.component';
import { DarkModeButtonComponent } from './dark-mode-button/dark-mode-button.component';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { PipesComponent } from './pipes/pipes.component';
import { ScrollPositionComponent } from './scroll-position/scroll-position.component';
import { ScrollTopButtonComponent } from './scroll-top-button/scroll-top-button.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'scroll-position',
    component: ScrollPositionComponent
  },
  {
    path: 'dark-mode-button',
    component: DarkModeButtonComponent
  },
  {
    path: 'icons',
    component: IconsComponent
  },
  {
    path: 'pipes',
    component: PipesComponent
  },
  {
    path: 'scroll-top-button',
    component: ScrollTopButtonComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
