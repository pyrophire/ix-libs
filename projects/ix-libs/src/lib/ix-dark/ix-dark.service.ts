import { Injectable, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject } from 'rxjs';

import { IxLocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class IxDarkService {
  prefersDark: boolean;
  localStorageLightDark: string;
  currentMode: string;
  themeStream = new ReplaySubject<string>();
  sorageService: IxLocalStorageService;

  constructor(
    @Inject(DOCUMENT) private document: any,
    sorageService: IxLocalStorageService
  ) {
    this.prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.sorageService = sorageService;
    this.localStorageLightDark = sorageService.getItem('DarkModePref');
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

  // used to toggle light/dark themes
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
    this.sorageService.setItem('DarkModePref', colorToSet);
    this.localStorageLightDark = this.sorageService.getItem('DarkModePref');
    if (colorToSet.toLowerCase() === 'dark') {
      this.document.body.classList.remove('light');
      this.document.body.classList.add(colorToSet);
    } else if (colorToSet.toLowerCase() === 'light') {
      this.document.body.classList.remove('dark');
      this.document.body.classList.add(colorToSet);
    }
  }
}
