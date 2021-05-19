import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampm'
})
export class AmPmPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const timeArray = value.split(':');
    const rawHour = parseInt(timeArray[0], 10);
    let hour: number;
    let minutes: string;
    let seconds: string;
    let amPm: string;
    if (rawHour > 12) {
      hour = rawHour - 12;
      amPm = ' PM';
    } else {
      if (rawHour === 0) {
        hour = 12;
      } else {
        hour = rawHour;
      }
      amPm = ' AM';
    }
    if (timeArray[1]) {
      minutes = `${timeArray[1]}`;
    }
    if (timeArray[2]) {
      seconds = `${timeArray[2]}`;
    } else {
      minutes = '00';
    }

    const displayString = seconds ? `${hour}:${minutes}:${seconds} ${amPm}` : `${hour}:${minutes} ${amPm}`;
    return displayString;
  }
}
