export const URL = ""

export enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
export class RequestInfo {
    method : HTTP_METHOD
    uri : string

    static empty() {
        return new RequestInfo(HTTP_METHOD.GET, "")
    }

    static of( method : HTTP_METHOD, uri : string ) {
        return new RequestInfo(method, uri)
    }

    constructor(method : HTTP_METHOD , uri : string) {
        this.method = method;
        this.uri = uri
    }
}
