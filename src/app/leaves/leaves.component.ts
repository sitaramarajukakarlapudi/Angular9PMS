import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  rangeDates: Date[];
  isValidDateRange: boolean;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.isValidDateRange = false;
  }

  btnBack_Click() {
    this.router.navigate(['/menu/dashboard'], { skipLocationChange: false });
  }

  calClose() {
    if (this.rangeDates && this.rangeDates[1]) {
      this.isValidDateRange = true;
      // const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
      // const start: number = this.rangeDates[0].getTime();
      // const end: number = this.rangeDates[1].getTime();
      // const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);

      // // The days array will contain a Date object for each day between dates (inclusive)
      // const days: Date[] = Array.from(new Array(daysBetweenDates + 1),
      //   (v, i) => new Date(start + (i * MS_PER_DAY)));
      const days = this.workingDaysBetweenDates(this.rangeDates[0], this.rangeDates[1]);
      alert(days);
    } else {
      this.isValidDateRange = false;
    }
  }

  workingDaysBetweenDates(d0, d1) {
    const startDate: any = this.parseDate(d0);
    const endDate: any = this.parseDate(d1);
    const holidays = ['2020-07-28', '2020-07-25'];
    if (endDate < startDate) {
      return 0;
    }
    let z = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < holidays.length; i++) {
      const cand = this.parseDate(holidays[i]);
      const candDay = cand.getDay();
      // if (cand >= startDate && cand <= endDate && candDay !== 0 && candDay !== 6) {
      //   z++;
      // }
      if (cand >= startDate) {
        if (cand <= endDate) {
          if (candDay !== 0) {
            if (candDay !== 6) {
              z++;
            }
          }
        }
      }
    }

    const millisecondsPerDay = 86400 * 1000;
    startDate.setHours(0, 0, 0, 1);
    endDate.setHours(23, 59, 59, 999);
    const diff: number = endDate - startDate;
    let days = Math.ceil(diff / millisecondsPerDay);

    const weeks = Math.floor(days / 7);
    days = days - (weeks * 2);

    // Handle special cases
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();

    // Remove weekend not previously removed.
    if (startDay - endDay > 1) {
      days = days - 2;
    }

    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay === 0 && endDay !== 6) {
      days = days - 1;
    }

    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay === 6 && startDay !== 0) {
      days = days - 1;
    }

    // substract the holiday dates from the original calculation and return to the DOM
    return days - z;
  }

  parseDate(input) {
    const newDate = new Date(input);
    const onlyDate = newDate.setHours(0, 0, 0, 0);
    return new Date(onlyDate);
  }

}
