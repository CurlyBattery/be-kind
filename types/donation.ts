export interface IDonation {
    id: number;
    help_request_id: number;
    helper_user_id: number;
    seeker_user_id: number;
    created_at?: Date;

    request_title?: string;
    request_description?: string;
    helper_name?: string;
    helper_email?: string;
    seeker_name?: string;
    seeker_email?: string;
}