/**
 * This is a shim for the Window.localStorage api.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 *
 * This service performs feature detection of Window.localStorage. If
 * Window.localStorage is available then the functions are passed through.
 * If Window.localStorage is not available then items are stored on
 * an object on Window named Window.{storageKey}. And all methods act on that
 * object. The {storageKey} variable is stored in environments.storageKey.
 *
 * This service only supports Window.localStorage as Window.localStorage
 * is controlled by the browser and cannot be truely shimed beyond the sesssion.
 */
export declare class LocalStorageService {
    readonly localStorageFeatureAvailable: boolean;
    constructor();
    /**
     * Save data to localStorage
     * @param key the key of the stored item
     * @param value the value being stored
     */
    setItem(key: string, value: string): void;
    /**
     * Get saved data from localStorage
     * @param key the key of the stored item
     */
    getItem(key: string): string;
    /**
     * Remove saved data from localStorage
     * @param key the key of the stored item
     */
    removeItem(key: string): void;
    /**
     * Remove all saved data from localStorage
     */
    clear(): void;
    protected iCanUseLocalStorageApi(): boolean;
    protected storageAvailable(type: string): boolean;
}
