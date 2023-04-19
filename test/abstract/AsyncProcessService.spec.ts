import {AsyncProcessService} from "../../src/abstract/AsyncProcessService";
import {HTTP_METHOD, RequestInfo} from "../../src/requestinfo";


export {}
describe("AsyncProcessService static method test", () => {
    const HTTP_REQUEST_GET = RequestInfo.of(HTTP_METHOD.GET, "/test")
    const HTTP_REQUEST_POST = RequestInfo.of(HTTP_METHOD.POST, "/test")
    const HTTP_REQUEST_PUT = RequestInfo.of(HTTP_METHOD.PUT, "/test")
    const HTTP_REQUEST_PATCH = RequestInfo.of(HTTP_METHOD.PATCH, "/test")
    const HTTP_REQUEST_DELETE = RequestInfo.of(HTTP_METHOD.DELETE, "/test")

    it("TEST AsyncProcessService.isBodyRequestMethod()", () => {
        expect( AsyncProcessService.isBodyRequestMethod(HTTP_REQUEST_GET.method) ).toBeFalsy()
        expect( AsyncProcessService.isBodyRequestMethod(HTTP_REQUEST_POST.method) ).toBeTruthy()
        expect( AsyncProcessService.isBodyRequestMethod(HTTP_REQUEST_PUT.method) ).toBeTruthy()
        expect( AsyncProcessService.isBodyRequestMethod(HTTP_REQUEST_PATCH.method) ).toBeTruthy()
        expect( AsyncProcessService.isBodyRequestMethod(HTTP_REQUEST_DELETE.method) ).toBeFalsy()
    })

    it("TEST AsyncProcessService", () => {
        const mockData = { test : "test"}
        expect(AsyncProcessService.setFetchOption(HTTP_REQUEST_GET, mockData)).toBe
    })

})