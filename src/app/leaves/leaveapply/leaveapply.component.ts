import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { Leave, LeaveMasterDetails } from 'src/app/_models/leaves';
import { CommonService } from 'src/app/_services/common/common.service';
import { LeavesService } from 'src/app/_services/leaves/leaves.service';
import { ReturnValue } from 'src/app/_models/common';

@Component({
  selector: 'app-leaveapply',
  templateUrl: './leaveapply.component.html',
  styleUrls: ['./leaveapply.component.css']
})
export class LeaveapplyComponent implements OnInit {
  @ViewChild('dateFilter') dateFilter: any;
  rangeDates: Date[];
  isValidDateRange: boolean;
  isValidLocation: boolean;
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
  selectedManager: string;
  leaveReason: string;
  leaveMasterDetails: LeaveMasterDetails;
  startDateVal: string;
  endDateVal: string;

  constructor(
    private router: Router,
    private commonSvc: CommonService,
    private leavesSvc: LeavesService,
    private msgSvc: MessageService
  ) { }

  ngOnInit() {
    this.employeeId = sessionStorage.getItem('employeeId');
    this.invalidDates = [];
    this.isValidDateRange = false;
    this.isValidLocation = false;
    this.isNextClicked = false;
    this.leaveReason = '';
    this.rangeDates = null;
    this.getLeaveTypes();
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
        this.managerTypes.push({ label: 'Select Manager', value: { id: '0', name: 'Select Manager' } });
        for (const dataVal of data) {
          this.managerTypes.push({
            label: dataVal.label, value: {
              id: dataVal.value, name: dataVal.label
            }
          });
        }
        this.selectedManager = this.managerTypes[0].value;
        this.getHolidays('Vijayawada');
      });
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

  getLeaveTypes() {
    this.leavesSvc.getLeaveTypes().subscribe(
      (data) => {
        this.types = [];
        this.types.push({ label: 'Select Type', value: { id: '0', name: 'Select Type' } });
        for (const dataItem of data) {
          this.types.push({
            label: dataItem.label,
            value: {
              id: dataItem.value, name: dataItem.label
            }
          });
        }
        this.getDurations();
      }
    );
  }

  getDurations() {
    this.leavesSvc.getDurations().subscribe(
      (data) => {
        this.duration = [];
        for (const dataItem of data) {
          this.duration.push({
            label: dataItem.label,
            value: {
              id: dataItem.value, name: dataItem.label
            }
          });
        }
        this.getPeriods();
      }
    );
  }

  getPeriods() {
    this.leavesSvc.getPeriods().subscribe(
      (data) => {
        this.period = [];
        for (const dataItem of data) {
          this.period.push({
            label: dataItem.label,
            value: {
              id: dataItem.value, name: dataItem.label
            }
          });
        }
        this.getLocations();
      }
    );
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
      this.startDateVal = Number(startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();
      const endDate = new Date(this.rangeDates[1]);
      this.endDateVal = Number(endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear();
      this.commonSvc.GetHolidays(locationVal, this.startDateVal, this.endDateVal).subscribe(
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
          this.leaveDetailsForm.addControl('FCDrpDuration_' + this.custF[j].id, new FormControl({ id: 1, name: 'Full Day' }, null));
          this.leaveDetailsForm.addControl('FCDrpPeriod_' + this.custF[j].id,
            new FormControl({ value: { id: 1, name: 'Before Lunch' }, disabled: true }));
        } catch (error) {
          console.log('Add Control' + error);
        }
      }
    } catch (e) {
      console.error('add control error ' + e.error);
    }
  }

  getWorkingDays(holidayDates, startDate, endDate) {
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
    if (this.leaveDetailsForm.get('FCDrpDuration_' + opValue).value.name === 'Half Day') {
      this.leaveDetailsForm.controls['FCDrpPeriod_' + opValue].enable();
    } else {
      this.leaveDetailsForm.controls['FCDrpPeriod_' + opValue].disable();
    }

  }

  btnApply_Click() {
    let leaveType = '';
    let leaveDuration = '';
    let leavePeriod = '';
    let leaveDate = '';
    let isValid = true;
    if (this.selectedOffice['id'] === '0') {
      isValid = false;
      alert('Please select Reporting Office');
    } else if (this.selectedManager['id'] === '0') {
      isValid = false;
      alert('Please select Reporting Manager');
    } else if (!this.isValidDateRange) {
      isValid = false;
      alert('Please select Leave Period');
    }
    for (let a = 0; a < this.custF.length; a++) {
      if (this.leaveDetailsForm.get('FCDrptype_' + a).value === '' || this.leaveDetailsForm.get('FCDrptype_' + a).value.id === '0') {
        isValid = false;
        alert('Please select Leave Type');
        break;
      }
    }
    if (this.leaveReason === '') {
      isValid = false;
      alert('Please enter Leave Reason');
    }
    if (isValid === true) {
      this.leaveMasterDetails = new LeaveMasterDetails();
      this.leaveMasterDetails.employeeId = +this.employeeId;
      this.leaveMasterDetails.reportingOfficeId = +this.selectedOffice['id'];
      this.leaveMasterDetails.reportingManagerId = +this.selectedManager['id'];
      this.leaveMasterDetails.leaveFrom = this.startDateVal;
      this.leaveMasterDetails.leaveTo = this.endDateVal;
      this.leaveMasterDetails.noofDays = this.custF.length;
      this.leaveMasterDetails.leaveReason = this.leaveReason;
      this.leaveMasterDetails.userId = +this.employeeId;
      for (let b = 0; b < this.custF.length; b++) {
        const startDate = new Date(this.custF[b].date);
        leaveDate += Number(startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear() + ',';
        leaveType += this.leaveDetailsForm.get('FCDrptype_' + b).value.id + ',';
        leaveDuration += this.leaveDetailsForm.get('FCDrpDuration_' + b).value.id + ',';
        leavePeriod += this.leaveDetailsForm.get('FCDrpPeriod_' + b).value.id + ',';
      }
      this.leaveMasterDetails.leaveDate = leaveDate.replace(/,\s*$/, '');
      this.leaveMasterDetails.leaveTypeId = leaveType.replace(/,\s*$/, '');
      this.leaveMasterDetails.leaveDurationId = leaveDuration.replace(/,\s*$/, '');
      this.leaveMasterDetails.leavePeriodId = leavePeriod.replace(/,\s*$/, '');
      this.leavesSvc.insertLeaves(this.leaveMasterDetails).subscribe(
        (saveData) => {
          this.showErrorDetail(saveData, 'Leaves Applied');
        }
      );
    }
  }

  onDatesRangeFilterSelected(selectedValue: Date) {
    if (this.rangeDates[1]) { // If second date is selected
      this.dateFilter.hideOverlay();
    }
  }

  officeTypes_Change() {
    if (this.selectedOffice['id'] !== '0') {
      this.getHolidays(this.selectedOffice['name']);
      this.isValidLocation = true;
    } else {
      this.isValidLocation = false;
    }
  }

  showErrorDetail(data: ReturnValue, Mode: string) {
    if (data && data !== null && data.status && data.status.toString() !== '') {
      switch (data.status.toString()) {
        case 'Success':
          this.msgSvc.add({
            key: 'saveSuccess',
            sticky: false,
            severity: 'success',
            summary: 'Info Message',
            detail: Mode + ' successfully'
          });
          this.clearControls();
          break;
        case 'Error':
          this.msgSvc.add({
            key: 'saveError',
            sticky: false,
            severity: 'error',
            summary: 'Error',
            detail: 'Error Occurred'
          });
          break;
        default:
          this.msgSvc.add({
            key: 'saveError',
            sticky: false,
            severity: 'error',
            summary: 'Error',
            detail: data.statusMessage.toString()
          });
          break;
      }
    } else {
      this.msgSvc.add({
        key: 'saveError',
        sticky: false,
        severity: 'error',
        summary: 'Error',
        detail: 'Error Occurred'
      });
    }
  }

  clearControls() {
    this.leaveDetailsForm.reset();
    this.rangeDates = null;
    this.selectedManager = this.managerTypes[0].value;
    this.leaveReason = '';
    this.selectedOffice = this.officeTypes[0].value;
    this.isNextClicked = false;
    this.isValidLocation = false;
  }

  btnLeaveHistory_Click() {
    this.router.navigate(['/menu/leavehistory'], { skipLocationChange: false });
  }
}
