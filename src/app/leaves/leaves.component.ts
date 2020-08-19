import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leave } from '../_models/leaves';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../_services/common/common.service';

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
  invalidDates: Array<Date>;
  holidayDates: Array<Date>;
  holidays: string[];
  employeeId: string;
  selectedOffice: string;

  constructor(
    private router: Router,
    private commonSvc: CommonService

  ) { }

  ngOnInit() {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.invalidDates = [];
    this.isValidDateRange = false;
    this.isNextClicked = false;
    this.getLocations();
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
  }

  getLocations() {
    this.commonSvc.getLocations().subscribe(
      (data) => {
        this.officeTypes = [];
        this.officeTypes.push({ label: 'Select Location', value: { id: '0', name: 'Select Location' } });
        for (const dataItem of data) {
          this.officeTypes.push({
            label: dataItem.label,
            value: {
              id: dataItem.value, name: dataItem.label
            }
          });
        }
        this.selectedOffice = this.officeTypes[0].value;
        this.getManagers();
      }
    );
  }

  getManagers() {
    this.commonSvc.getManagers(this.employeeId).subscribe(
      (data) => {
        this.managerTypes = [];
        this.managerTypes.push({ label: 'Select Manager', value: '0' });
        for (const dataVal of data) {
          this.managerTypes.push({ label: dataVal.label, value: dataVal.value });
        }
        this.getHolidays('Vijayawada');
      });
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
    this.holidayDates = [];
    if (this.rangeDates && this.rangeDates[1]) {
      this.isValidDateRange = true;
      let locationVal = 'Vijayawada';
      if (this.selectedOffice['id'] !== '0') {
        locationVal = this.selectedOffice['name'];
      }
      const startDate = new Date(this.rangeDates[0]);
      const startDateVal = Number(startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();
      const endDate = new Date(this.rangeDates[1]);
      const endDateVal = Number(endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear();
      this.commonSvc.GetHolidays(locationVal, startDateVal, endDateVal).subscribe(
        (data) => {
          if (data !== null) {
            for (const eDate of data) {
              this.holidayDates.push(new Date(eDate.invaliddate));
            }
          }
          this.getWorkingDays(this.holidayDates, this.rangeDates[0], this.rangeDates[1]);
        }
      );
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

  getWorkingDays(holidayDates, startDate, endDate) {
    console.log(holidayDates);
    this.validDates = [];
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = this.rangeDates[0].getTime();
    const end: number = this.rangeDates[1].getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);
    let startDateNew: Date = this.parseDate(startDate);
    const endDateNew: any = this.parseDate(endDate);

    let isValidDate = true;
    for (let i = 0; i <= daysBetweenDates; i++) {
      isValidDate = true;
      const finalDate = startDateNew;
      if (startDateNew <= endDateNew) {
        if (startDateNew.getDay() !== 0 && startDateNew.getDay() !== 6) {
          for (const dateVal of holidayDates) {
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

  btnApply_Click() {

  }

  officeTypes_Change() {
    if (this.selectedOffice['id'] !== '0') {
      this.getHolidays(this.selectedOffice['name']);
    }
  }

  getHolidays(location: string) {
    this.commonSvc.GetHolidaysList(location).subscribe(
      (data) => {
        for (const eDate of data) {
          this.invalidDates.push(new Date(eDate.invaliddate));
        }
      }
    );
  }

}
