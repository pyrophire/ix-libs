import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IxDarkService } from '../ix-dark/ix-dark.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ix-theme-menu-item',
    templateUrl: './ix-theme-menu-item.component.html',
    styleUrls: ['./ix-theme-menu-item.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule, MatMenuModule]
})
export class ThemeMenuItemComponent {
    theme: string = 'light';
    private darkService = inject(IxDarkService);

    // will switch themes using the IxDark service
    public toggleDarkMode(): void {
        this.darkService.toggleDarkLightMode();
    }

    constructor() {
        effect(() => {
            this.theme = this.darkService.theme();
        });
        this.darkService.setDarkModePreference();
    }
}
