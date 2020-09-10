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
    leaveFrom?: string;
    leaveTo?: string;
    noofDays?: number;
    leaveReason?: string;
    userId?: number;
    leaveMasterId?: number;
    leaveDate?: string;
    leaveTypeId?: string;
    leaveDurationId?: string;
    leavePeriodId?: string;
}

export class LeaveDetails {
    leaveDetailId?: number;
    leaveDate?: string;
    leaveType?: string;
    duration?: string;
    period?: string;
}

export class LeaveMaster {
    leaveMasterId?: number;
    leaveFrom?: string;
    leaveTo?: string;
    noOfDays?: number;
    leaveReason?: string;
    userName?: string;
    leaveType?: string;
    status?: string;
    children?: LeaveDetails[];
}

export class LeaveHistory {
    leaveMasterId?: number;
    userName?: string;
    leaveFrom?: string;
    leaveTo?: string;
    noOfDays?: number;
    status?: string;
    color?: string;
    leaveType?: string;
}
