import { MediaObserver } from '@angular/flex-layout';
export declare class IxMediaQueryService {
    media: MediaObserver;
    mq: string;
    mediaQuery: string;
    suffix: string;
    private medias;
    constructor(media: MediaObserver);
    private _mediaChecker;
    has(mqString: any): boolean;
}
