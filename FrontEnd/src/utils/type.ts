

export type ResponseLogin = {
    accessToken: string;
    refreshToken: string;
}
export type ResponseNull = {
    data: null;
    isSuccess: boolean;
    message: string;
    listErrors: [];
}

export type ResponseData<T> = {
    data: T;
    isSuccess: boolean;
    message: string;

}
type ApiError = {
    field: string;
    detail: string;
};

export type ErrorEntity = {
    data: null;
    listErrors: ApiError[];
    isSuccess: boolean;
    message: string;
}

export type User = {
    jti: string;
    UserId: string;
    Username: string;
    RoleId: string;
    Role: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;

}

export type BodyRefreshToken = {
    id:number;
    accessToken: string;
    refreshToken: string;
}