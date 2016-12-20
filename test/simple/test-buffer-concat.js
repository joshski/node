// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var common = require('../common');
var assert = require('assert');

var zero = [];
var one  = [ new Buffer('asdf') ];
var long = [];
for (var i = 0; i < 10; i++) long.push(new Buffer('asdf'));

var flatZero = Buffer.concat(zero);
var flatOne = Buffer.concat(one);
var flatLong = Buffer.concat(long);
var flatLongLen = Buffer.concat(long, 40);

assert(flatZero.length === 0);
assert(flatOne.toString() === 'asdf');
assert(flatOne === one[0]);
assert(flatLong.toString() === (new Array(10+1).join('asdf')));
assert(flatLongLen.toString() === (new Array(10+1).join('asdf')));

var ones = new Buffer(10).fill('1');
var empty = new Buffer(0);

assert.equal(Buffer.concat([], 100).toString(), '');
assert.equal(Buffer.concat([ones], 0).toString(), ones.toString()); // 0.12.x
assert.equal(Buffer.concat([ones], 10).toString(), ones.toString());
assert.equal(Buffer.concat([ones, ones], 10).toString(), ones.toString());
assert.equal(Buffer.concat([empty, ones]).toString(), ones.toString());
assert.equal(Buffer.concat([ones, empty, empty]).toString(), ones.toString());

// The tail should be zero-filled
assert.equal(
    Buffer.concat([empty, empty], 100).toString(),
    new Buffer(100).fill(0).toString());
assert.equal(
    Buffer.concat([empty, ones], 40).toString(),
    Buffer.concat([ones, new Buffer(30).fill(0)]).toString());

console.log("ok");