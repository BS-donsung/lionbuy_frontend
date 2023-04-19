import {AsyncProcessService} from "../../src/abstract/AsyncProcessService";
import {HTTP_METHOD, RequestInfo} from "../../src/requestinfo";
import {ProcessStatus, STATUS} from "../../src/enums/ProcessStatus";


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

describe("AsyncProcessService pending service", () => {
    // @ts-ignore
    const host : string = global.HOST



    const requestOfIndex = RequestInfo.of(HTTP_METHOD.GET).setHostExplicitly(host)

    it("init test", () => {

        expect(host).toBe("http://localhost:8888")
    })

    it("single success request", async () => {
        // @ts-ignore
        const host : string = global.HOST
        const asyncProcessService = new AsyncProcessService()
        expect(asyncProcessService.getProcessing()).toBe(STATUS.INIT)
        const result = await asyncProcessService.asyncProcessing(requestOfIndex)
        expect(result.isPresent()).toBeTruthy()
        expect(asyncProcessService.getProcessing()).toBe(STATUS.SUCCESS)

        return Promise.resolve()
    })

    it("multi success request", async () => {
        // @ts-ignore
        const host : string = global.HOST
        // 시간 제한
        const asyncProcessService = new AsyncProcessService()
        expect(asyncProcessService.getProcessing()).toBe(STATUS.INIT)
        for(let idx = 0; idx < 3; ++idx) {
            const result = await asyncProcessService.asyncProcessing(requestOfIndex)
            expect(result.isPresent()).toBeTruthy()
            expect(asyncProcessService.getProcessing()).toBe(STATUS.SUCCESS)
        }
        return Promise.resolve()
    })


})