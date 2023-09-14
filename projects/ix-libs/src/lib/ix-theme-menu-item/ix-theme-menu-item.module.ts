import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeMenuItemComponent } from './ix-theme-menu-item.component';

@NgModule({
  declarations: [ThemeMenuItemComponent],
  imports: [MatButtonModule, MatIconModule, MatMenuModule, CommonModule],
  exports: [ThemeMenuItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IxThemeMenuItemModule {}
