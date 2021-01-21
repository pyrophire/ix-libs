import { ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../shared/storage.service';
export declare class IxDarkService {
    private document;
    prefersDark: boolean;
    localStorageLightDark: string;
    currentMode: string;
    themeStream: ReplaySubject<string>;
    sorageService: LocalStorageService;
    constructor(document: any, sorageService: LocalStorageService);
    setDarkModePreference(): void;
    toggleDarkLightMode(): void;
    private _toggleBodyClasses;
}
