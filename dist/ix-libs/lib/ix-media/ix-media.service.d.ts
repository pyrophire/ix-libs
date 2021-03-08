import { MediaObserver } from '@angular/flex-layout';
import * as i0 from "@angular/core";
export declare class IxMediaQueryService {
    media: MediaObserver;
    mq: string;
    mediaQuery: string;
    suffix: string;
    private medias;
    constructor(media: MediaObserver);
    private _mediaChecker;
    has(mqString: any): boolean;
    static ɵfac: i0.ɵɵFactoryDef<IxMediaQueryService, never>;
    static ɵprov: i0.ɵɵInjectableDef<IxMediaQueryService>;
}
