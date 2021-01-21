import { Injectable, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject } from 'rxjs';

import { LocalStorageService } from '../shared/storage.service';

@Injectable({
  providedIn: 'root',
})
export class IxDarkService {
  prefersDark: boolean;
  localStorageLightDark: string;
  currentMode: string;
  themeStream = new ReplaySubject<string>();
  sorageService: LocalStorageService;

  constructor(
    @Inject(DOCUMENT) private document: any,
    sorageService: LocalStorageService
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

  // used onInit()
  public setDarkModePreference() {
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
  public toggleDarkLightMode() {
    if (this.localStorageLightDark === 'light') {
      this._toggleBodyClasses('dark');
      this.themeStream.next('dark');
    } else {
      this._toggleBodyClasses('light');
      this.themeStream.next('light');
    }
  }

  private _toggleBodyClasses(colorToSet) {
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
