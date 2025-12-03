import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IxDarkService } from '../ix-dark/ix-dark.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ix-theme-button',
    templateUrl: './ix-theme-button.component.html',
    styleUrls: ['./ix-theme-button.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class ThemeButtonComponent {
    theme: string = 'light';
    private darkService = inject(IxDarkService);

    // will switch themes using the IxDark service
    public toggleDarkMode(): void {
        this.darkService.toggleDarkLightMode();
    }

    // reactively mirror the service's theme signal
    constructor() {
        effect(() => {
            this.theme = this.darkService.theme();
        });
        // initialize according to preferences
        this.darkService.setDarkModePreference();
    }
}
