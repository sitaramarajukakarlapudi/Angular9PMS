export class Issues {
    id?: string;
    issueType?: string;
    projectName?: string;
    reportedBy?: string;
    reportedOn?: string;
    summary?: number;
    description?: string;
    acceptanceCriteria?: string;
    assignedTo?: string;
    assignedOn?: string;
    estimatedDate?: string;
    status?: string;
    projectId?: string;
    issueTypeId?: string;
    size?: string;
    statusId?: string;
}
export class XcelIssues {
    issueType?: string;
    projectName?: string;
    reportedBy?: string;
    reportedOn?: string;
    summary?: number;
    description?: string;
    acceptanceCriteria?: string;
    assignedTo?: string;
    assignedOn?: string;
    estimatedDate?: string;
    status?: string;
    size?: string;
}
export class IssueTypes {
    id?: string;
    label?: string;
    value?: string;
    mode?: string;
    displayOrder?: string;
    color?: number;
    createdBy?: string;
    updatedBy?: string;
}