import { ReplaySubject } from 'rxjs';
import { IxLocalStorageService } from '../shared/local-storage.service';
import * as i0 from "@angular/core";
export declare class IxDarkService {
    private document;
    prefersDark: boolean;
    localStorageLightDark: string;
    currentMode: string;
    themeStream: ReplaySubject<string>;
    sorageService: IxLocalStorageService;
    constructor(document: any, sorageService: IxLocalStorageService);
    setDarkModePreference(): void;
    toggleDarkLightMode(): void;
    private _toggleBodyClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<IxDarkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IxDarkService>;
}
