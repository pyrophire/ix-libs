import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { IxLocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IxDarkService {
  prefersDark: boolean;
  localStorageLightDark: string;
  currentMode: string;
  themeStream = new ReplaySubject<string>();
  storageService: IxLocalStorageService;

  constructor(@Inject(DOCUMENT) private document: any, storageService: IxLocalStorageService) {
    this.prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.localStorageLightDark = this.storageService.getItem('DarkModePref');
  }
  // ******************************************************************************
  // This service requires Angular Material's theming to have two themes
  // with .light and .dark wrapping classes.
  // It is possible to use this service outside of Angular Material, but
  // native framework element coloring will not be affected without
  // custom css overwrites.
  // ******************************************************************************

  // used onInit() to evaluate users system preferences
  // if they have a preset preferences in localstorage or window.storage
  // it will apply that theme, if not it will check system settings
  // if they have dark mode enabled, it will apply the dark mode to the app
  public setDarkModePreference(): void {
    if (this.localStorageLightDark) {
      this.document.body.classList.add(this.localStorageLightDark);
      this._toggleBodyClasses(this.localStorageLightDark);
      if (this.localStorageLightDark === 'dark') {
        this._toggleBodyClasses('dark');
        this.themeStream.next('dark');
      } else {
        this._toggleBodyClasses('light');
        this.themeStream.next('light');
      }
    } else if (this.prefersDark) {
      this._toggleBodyClasses('dark');
      this.themeStream.next('dark');
    } else {
      this._toggleBodyClasses('light');
      this.themeStream.next('light');
    }
  }

  // This function toggles between light and dark mode.
  // It is used in the app.component.ts file.
  // The classes 'light' and 'dark' are added to the body tag.
  // The themeStream is used to update the theme in the header component.

  public toggleDarkLightMode(): void {
    if (this.localStorageLightDark === 'light') {
      this._toggleBodyClasses('dark');
      this.themeStream.next('dark');
    } else {
      this._toggleBodyClasses('light');
      this.themeStream.next('light');
    }
  }

  private _toggleBodyClasses(colorToSet): void {
    this.storageService.setItem('DarkModePref', colorToSet);
    this.localStorageLightDark = this.storageService.getItem('DarkModePref');
    if (colorToSet.toLowerCase() === 'dark') {
      this.document.body.classList.remove('light');
      this.document.body.classList.add(colorToSet);
    } else if (colorToSet.toLowerCase() === 'light') {
      this.document.body.classList.remove('dark');
      this.document.body.classList.add(colorToSet);
    }
  }
}
