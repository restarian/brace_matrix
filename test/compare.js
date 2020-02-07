/* Copyright (c) 2019 Robert Steckroth, Bust0ut [<RobertSteckroth@gmail.com>](mailto:RobertSteckroth@gmail.com)

Brace Matrix resides under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

  this file is a part of Brace Matrix 

  Brace Matrix is a compact port of the gl-matrix library. 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

var it_will = global
global.module = module
var cache = utils.cacheManager(require)

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("Checking for dependencies..", function() { 

		it("requirejs in the system as a program", function(done) {

			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true; } catch(e) { return e; }})()).to.be.true 
			it_will.stop = false 
			done()
		})
		it("the gl-matrix module is installed", function(done) {

			it_will.stop = true 
			expect((function() {try { require("gl-matrix"); return true; } catch(e) { return e; }})()).to.be.true 
			it_will.stop = false 
			done()
		})
	})

	describe("The output of mat4 is the same", function(done) {

		var cwd = path.join(__dirname, "example"), requirejs
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "build"), nodeRequire: require})
		})

		afterEach(cache.dump.bind(cache))

		it("vec3 comparison", function(done) {

			requirejs(["brace_matrix_umd", "brace_matrix", "gl-matrix"], function(bglm, ubglm, glm) { 

				expect(glm.vec3.create()).to.deep.equal(bglm.vec3.create())
				expect(glm.vec3.create()).to.deep.equal(ubglm.vec3.create())
				expect(glm.vec3.fromValues([442,23,48])).to.deep.equal(bglm.vec3.fromValues([442,23,48]))
				expect(glm.vec3.fromValues([442,23,48])).to.deep.equal(ubglm.vec3.fromValues([442,23,48]))
				expect(glm.vec3.distance(glm.vec3.create(), [1,4,5], [43,1,33])).to.deep.equal(bglm.vec3.distance(bglm.vec3.create(), [1,4,5], [43,1,33]))
				expect(glm.vec3.distance(glm.vec3.create(), [1,4,5], [43,1,33])).to.deep.equal(ubglm.vec3.distance(bglm.vec3.create(), [1,4,5], [43,1,33]))
				done()
			})
		})
		it("mat4 comparison", function(done) {

			requirejs(["brace_matrix_umd", "brace_matrix", "gl-matrix"], function(bglm, ubglm, glm) { 

				expect(glm.mat4.create()).to.deep.equal(bglm.mat4.create())
				expect(glm.mat4.create()).to.deep.equal(ubglm.mat4.create())
				expect(glm.mat4.identity(glm.mat4.create())).to.deep.equal(bglm.mat4.create())
				expect(glm.mat4.identity(glm.mat4.create())).to.deep.equal(ubglm.mat4.create())
				expect(glm.mat4.identity(glm.mat4.create())).to.deep.equal(bglm.mat4.identity(bglm.mat4.create()))
				expect(glm.mat4.identity(glm.mat4.create())).to.deep.equal(ubglm.mat4.identity(bglm.mat4.create()))

				var a = glm.mat4.create()
				var b = bglm.mat4.create()
				var b = ubglm.mat4.create()
				expect(glm.mat4.rotate(glm.mat4.create(), a, glm.glMatrix.toRadian(23), [2,1,0])).to.deep.equal(bglm.mat4.rotateVec3(bglm.mat4.create(), b, bglm.toRadian(23), [2,1,0]))
				expect(glm.mat4.rotate(glm.mat4.create(), a, glm.glMatrix.toRadian(23), [2,1,0])).to.deep.equal(ubglm.mat4.rotateVec3(ubglm.mat4.create(), b, ubglm.toRadian(23), [2,1,0]))
				expect(glm.mat4.rotate(glm.mat4.create(), a, glm.glMatrix.toRadian(23), [2,1,0])).to.deep.equal(bglm.mat4.rotate(bglm.mat4.create(), b, bglm.toRadian(23), 2,1,0))
				expect(glm.mat4.rotate(glm.mat4.create(), a, glm.glMatrix.toRadian(23), [2,1,0])).to.deep.equal(ubglm.mat4.rotate(ubglm.mat4.create(), b, bglm.toRadian(23), 2,1,0))
				done()
			})
		})
	})
})
