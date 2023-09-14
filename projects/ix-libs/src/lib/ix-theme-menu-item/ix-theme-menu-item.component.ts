import { Component, NgZone, OnInit } from '@angular/core';
import { IxDarkService } from '../ix-dark/ix-dark.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ix-theme-menu-item',
  templateUrl: './ix-theme-menu-item.component.html',
  styleUrls: ['./ix-theme-menu-item.component.scss']
})
export class ThemeMenuItemComponent implements OnInit {
  theme: string;
  constructor(private ngZone: NgZone, private darkService: IxDarkService) {}

  // will switch themes using the IxDark service
  public toggleDarkMode(): void {
    this.darkService.toggleDarkLightMode();
  }

  // will subscribe to themes to animate icon
  private _subToTheme(): void {
    this.darkService.themeStream.subscribe((ev) => {
      this.theme = ev;
    });
  }

  // will setup themes with IxDark service
  ngOnInit(): void {
    this._subToTheme();
    this.darkService.setDarkModePreference();
  }
}
