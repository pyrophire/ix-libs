import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  links = [
    {
      title: 'Scroll Progress Position',
      description: 'A horizontal progress bar that shows the scroll position progress on the scrollable page.',
      url: '/scroll-position'
    },
    {
      title: 'Dark Mode Button',
      description: 'A button that will switch the <body> light/dark class to tie in with Angular Material theme classes.',
      url: '/dark-mode-button'
    },
    {
      title: 'Icons',
      description: 'Custom SVG icons for TLC use',
      url: '/icons'
    },
    {
      title: 'Pipes',
      description: 'Helper pipes for various data types',
      url: '/pipes'
    },
    {
      title: 'Scroll To Top Button',
      description: 'A button that will scroll the <body> to the top of the page when there is enough content to scroll down to.',
      url: '/scroll-top-button'
    },
    {
      title: 'Services',
      description: 'Collection of helper services.',
      url: '/services'
    },
    {
      title: 'Table',
      description: 'Components used for displaying data in a table.',
      url: '/table'
    },
    {
      title: 'Version Update Checker',
      description: 'Service and dailog used to check to see if  client has a new update',
      url: '/check-update'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
