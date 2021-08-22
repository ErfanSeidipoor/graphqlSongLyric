const rewire = require("rewire")
const index = rewire("./index")
const SongList = index.__get__("SongList")
// @ponicode
describe("onSongDelete", () => {
    let inst

    beforeEach(() => {
        inst = new SongList()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onSongDelete("_14")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onSongDelete("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onSongDelete("projects/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onSongDelete("projectId-1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.onSongDelete(2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.onSongDelete(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
