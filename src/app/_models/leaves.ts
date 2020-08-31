export class Leave {
    id: number;
    date?: string;
    type?: string;
    duration?: string;
    period?: string;
}

export class LeaveMasterDetails {
    employeeId?: number;
    reportingOfficeId?: number;
    reportingManagerId?: number;
    leaveFrom?: Date;
    leaveTo?: Date;
    noofDays?: number;
    leaveReason?: string;
    userId?: number;
    leaveMasterId?: number;
    leaveDate?: string;
    leaveTypeId?: string;
    leaveDurationId?: string;
    leavePeriodId?: string;
}
