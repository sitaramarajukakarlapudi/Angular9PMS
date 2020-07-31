import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leave } from '../_models/leaves';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  rangeDates: Date[];
  isValidDateRange: boolean;
  validDates: Date[];
  isNextClicked: boolean;
  custF: Leave[] = [];
  types: SelectItem[];
  duration: SelectItem[];
  period: SelectItem[];
  officeTypes: SelectItem[];
  managerTypes: SelectItem[];
  leaveDetailsForm = new FormGroup({});
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.isValidDateRange = false;
    this.isNextClicked = false;
    this.types = [
      { label: 'Select Type', value: null },
      { label: 'Casual Leave', value: { id: 1, name: 'Casual Leave', code: 'CL' } },
      { label: 'Compensatory', value: { id: 2, name: 'Compensatory', code: 'COMP' } },
      { label: 'Earned Leave', value: { id: 3, name: 'Earned Leave', code: 'EL' } },
      { label: 'Maternity', value: { id: 4, name: 'Maternity', code: 'MAT' } },
      { label: 'On Duty', value: { id: 5, name: 'On Duty', code: 'OD' } },
      { label: 'Paternity', value: { id: 6, name: 'Paternity', code: 'PAT' } }
    ];
    this.duration = [
      { label: 'Full Day', value: { id: 1, name: 'Full Day', code: 'FD' } },
      { label: 'Half Day', value: { id: 2, name: 'Half Day', code: 'HD' } }
    ];
    this.period = [
      { label: 'Before Lunch', value: { id: 1, name: 'Before Lunch', code: 'BL' } },
      { label: 'After Lunch', value: { id: 2, name: 'After Lunch', code: 'AL' } }
    ];
    this.officeTypes = [
      { label: 'Select Location', value: null },
      { label: 'Vijayawada', value: { id: 1, name: 'Vijayawada', code: 'VJA' } }
    ];
    this.managerTypes = [
      { label: 'Select Manager', value: null },
      { label: 'Sudheer Bijinepalli', value: { id: 1, name: 'Sudheer Bijinepalli', code: 'SB' } },
      { label: 'Kalyan K', value: { id: 2, name: 'Kalyan K', code: 'KK' } }
    ];
  }

  btnBack_Click() {
    this.router.navigate(['/menu/dashboard'], { skipLocationChange: false });
  }

  btnNext_Click() {
    this.isNextClicked = true;
    this.custF = [];
    for (let i = 0; i < this.validDates.length; i++) {
      this.custF.push({
        id: i,
        date: this.validDates[i].toString()
      });
    }
    this.addFormControls();
  }

  calShow() {
    this.isNextClicked = false;
  }

  calClose() {
    if (this.rangeDates && this.rangeDates[1]) {
      this.isValidDateRange = true;
      this.getWorkingDays(this.rangeDates[0], this.rangeDates[1]);
    } else {
      this.isValidDateRange = false;
      this.isNextClicked = false;
    }
  }

  addFormControls() {
    let j = 0;
    try {
      for (j = 0; j < this.custF.length; j++) {
        try {
          this.leaveDetailsForm.addControl('FCDrptype_' + this.custF[j].id, new FormControl('', null));
          this.leaveDetailsForm.addControl('FCDrpDuration_' + this.custF[j].id, new FormControl('', null));
          this.leaveDetailsForm.addControl('FCDrpPeriod_' + this.custF[j].id, new FormControl({ value: null, disabled: true }, null));
        } catch (error) {
          console.log('Add Control' + error);
        }
      }
    } catch (e) {
      console.error('add control error ' + e.error);
    }
  }

  getWorkingDays(startDate, endDate) {
    this.validDates = [];
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = this.rangeDates[0].getTime();
    const end: number = this.rangeDates[1].getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);
    let startDateNew: Date = this.parseDate(startDate);
    const endDateNew: any = this.parseDate(endDate);
    const holidays = ['2020-07-28', '2020-07-25'];
    let isValidDate = true;
    for (let i = 0; i <= daysBetweenDates; i++) {
      isValidDate = true;
      const finalDate = startDateNew;
      if (startDateNew <= endDateNew) {
        if (startDateNew.getDay() !== 0 && startDateNew.getDay() !== 6) {
          for (const dateVal of holidays) {
            const holidayDate = this.parseDate(dateVal);
            if (startDateNew.toString() === holidayDate.toString()) {
              isValidDate = false;
              startDateNew = new Date(startDateNew.setDate(startDateNew.getDate() + 1));
              break;
            }
          }
          if (isValidDate) {
            this.validDates.push(new Date(finalDate));
            startDateNew = new Date(startDateNew.setDate(startDateNew.getDate() + 1));
          }
        } else {
          startDateNew = new Date(startDateNew.setDate(startDateNew.getDate() + 1));
        }
      }
    }
  }

  parseDate(input) {
    const newDate = new Date(input);
    const onlyDate = newDate.setHours(0, 0, 0, 0);
    return new Date(onlyDate);
  }

  funDurationChange(opValue) {
    if (this.leaveDetailsForm.get('FCDrpDuration_' + opValue).value.code === 'HD') {
      this.leaveDetailsForm.controls['FCDrpPeriod_' + opValue].enable();
    } else {
      this.leaveDetailsForm.controls['FCDrpPeriod_' + opValue].disable();
    }

  }

}
