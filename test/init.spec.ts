
export {}

describe("init test", () => {
    it("sum 1 + 2", () => {
        expect( 1 + 2 ).toBe(3)
    })

    it("proxy server access", async () => {

        const result = await fetch("http://localhost:8888")
        const text = await result.text();
        return expect(text).toBe("init")
    })
})