export interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface IPage {
    page: number;
    users: IUser[];
}

export interface IResponse {
    data: IUser[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}