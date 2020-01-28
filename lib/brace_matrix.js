/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software witho restriction, including witho limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

// Modified by Robert Steckroth, Bust0ut <robertsteckroth@gmail.com>

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([], function() {

	var matrix	
	return matrix = {
		_array: typeof Float32Array !== "undefined" && Float32Array || function(len) { return Array(len).fill(0) },
		ARRAY_TYPE: function(a,b,c) { 

			return new matrix._array(a,b,c)
		},
		degree: Math.PI / 180,
		toRadian: function(a) {
			return a * this.degree
		},
		vec4: {
			
			create: function() {

				return matrix.ARRAY_TYPE(4)
			},
		},
		vec3: {
			
			create: function() {

				return matrix.ARRAY_TYPE(3)
			},
			setVec3: function(o, a) {

				return this.set(o, a[0], a[1], a[2])
			},
			set: function(o, x, y, z) {

				o[0] = x
				o[1] = y
				o[2] = z
				return o
			},
			translate: function(o, a, mag, d) {

				o[0] = a[0] + d[0] * mag
				o[1] = a[1] + d[1] * mag
				o[2] = a[2] + d[2] * mag
				return o
			},
			distance: function(a, b) {

				var x = b[0] - a[0]
				var y = b[1] - a[1]
				var z = b[2] - a[2]
				return Math.sqrt(x * x + y * y + z * z)
			},
			normalizeVec3: function(o, a) {

				return this.normalize(o, a[0], a[1], a[2])
			},
			normalize: function(o, x, y, z) {

				var len = x * x + y * y + z * z
				if (len > 0) {
					//todo: evaluate use of glm_invsqrt here?
					len = 1 / Math.sqrt(len)
					o[0] = x * len
					o[1] = y * len
					o[2] = z * len
				}
				return o
			},
			subtractVec3: function(o, a, b) {

				return this.subtract(o, a, b[0], b[1], b[2])
			},
			subtract: function(o, a, x, y, z) {

				o[0] = a[0] - x
				o[1] = a[1] - y
				o[2] = a[2] - z
				return o
			},
			addVec3: function(o, a, b) {

				return this.add(o, a, b[0], b[1], b[2]) 
			},
			add: function(o, a, x, y, z) {

				o[0] = a[0] + x 
				o[1] = a[1] + y
				o[2] = a[2] + z 
				return o
			},
			multiplyVec3: function(o, a, v) {

				return this.multiply(o, a, v[0], v[1], v[2])
			},
			multiply: function(o, a, x, y, z) {

				o[0] = a[0] * x
				o[1] = a[1] * y  
				o[2] = a[2] * z 
				return o
			},
			divideVec3: function(o, a, b) {

				return this.divide(o, a, b[0], b[1], b[2])
			},
			divide: function(o, a, b) {

				o[0] = a[0] / b[0]
				o[1] = a[1] / b[1]
				o[2] = a[2] / b[2]
				return o
			},
			crossVec3: function(o, a, b) {

				return this.cross(o, a, b[0], b[1], b[2])
			},
			cross: function(o, a, b) {

				var ax = a[0], ay = a[1], az = a[2]
				var bx = b[0], by = b[1], bz = b[2]

				o[0] = ay * bz - az * by
				o[1] = az * bx - ax * bz
				o[2] = ax * by - ay * bx
				return o
			},
			dot: function(a, b) {

				return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
			},
			fromValues: function(x, y, z) {
				
				var o = matrix.ARRAY_TYPE(3)
				o[0] = x
				o[1] = y
				o[2] = z
				return o
			},
			angle: function(a, b) {

			  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2]
			  var mag1 = Math.sqrt(ax*ax + ay*ay + az*az)
			  var mag2 = Math.sqrt(bx*bx + by*by + bz*bz)
			  mag = mag1 * mag2,
			  cosine = mag && (dot(a, b) / mag);

			  return Math.acos(Math.min(Math.max(cosine, -1), 1))
			},
			rotateCartesionX: function(o, a, c) {

				if ( c === 0 ) return this.set(o, a[0], a[1], a[2])
				var a1 = a[1]
				o[0] = a[0]
				o[1] = a[1] * Math.cos(c) - a[2] * Math.sin(c)
				o[2] = a1 * Math.sin(c) + a[2] * Math.cos(c)
				return o
			},
			rotateCartesionY: function(o, a, c) {

				if ( c === 0 ) return this.set(o, a[0], a[1], a[2])
				var a0 = a[0]
				o[0] = a[2] * Math.sin(c) + a[0] * Math.cos(c)
				o[1] = a[1]
				o[2] = a[2] * Math.cos(c) - a0 * Math.sin(c)
				return o
			},
			rotateCartesionZ: function(o, a, c) {

				if ( c === 0 ) return this.set(o, a[0], a[1], a[2])
				var a0 = a[0]
				o[0] = a[0] * Math.cos(c) - a[1] * Math.sin(c)
				o[1] = a0 * Math.sin(c) + a[1] * Math.cos(c)
				o[2] = a[2]
				return o
			},
			orthogonalNormal: function(o, a, b, c) {

				var p1x = b[0] - a[0]
				var p1y = b[1] - a[1]
				var p1z = b[2] - a[2]

				var p2x = c[0] - a[0]
				var p2y = c[1] - a[1]
				var p2z = c[2] - a[2]

				var p3x = p1y * p2z - p1z * p2y
				var p3y = p1z * p2x - p1x * p2z
				var p3z = p1x * p2y - p1y * p2x

				var mag = Math.sqrt(p3x * p3x + p3y * p3y + p3z * p3z)

				if ( mag ) {
					o[0] = p3x/mag
					o[1] = p3y/mag
					o[2] = p3z/mag
				}

				return o
			}
		},
		mat3: {
			create: function() {

				var o = matrix.ARRAY_TYPE(9)
				o[0] = 1
				o[4] = 1
				o[8] = 1
				return o
			},
			fromMat4: function(o, a) {

				o[0] = a[0]
				o[1] = a[1]
				o[2] = a[2]
				o[3] = a[4]
				o[4] = a[5]
				o[5] = a[6]
				o[6] = a[8]
				o[7] = a[9]
				o[8] = a[10]
				return o
			},
			transpose: function(o, a) {
				
				// If we are transposing itself we can skip a few steps but have to cache some values.
				if ( o === a ) {
					var a01 = a[1], a02 = a[2], a12 = a[5]
					o[1] = a[3]
					o[2] = a[6]
					o[3] = a01
					o[5] = a[7]
					o[6] = a02
					o[7] = a12
				} else {
					o[0] = a[0]
					o[1] = a[3]
					o[2] = a[6]
					o[3] = a[1]
					o[4] = a[4]
					o[5] = a[7]
					o[6] = a[2]
					o[7] = a[5]
					o[8] = a[8]
				}
				return o
			},
			invert: function(o, a) {

				var a00 = a[0], a01 = a[1], a02 = a[2]
				var a10 = a[3], a11 = a[4], a12 = a[5]
				var a20 = a[6], a21 = a[7], a22 = a[8]

				var b01 = a22 * a11 - a12 * a21
				var b11 = -a22 * a10 + a12 * a20
				var b21 = a21 * a10 - a11 * a20

				// Calculate the determinant
				var det = a00 * b01 + a01 * b11 + a02 * b21

				if ( !det ) 
					return NaN
				
				det = 1.0 / det

				o[0] = b01 * det
				o[1] = (-a22 * a01 + a02 * a21) * det
				o[2] = (a12 * a01 - a02 * a11) * det
				o[3] = b11 * det
				o[4] = (a22 * a00 - a02 * a20) * det
				o[5] = (-a12 * a00 + a02 * a10) * det
				o[6] = b21 * det
				o[7] = (-a21 * a00 + a01 * a20) * det
				o[8] = (a11 * a00 - a01 * a10) * det
				return o
			},
			fromMat4: function(o, a) {
				o[0] = a[0]
				o[1] = a[1]
				o[2] = a[2]
				o[3] = a[4]
				o[4] = a[5]
				o[5] = a[6]
				o[6] = a[8]
				o[7] = a[9]
				o[8] = a[10]
				return o
			}
		},
		mat4: {
			create: function() {

				// Only the ones need to be set sense Float32Array are initialized with zeros internally.
				var o = matrix.ARRAY_TYPE(16)
				o[0] = 1
				o[5] = 1
				o[10] = 1
				o[15] = 1
				return o
			},
			identity: function(o) {

				o[0] = 1
				o[1] = 0
				o[2] = 0
				o[3] = 0
				o[4] = 0
				o[5] = 1
				o[6] = 0
				o[7] = 0
				o[8] = 0
				o[9] = 0
				o[10] = 1
				o[11] = 0
				o[12] = 0
				o[13] = 0
				o[14] = 0
				o[15] = 1
				return o
			},
			ortho: function(out, left, right, bottom, top, near, far) {
				
				var lr = 1 / (left - right)
				var bt = 1 / (bottom - top)
				var nf = 1 / (near - far)
				out[0] = -2 * lr
				out[1] = 0
				out[2] = 0
				out[3] = 0
				out[4] = 0
				out[5] = -2 * bt
				out[6] = 0
				out[7] = 0
				out[8] = 0
				out[9] = 0
				out[10] = 2 * nf
				out[11] = 0
				out[12] = (left + right) * lr
				out[13] = (top + bottom) * bt
				out[14] = (far + near) * nf
				out[15] = 1
				return out
			},
			perspective: function(o, fovy, near, far, aspect) {

				var f = 1.0 / Math.tan(fovy / 2)
				var nf = 1 / (near - far)
				o[0] = f / aspect
				o[1] = 0
				o[2] = 0
				o[3] = 0
				o[4] = 0
				o[5] = f
				o[6] = 0
				o[7] = 0
				o[8] = 0
				o[9] = 0
				o[10] = (far + near) * nf
				o[11] = -1
				o[12] = 0
				o[13] = 0
				o[14] = 2 * far * near * nf
				o[15] = 0
				return o
			},
			vec3FromTranslateVec3: function(o, a, v) {

				return this.vec3FromTranslate(o, a, v[0], v[1], v[2])
			},
			vec3FromTranslate: function(o, a, x, y, z) {

				o[0] = a[0] * x + a[4] * y + a[8] * z + a[12]
				o[1] = a[1] * x + a[5] * y + a[9] * z + a[13]
				o[2] = a[2] * x + a[6] * y + a[10] * z + a[14]
				return o
			},
			translateVec3: function(o, a, v) {

				return this.translate(o, a, v[0], v[1], v[2])
			},
			translate: function(o, a, x, y, z) {

				if ( a !== o ) 
					o = a.slice()

				o[12] = a[0] * x + a[4] * y + a[8] * z + a[12]
				o[13] = a[1] * x + a[5] * y + a[9] * z + a[13]
				o[14] = a[2] * x + a[6] * y + a[10] * z + a[14]
				o[15] = a[3] * x + a[7] * y + a[11] * z + a[15]
				return o
			},
			rotateVec3: function(o, a, rad, axis) {

				return this.rotate(o, a, rad, axis[0], axis[1], axis[2])
			},
			rotate: function(o, a, rad, x, y, z) {

				var len = Math.sqrt(x * x + y * y + z * z)
				var s = c = t = void 0

				var a00 = a01 = a02 = a03 = void 0
				var a10 = a11 = a12 = a13 = void 0
				var a20 = a21 = a22 = a23 = void 0
				var b00 = b01 = b02 = void 0
				var b10 = b11 = b12 = void 0
				var b20 = b21 = b22 = void 0

				if ( Math.abs(len) < Number.EPSILON )
					return NaN

				len = 1 / len
				x *= len
				y *= len
				z *= len

				s = Math.sin(rad)
				c = Math.cos(rad)
				t = 1 - c

				a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3]
				a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7]
				a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11]

				// Construct the elements of the rotation matrix
				b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s
				b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s
				b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c

				// Perform rotation-specific matrix multiplication
				o[0] = a00 * b00 + a10 * b01 + a20 * b02
				o[1] = a01 * b00 + a11 * b01 + a21 * b02
				o[2] = a02 * b00 + a12 * b01 + a22 * b02
				o[3] = a03 * b00 + a13 * b01 + a23 * b02
				o[4] = a00 * b10 + a10 * b11 + a20 * b12
				o[5] = a01 * b10 + a11 * b11 + a21 * b12
				o[6] = a02 * b10 + a12 * b11 + a22 * b12
				o[7] = a03 * b10 + a13 * b11 + a23 * b12
				o[8] = a00 * b20 + a10 * b21 + a20 * b22
				o[9] = a01 * b20 + a11 * b21 + a21 * b22
				o[10] = a02 * b20 + a12 * b21 + a22 * b22
				o[11] = a03 * b20 + a13 * b21 + a23 * b22

				if ( a !== o ) {
					// If the source and destination differ, copy the unchanged last row
					o[12] = a[12]
					o[13] = a[13]
					o[14] = a[14]
					o[15] = a[15]
				}
				return o
			},
			scaleVec3: function(o, a, v) {

				return this.scale(o, a, v[0], v[1], v[2])
			},
			scale: function(o, a, x, y, z) {

				o[0] = a[0] * x
				o[1] = a[1] * x
				o[2] = a[2] * x
				o[3] = a[3] * x
				o[4] = a[4] * y
				o[5] = a[5] * y
				o[6] = a[6] * y
				o[7] = a[7] * y
				o[8] = a[8] * z
				o[9] = a[9] * z
				o[10] = a[10] * z
				o[11] = a[11] * z
				o[12] = a[12]
				o[13] = a[13]
				o[14] = a[14]
				o[15] = a[15]
				return o
			},
			invert: function(out, a) {

				var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
				var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
				var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
				var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

				var b00 = a00 * a11 - a01 * a10
				var b01 = a00 * a12 - a02 * a10
				var b02 = a00 * a13 - a03 * a10
				var b03 = a01 * a12 - a02 * a11
				var b04 = a01 * a13 - a03 * a11
				var b05 = a02 * a13 - a03 * a12
				var b06 = a20 * a31 - a21 * a30
				var b07 = a20 * a32 - a22 * a30
				var b08 = a20 * a33 - a23 * a30
				var b09 = a21 * a32 - a22 * a31
				var b10 = a21 * a33 - a23 * a31
				var b11 = a22 * a33 - a23 * a32

				var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

				if ( !det ) 
					return NaN
				det = 1.0 / det

				out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det
				out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det
				out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det
				out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det
				out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det
				out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det
				out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det
				out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det
				out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det
				out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det
				out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det
				out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det
				out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det
				out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det
				out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det
				out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det

				return out
			},
			multiply: function(out, a, b) {

				var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
				var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
				var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
				var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

				// Cache only the current line of the second matrix
				var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3]
				out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30
				out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31
				out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32
				out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33

				b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7]
				out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30
				out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31
				out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32
				out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33

				b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11]
				out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30
				out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31
				out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32
				out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33

				b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15]
				out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30
				out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31
				out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32
				out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33

				return out
			},
			transformMat4: function(out, a, m) {

			  var x = a[0], y = a[1], z = a[2], w = a[3]
			  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
			  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
			  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
			  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
			  return out
			},
		},
	}

})
