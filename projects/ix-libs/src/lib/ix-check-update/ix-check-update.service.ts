import { HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/demo/src/environments/environment';
import { CheckUpdateComponent } from './ix-check-update.component';

export class ApiVersion {
  rootUrl: string;
  version: string;
  constructor(rootUrl: string, version: string) {
    this.rootUrl = rootUrl;
    this.version = version?.toString();
  }
}

interface TransactionResult<T> {
  version: any;
  results: any;
}

@Injectable({
  providedIn: 'root'
})
export class CheckUpdateService {
  // timer minutes * seconds * milliseconds

  silenceTimer = 1 * 60 * 1000;
  userNotified = false;
  versionCollection: ApiVersion[] = [];
  constructor(public dialog: MatDialog) {}

  intercept(req, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (req.url.includes('https') && event instanceof HttpResponse) {
          const rootUrl = event.url.split('/').slice(0, 3).join('/');
          event = event.clone({
            body: this._processInterceptedRequest(event.body as TransactionResult<any>, rootUrl)
          });
        }
        return event;
      })
    );
  }

  // Check to see if URL exists in array
  private _checkRegistration(transaction: TransactionResult<any>, rootUrl: string): boolean {
    const found = this.versionCollection.find((v) => v.rootUrl === rootUrl);
    return !!found;
  }

  // Check to see if version matches URL in array
  private _checkVersionMismatch(transaction: TransactionResult<any>, rootUrl: string): boolean {
    const match = this.versionCollection.find((v) => v.rootUrl === rootUrl && v.version === transaction.version?.toString());
    return !match;
  }

  /**
   * Process the intercepted request.
   *
   * @param transaction The transaction result.
   * @param url The URL of the request.
   */
  _processInterceptedRequest(transaction: TransactionResult<any>, url: string) {
    // if the version is not set, set it
    if (!this._checkRegistration(transaction, url)) {
      let newRegistration = new ApiVersion(url, transaction.version);
      this.versionCollection.push(newRegistration);
    }

    // if the version is set, but does not match, and the user has not been notified yet, notify user
    if (this._checkVersionMismatch(transaction, url) && this.userNotified === false) {
      // log out the mismatch of versions for debugging only in non-production environments
      if (!environment.production) {
        this.log(transaction, url);
      }

      // set boolean to prevent multiple dialogs from the same batch of calls
      this.userNotified = true;

      // open a confirmation dialog
      const dialogRef = this.dialog.open(CheckUpdateComponent, {
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // reload the page if the user hits Ok on the confirmation dialog
          location.reload();
        } else {
          // show a ribbon on the top left if the user hits Cancel on the confirmation dialog
          document.body.insertAdjacentHTML(
            'beforeend',
            `<div style="overflow: hidden; position: absolute; top: 32px; left: -64px; background-color: red;
                         color: white; font-weight: 700; padding: 12px 68px; transform: rotate(-45deg); cursor: pointer;" 
                  onClick="window.location.reload();">
                  <span>Update Available<span>
            </div>`
          );
        }
      });

      // Set a timer to silence the notification to false after a period of time
      setTimeout(() => {
        this.userNotified = false;
      }, this.silenceTimer);
    }
  }

  /**
   * This function is called when a version mismatch is detected.
   * It logs the mismatched version and current versions to the console.
   *
   * @param transaction The transaction result.
   * @param url The URL of the API.
   */
  log(transaction: TransactionResult<any>, url: string) {
    console.group('Version mismatch');
    console.log('Response API version: ', transaction.version);
    console.log('Response API URL: ', url);
    console.log('Current versions: ');
    console.table(this.versionCollection);
    console.groupEnd();
  }
}
