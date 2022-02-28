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
import { IxPipesModule, IxScrollModule, IxScrollProgressModule, IxThemeButtonModule } from 'ix-libs';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { ScrollPositionComponent } from './scroll-position/scroll-position.component';

export const CUSTOM_MAT_COLOR_FORMATS: MatColorFormats = {
  display: {
    colorInput: 'hex'
  }
};

@NgModule({
  declarations: [AppComponent, ScrollPositionComponent, HomeComponent],
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
