import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class IxMediaQueryService {
  public mq: string;
  public mediaQuery: string;
  public suffix: string;
  private medias: MediaChange[];

  constructor(public media: MediaObserver) {
    // this.media
    //   .asObservable()
    //   .pipe(
    //     filter((changes: MediaChange[]) => changes.length > 0),
    //     map((changes: MediaChange[]) => {
    //       this.medias = changes;
    //       return changes[0];
    //     })
    //   )
    //   .subscribe((change: MediaChange) => {
    //     this.mq = change.mqAlias;
    //     this.mediaQuery = change.mediaQuery;
    //     this.suffix = change.suffix;
    //   });
  }

  private _mediaChecker(mediaArray: MediaChange[], mqString: string): boolean {
    let exists;
    mediaArray.forEach((med) => {
      if (med.mqAlias === mqString) {
        exists = true;
      }
    });
    return exists;
  }

  // used to check if viewport has a media query size
  public has(mqString): boolean {
    if (this.medias) {
      return this._mediaChecker(this.medias, mqString);
    } else {
      this.media
        .asObservable()
        .pipe
        // filter((changes):boolean => changes.length > 0),
        // map((changes: MediaChange[]) => {
        //   this._mediaChecker(changes, mqString);
        // })
        ();
    }
  }
}
