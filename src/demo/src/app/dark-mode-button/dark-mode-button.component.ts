import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-dark-mode-button',
    templateUrl: './dark-mode-button.component.html',
    styleUrls: ['./dark-mode-button.component.scss'],
    standalone: false
})
export class DarkModeButtonComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    document.getElementsByTagName('body')[0].classList.remove('dark');
    document.getElementsByTagName('body')[0].classList.add('light');
  }
}
