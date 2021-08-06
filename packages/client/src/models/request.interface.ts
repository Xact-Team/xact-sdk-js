export enum StatusRequest {
    WAITING = "Waiting",
    ACCEPTED = "Accepted",
    REFUSED = "Refused",
}


export type RequestValidation<T> = T & {
    status: StatusRequest;
}
