import { CommonModule } from '@angular/common';
import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ProgressBarConfig } from './ix-scroll-progress-config.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ix-scroll-progress',
    templateUrl: './ix-scroll-progress.component.html',
    styleUrls: ['./ix-scroll-progress.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ScrollBarProgressComponent implements OnInit, OnDestroy {
    @Input() config: ProgressBarConfig;

    constructor(private ngZone: NgZone) {}

    bottomReached(): boolean {
        return this.progressBarProcess() > 99;
    }
    progressBarProcess() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.body.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = scrolled + '%';
        return scrolled;
    }

    ngOnInit(): void {
        window.addEventListener('scroll', this.progressBarProcess, true);
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.progressBarProcess, true);
    }
}
