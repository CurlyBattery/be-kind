export interface IHelpRequest {
    id: number;
    user_id: number;
    title: string;
    description: string;
    status: HelpRequestStatus,
    created_at: Date;
}

export enum HelpRequestStatus {
    ACTIVE = 'ACTIVE',
    HELPED = 'HELPED',
}