import { ReplaySubject } from 'rxjs';
import { IxLocalStorageService } from '../shared/local-storage.service';
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
}
