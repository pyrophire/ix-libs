import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IxIconsModule } from 'projects/ix-libs/src/lib/ix-icons/ix-icons.module';
import { IxPipesModule } from 'projects/ix-libs/src/lib/ix-pipes/ix-pipes.module';
import { IxScrollModule } from 'projects/ix-libs/src/lib/ix-scroll/ix-scroll.module';
import { IxTableModule } from 'projects/ix-libs/src/lib/ix-table/ix-table.module';
import { IxThemeButtonModule } from 'projects/ix-libs/src/lib/ix-theme-button/ix-theme-button.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IxIconsModule,
    IxPipesModule,
    IxTableModule,
    IxScrollModule,
    IxThemeButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
