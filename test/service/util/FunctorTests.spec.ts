const { map } = require("@/util/Functor");

export {}
describe("map function", () => {
    it("map function test for primitive data", () => {
        const targetData = 5;

        expect(map(targetData, (data : number) => data + 5)).toBe(10)
    })

    it("map function immutable test for object data", () => {
        const targetData = { index : 5, data : "5 * 5 = 25"};

        expect(map(targetData, (data : typeof targetData) => data.index + 3)).toBe(8)

        expect(targetData.index).toBe(5)
    })
})