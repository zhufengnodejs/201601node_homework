/**
 * Created by caoyangkaka on 3/9/16.
 */
var concat = require('./concat.js').concat;
var should = require('should');

describe('buffer.test.js', function () {
    it('should cancat two buffer even if we don\'t give the length', function () {
        var b1 = new Buffer('哈利');
        var b2 = new Buffer('波特');
        concat([b1, b2]).toString().should.equal('哈利波特');
    });
    it('should cancat two buffer even if we don\'t give the length with mixed language', function () {
        var b1 = new Buffer('Harry');
        var b2 = new Buffer('波特');
        concat([b1, b2]).toString().should.equal('Harry波特');
    });

    it('should cancat one buffer list', function () {
        concat([new Buffer('helloworld')]).toString().should.equal('helloworld');
    });

    it('should cancat an empty buffer list', function () {
        concat([]).toString().should.equal('');
    });

    it('should cancat two buffer', function () {
        var b1 = new Buffer('哈利');
        var b2 = new Buffer('波特');
        concat([b1, b2], 6).toString().should.equal('哈利');
        concat([b1, b2], 12).toString().should.equal('哈利波特');
    });
    it('should cancat two buffer', function () {
        var b1 = new Buffer('hello');
        var b2 = new Buffer('world');
        concat([b1, b2], 8).toString().should.equal('hellowor');
    });
    it('should throw error when list is not an Array', function () {
        (function () {
            concat(1);
        }).should.throw("USAGE: Buffer.concat(list, [length])");
    });
    it('should throw error when cancat not buffer list', function () {
        (function () {
            concat([1, 2]);
        }).should.throw("list must a Buffer list.");
    });
});