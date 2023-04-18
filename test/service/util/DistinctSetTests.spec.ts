const { DistinctSet } = require("@/util/DistinctSet")
export {}
describe("DistinctSet test", () => {


    describe("DistinctSet<number> test", () => {
        const numSet = new DistinctSet( ( num : number ) => num )
        numSet.add(1)
        numSet.add(2)
        numSet.add(3)
        numSet.add(3)

        it("TEST add distinct data", () => {
            expect(numSet.size).toBe(3)
        })

        it("TEST has/hasContain", () => {
            expect(numSet.has(1)).toBeTruthy()
            expect(numSet.has(2)).toBeTruthy()
            expect(numSet.has(3)).toBeTruthy()
            expect(numSet.has(4)).toBeFalsy()
        })
        it("[Symbol.iterator]()", () => {
            for( const data of numSet) {
                console.log(data);
            }
        })

        it("TEST update", () => {
            numSet.update(2)
            expect(numSet.size).toBe(3)
            expect(numSet.has(1)).toBeTruthy()
            expect(numSet.has(2)).toBeTruthy()
            expect(numSet.has(3)).toBeTruthy()
        })

        it("TEST delete", () => {
            const set = new DistinctSet( (item : number) => item );
            set.add(5)
            set.add(3)
            set.add(1)

            set.delete(3)
            expect(set.size).toBe(2)
            expect(set.has(5)).toBeTruthy()
            expect(set.has(1)).toBeTruthy()
            expect(set.has(3)).toBeFalsy()
        })

        it("TEST clear", () => {
            const set = new DistinctSet( (item : number) => item );
            set.add(5)
            set.add(3)
            set.add(1)

            set.clear()
            expect(set.size).toBe(0)
        })
    })

    describe("DistinctSet<object> test", () => {
        type TestType = { index : number, data : string };

        const testSet = new DistinctSet( ( num : TestType ) => num.index )
        testSet.add({ index : 1, data : "hello"})
        testSet.add({ index : 2, data : "world"})
        testSet.add({ index : 3, data : "local"})
        testSet.add({ index : 3, data : "host"})

        it("TEST add distinct data", () => {
            expect(testSet.size).toBe(3)
        })

        it("TEST has/hasContain", () => {
            expect(testSet.has({ index : 1, data : "james"})).toBeTruthy()
            expect(testSet.has({ index : 2, data : "lee"})).toBeTruthy()
            expect(testSet.has({ index : 3, data : "local"})).toBeTruthy()
            expect(testSet.has({ index : 4, data : "hello"})).toBeFalsy()
        })
        it("[Symbol.iterator]()", () => {
            for( const data of testSet) {
                console.log(data);
            }
        })

        it("TEST update", () => {
            const updateData = { index : 2, data : "world"};
            testSet.update(updateData)
            expect(testSet.size).toBe(3)
            expect(testSet.has({ index : 2 })).toBeTruthy()
            expect(testSet.get(2).isPresent()).toBeTruthy()
            expect(testSet.get(2).get()).toBe(updateData)

        })

        it("TEST delete", () => {
            const targetSet = new DistinctSet( ( num : TestType ) => num.index )
            targetSet.add({ index : 1, data : "hello"})
            targetSet.add({ index : 2, data : "world"})
            targetSet.add({ index : 3, data : "local"})
            targetSet.add({ index : 3, data : "host"})

            targetSet.delete(3)
            expect(targetSet.size).toBe(2)
            expect(targetSet.hasStandard(1)).toBeTruthy()
            expect(targetSet.hasStandard(2)).toBeTruthy()
            expect(targetSet.hasStandard(3)).toBeFalsy()
        })

        it("TEST clear", () => {
            const targetSet = new DistinctSet( ( num : TestType ) => num.index )
            targetSet.add({ index : 1, data : "hello"})
            targetSet.add({ index : 2, data : "world"})
            targetSet.add({ index : 3, data : "local"})
            targetSet.add({ index : 3, data : "host"})

            targetSet.clear()
            expect(targetSet.size).toBe(0)
        })
    })
})