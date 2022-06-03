import {
  MatColorFormats,
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS
} from '@angular-material-components/color-picker';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TableComponent } from 'src/demo/src/app/table/table.component';
import {
  IxPipesModule,
  IxScrollModule,
  IxScrollProgressModule,
  IxTableHeaderModule,
  IxThemeButtonModule
} from '../../../../projects/ix-libs/src/public_api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DarkModeButtonComponent } from './dark-mode-button/dark-mode-button.component';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { MaterialModule } from './material.module';
import { PipesComponent } from './pipes/pipes.component';
import { ScrollPositionComponent } from './scroll-position/scroll-position.component';
import { ScrollTopButtonComponent } from './scroll-top-button/scroll-top-button.component';

export const CUSTOM_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ScrollPositionComponent,
    HomeComponent,
    IconsComponent,
    PipesComponent,
    ScrollTopButtonComponent,
    DarkModeButtonComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IxPipesModule,
    // IxTableModule,
    IxScrollModule,
    IxScrollProgressModule,
    IxThemeButtonModule,
    IxTableHeaderModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    MaterialModule,
    NgxMatColorPickerModule
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule {}
