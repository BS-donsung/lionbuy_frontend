export const URL = ""

export enum HTTP_METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
export class RequestInfo {
    readonly method : HTTP_METHOD
    readonly uri : string

    static empty() {
        return new RequestInfo(HTTP_METHOD.GET, "")
    }

    static of( method : HTTP_METHOD, uri : string = "/") {
        return new RequestInfo(method, uri)
    }

    constructor(method : HTTP_METHOD , uri : string) {
        this.method = method;
        this.uri = uri
    }

    setHostExplicitly( host : string ) {
        return new RequestInfo(this.method, `${host}${this.uri}`)
    }
    append( query : string ) : RequestInfo {
        return RequestInfo.of(this.method, `${this.uri}${query}`)
    }
}
