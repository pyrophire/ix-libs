import { Injectable } from '@angular/core';

/**
 * This is a shim for the Window.sessionStorage api.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 *
 * This service performs feature detection of Window.sessionStorage. If
 * Window.sessionStorage is available then the functions are passed through.
 * If Window.sessionStorage is not available then items are stored on
 * an object on Window named Window.{storageKey}. And all methods act on that
 * object. The {storageKey} variable is stored in environments.storageKey.
 *
 * This service only supports Window.sessionStorage as Window.sessionStorage
 * is controlled by the browser and cannot be truely shimed beyond the sesssion.
 */
@Injectable({
  providedIn: 'root',
})
export class IxSessionStorageService {
  public readonly sessionStorageFeatureAvailable: boolean;

  constructor() {
    this.sessionStorageFeatureAvailable = this.storageAvailable(
      'sessionStorage'
    );
    if (!this.sessionStorageFeatureAvailable) {
      console.warn(
        'Window.sessionStorage is NOT available. Falling back to object storage.'
      );
      window[`ix`] = {};
    }
  }

  /**
   * Save data to sessionStorage
   * @param key the key of the stored item
   * @param value the value being stored (string, object, or array)
   */
  public setItem(key: string, value: string | object | any[]): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    // pass through
    if (this.sessionStorageFeatureAvailable) {
      window.sessionStorage.setItem(key, stringValue);
      return;
    }

    // fallback
    if (!this.sessionStorageFeatureAvailable) {
      window[`ix`][key] = stringValue;
    }
  }

  /**
   * Get saved data from sessionStorage
   * @param key the key of the stored item
   * @returns The retrieved item (parsed if it was an object/array) or null if not found
   */
  public getItem(key: string): any {
    let value: string | null = null;
    // pass through
    if (this.sessionStorageFeatureAvailable) {
      value = window.sessionStorage.getItem(key);
    } else {
      // fallback
      value = window[`ix`][key] || null;
    }

    if (value === null) {
      return null;
    }

    try {
      // Attempt to parse the value as JSON
      return JSON.parse(value);
    } catch (e) {
      // If parsing fails, return the original string value
      return value;
    }
  }

  /**
   * Remove saved data from sessionStorage
   * @param key the key of the stored item
   */
  public removeItem(key: string): void {
    // pass through
    if (this.sessionStorageFeatureAvailable) {
      window.sessionStorage.removeItem(key);
      return;
    }

    // fallback
    if (!this.sessionStorageFeatureAvailable) {
      window[`ix`][key] = null;
    }
  }

  /**
   * Remove all saved data from sessionStorage
   */
  public clear(): void {
    // pass through
    if (this.sessionStorageFeatureAvailable) {
      window.sessionStorage.clear();
      return;
    }

    // fallback
    if (!this.sessionStorageFeatureAvailable) {
      window[`ix`] = {};
    }
  }

  protected iCanUseSessionStorageApi(): boolean {
    return this.storageAvailable('sessionStorage');
  }

  protected storageAvailable(type: string): boolean {
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }
}
