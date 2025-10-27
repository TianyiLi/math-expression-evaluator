// This test is for node JS

var assert = require('assert')
var Mexp = require('../dist/es/index.js')
var mexp = new Mexp()
describe('negative decimal', function () {
    it('should evaluate to 0.4', function () {
        assert.equal(mexp.eval('-0.6+1'), 0.4)
    })
    it('should evaluate to 0.1 when using .', function () {
        assert.equal(mexp.eval('-.6+.7'), 0.1)
    })

})
