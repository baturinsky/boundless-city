(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    /**
     *
     * Vec3 math math functions.
     *
     * Almost all functions take an optional `dst` argument. If it is not passed in the
     * functions will create a new Vec3. In other words you can do this
     *
     *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
     *
     * or
     *
     *     var v = v3.create();
     *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
     *
     * The first style is often easier but depending on where it's used it generates garbage where
     * as there is almost never allocation with the second style.
     *
     * It is always save to pass any vector as the destination. So for example
     *
     *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
     *
     * @module twgl/v3
     */

    let VecType = Float32Array;

    /**
     * Creates a vec3; may be called with x, y, z to set initial values.
     * @param {number} [x] Initial x value.
     * @param {number} [y] Initial y value.
     * @param {number} [z] Initial z value.
     * @return {module:twgl/v3.Vec3} the created vector
     * @memberOf module:twgl/v3
     */
    function create(x, y, z) {
      const dst = new VecType(3);
      if (x) {
        dst[0] = x;
      }
      if (y) {
        dst[1] = y;
      }
      if (z) {
        dst[2] = z;
      }
      return dst;
    }

    /**
     * Adds two vectors; assumes a and b have the same dimension.
     * @param {module:twgl/v3.Vec3} a Operand vector.
     * @param {module:twgl/v3.Vec3} b Operand vector.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} the created vector
     * @memberOf module:twgl/v3
     */
    function add(a, b, dst) {
      dst = dst || new VecType(3);

      dst[0] = a[0] + b[0];
      dst[1] = a[1] + b[1];
      dst[2] = a[2] + b[2];

      return dst;
    }

    /**
     * Subtracts two vectors.
     * @param {module:twgl/v3.Vec3} a Operand vector.
     * @param {module:twgl/v3.Vec3} b Operand vector.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} the created vector
     * @memberOf module:twgl/v3
     */
    function subtract(a, b, dst) {
      dst = dst || new VecType(3);

      dst[0] = a[0] - b[0];
      dst[1] = a[1] - b[1];
      dst[2] = a[2] - b[2];

      return dst;
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {module:twgl/v3.Vec3} v The vector.
     * @param {number} k The scalar.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} dst.
     * @memberOf module:twgl/v3
     */
    function mulScalar(v, k, dst) {
      dst = dst || new VecType(3);

      dst[0] = v[0] * k;
      dst[1] = v[1] * k;
      dst[2] = v[2] * k;

      return dst;
    }

    /**
     * Divides a vector by a scalar.
     * @param {module:twgl/v3.Vec3} v The vector.
     * @param {number} k The scalar.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} dst.
     * @memberOf module:twgl/v3
     */
    function divScalar(v, k, dst) {
      dst = dst || new VecType(3);

      dst[0] = v[0] / k;
      dst[1] = v[1] / k;
      dst[2] = v[2] / k;

      return dst;
    }

    /**
     * Computes the cross product of two vectors; assumes both vectors have
     * three entries.
     * @param {module:twgl/v3.Vec3} a Operand vector.
     * @param {module:twgl/v3.Vec3} b Operand vector.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} The vector a cross b.
     * @memberOf module:twgl/v3
     */
    function cross(a, b, dst) {
      dst = dst || new VecType(3);

      const t1 = a[2] * b[0] - a[0] * b[2];
      const t2 = a[0] * b[1] - a[1] * b[0];
      dst[0] = a[1] * b[2] - a[2] * b[1];
      dst[1] = t1;
      dst[2] = t2;

      return dst;
    }

    /**
     * Computes the length of vector
     * @param {module:twgl/v3.Vec3} v vector.
     * @return {number} length of vector.
     * @memberOf module:twgl/v3
     */
    function length$1(v) {
      return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }

    /**
     * Computes the distance between 2 points
     * @param {module:twgl/v3.Vec3} a vector.
     * @param {module:twgl/v3.Vec3} b vector.
     * @return {number} distance between a and b
     * @memberOf module:twgl/v3
     */
    function distance(a, b) {
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const dz = a[2] - b[2];
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Divides a vector by its Euclidean length and returns the quotient.
     * @param {module:twgl/v3.Vec3} a The vector.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} The normalized vector.
     * @memberOf module:twgl/v3
     */
    function normalize(a, dst) {
      dst = dst || new VecType(3);

      const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
      const len = Math.sqrt(lenSq);
      if (len > 0.00001) {
        dst[0] = a[0] / len;
        dst[1] = a[1] / len;
        dst[2] = a[2] / len;
      } else {
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
      }

      return dst;
    }

    /**
     * Copies a vector.
     * @param {module:twgl/v3.Vec3} v The vector.
     * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created..
     * @return {module:twgl/v3.Vec3} A copy of v.
     * @memberOf module:twgl/v3
     */
    function copy(v, dst) {
      dst = dst || new VecType(3);

      dst[0] = v[0];
      dst[1] = v[1];
      dst[2] = v[2];

      return dst;
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    /**
     * 4x4 Matrix math math functions.
     *
     * Almost all functions take an optional `dst` argument. If it is not passed in the
     * functions will create a new matrix. In other words you can do this
     *
     *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
     *
     * or
     *
     *     const mat = m4.create();
     *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
     *
     * The first style is often easier but depending on where it's used it generates garbage where
     * as there is almost never allocation with the second style.
     *
     * It is always save to pass any matrix as the destination. So for example
     *
     *     const mat = m4.identity();
     *     const trans = m4.translation([1, 2, 3]);
     *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
     *
     * @module twgl/m4
     */
    let MatType = Float32Array;

    const tempV3a = create();
    const tempV3b = create();
    const tempV3c = create();

    /**
     * Creates an n-by-n identity matrix.
     *
     * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If none new one is created..
     * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
     * @memberOf module:twgl/m4
     */
    function identity(dst) {
      dst = dst || new MatType(16);

      dst[ 0] = 1;
      dst[ 1] = 0;
      dst[ 2] = 0;
      dst[ 3] = 0;
      dst[ 4] = 0;
      dst[ 5] = 1;
      dst[ 6] = 0;
      dst[ 7] = 0;
      dst[ 8] = 0;
      dst[ 9] = 0;
      dst[10] = 1;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Takes the transpose of a matrix.
     * @param {module:twgl/m4.Mat4} m The matrix.
     * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If none new one is created..
     * @return {module:twgl/m4.Mat4} The transpose of m.
     * @memberOf module:twgl/m4
     */
     function transpose(m, dst) {
      dst = dst || new MatType(16);
      if (dst === m) {
        let t;

        t = m[1];
        m[1] = m[4];
        m[4] = t;

        t = m[2];
        m[2] = m[8];
        m[8] = t;

        t = m[3];
        m[3] = m[12];
        m[12] = t;

        t = m[6];
        m[6] = m[9];
        m[9] = t;

        t = m[7];
        m[7] = m[13];
        m[13] = t;

        t = m[11];
        m[11] = m[14];
        m[14] = t;
        return dst;
      }

      const m00 = m[0 * 4 + 0];
      const m01 = m[0 * 4 + 1];
      const m02 = m[0 * 4 + 2];
      const m03 = m[0 * 4 + 3];
      const m10 = m[1 * 4 + 0];
      const m11 = m[1 * 4 + 1];
      const m12 = m[1 * 4 + 2];
      const m13 = m[1 * 4 + 3];
      const m20 = m[2 * 4 + 0];
      const m21 = m[2 * 4 + 1];
      const m22 = m[2 * 4 + 2];
      const m23 = m[2 * 4 + 3];
      const m30 = m[3 * 4 + 0];
      const m31 = m[3 * 4 + 1];
      const m32 = m[3 * 4 + 2];
      const m33 = m[3 * 4 + 3];

      dst[ 0] = m00;
      dst[ 1] = m10;
      dst[ 2] = m20;
      dst[ 3] = m30;
      dst[ 4] = m01;
      dst[ 5] = m11;
      dst[ 6] = m21;
      dst[ 7] = m31;
      dst[ 8] = m02;
      dst[ 9] = m12;
      dst[10] = m22;
      dst[11] = m32;
      dst[12] = m03;
      dst[13] = m13;
      dst[14] = m23;
      dst[15] = m33;

      return dst;
    }

    /**
     * Computes the inverse of a 4-by-4 matrix.
     * @param {module:twgl/m4.Mat4} m The matrix.
     * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If none new one is created..
     * @return {module:twgl/m4.Mat4} The inverse of m.
     * @memberOf module:twgl/m4
     */
    function inverse(m, dst) {
      dst = dst || new MatType(16);

      const m00 = m[0 * 4 + 0];
      const m01 = m[0 * 4 + 1];
      const m02 = m[0 * 4 + 2];
      const m03 = m[0 * 4 + 3];
      const m10 = m[1 * 4 + 0];
      const m11 = m[1 * 4 + 1];
      const m12 = m[1 * 4 + 2];
      const m13 = m[1 * 4 + 3];
      const m20 = m[2 * 4 + 0];
      const m21 = m[2 * 4 + 1];
      const m22 = m[2 * 4 + 2];
      const m23 = m[2 * 4 + 3];
      const m30 = m[3 * 4 + 0];
      const m31 = m[3 * 4 + 1];
      const m32 = m[3 * 4 + 2];
      const m33 = m[3 * 4 + 3];
      const tmp_0  = m22 * m33;
      const tmp_1  = m32 * m23;
      const tmp_2  = m12 * m33;
      const tmp_3  = m32 * m13;
      const tmp_4  = m12 * m23;
      const tmp_5  = m22 * m13;
      const tmp_6  = m02 * m33;
      const tmp_7  = m32 * m03;
      const tmp_8  = m02 * m23;
      const tmp_9  = m22 * m03;
      const tmp_10 = m02 * m13;
      const tmp_11 = m12 * m03;
      const tmp_12 = m20 * m31;
      const tmp_13 = m30 * m21;
      const tmp_14 = m10 * m31;
      const tmp_15 = m30 * m11;
      const tmp_16 = m10 * m21;
      const tmp_17 = m20 * m11;
      const tmp_18 = m00 * m31;
      const tmp_19 = m30 * m01;
      const tmp_20 = m00 * m21;
      const tmp_21 = m20 * m01;
      const tmp_22 = m00 * m11;
      const tmp_23 = m10 * m01;

      const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
          (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
          (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
          (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
          (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

      const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

      dst[ 0] = d * t0;
      dst[ 1] = d * t1;
      dst[ 2] = d * t2;
      dst[ 3] = d * t3;
      dst[ 4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
              (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
      dst[ 5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
              (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
      dst[ 6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
              (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
      dst[ 7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
              (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
      dst[ 8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
              (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
      dst[ 9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
              (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
      dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
              (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
      dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
              (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
      dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
              (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
      dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
              (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
      dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
              (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
      dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
              (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

      return dst;
    }

    /**
     * Multiplies two 4-by-4 matrices with a on the left and b on the right
     * @param {module:twgl/m4.Mat4} a The matrix on the left.
     * @param {module:twgl/m4.Mat4} b The matrix on the right.
     * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If none new one is created..
     * @return {module:twgl/m4.Mat4} The matrix product of a and b.
     * @memberOf module:twgl/m4
     */
    function multiply(a, b, dst) {
      dst = dst || new MatType(16);

      const a00 = a[0];
      const a01 = a[1];
      const a02 = a[2];
      const a03 = a[3];
      const a10 = a[ 4 + 0];
      const a11 = a[ 4 + 1];
      const a12 = a[ 4 + 2];
      const a13 = a[ 4 + 3];
      const a20 = a[ 8 + 0];
      const a21 = a[ 8 + 1];
      const a22 = a[ 8 + 2];
      const a23 = a[ 8 + 3];
      const a30 = a[12 + 0];
      const a31 = a[12 + 1];
      const a32 = a[12 + 2];
      const a33 = a[12 + 3];
      const b00 = b[0];
      const b01 = b[1];
      const b02 = b[2];
      const b03 = b[3];
      const b10 = b[ 4 + 0];
      const b11 = b[ 4 + 1];
      const b12 = b[ 4 + 2];
      const b13 = b[ 4 + 3];
      const b20 = b[ 8 + 0];
      const b21 = b[ 8 + 1];
      const b22 = b[ 8 + 2];
      const b23 = b[ 8 + 3];
      const b30 = b[12 + 0];
      const b31 = b[12 + 1];
      const b32 = b[12 + 2];
      const b33 = b[12 + 3];

      dst[ 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
      dst[ 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
      dst[ 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
      dst[ 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
      dst[ 4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
      dst[ 5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
      dst[ 6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
      dst[ 7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
      dst[ 8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
      dst[ 9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
      dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
      dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
      dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
      dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
      dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
      dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

      return dst;
    }

    /**
     * Computes a 4-by-4 perspective transformation matrix given the angular height
     * of the frustum, the aspect ratio, and the near and far clipping planes.  The
     * arguments define a frustum extending in the negative z direction.  The given
     * angle is the vertical angle of the frustum, and the horizontal angle is
     * determined to produce the given aspect ratio.  The arguments near and far are
     * the distances to the near and far clipping planes.  Note that near and far
     * are not z coordinates, but rather they are distances along the negative
     * z-axis.  The matrix generated sends the viewing frustum to the unit box.
     * We assume a unit box extending from -1 to 1 in the x and y dimensions and
     * from 0 to 1 in the z dimension.
     * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
     * @param {number} aspect The aspect ratio width / height.
     * @param {number} zNear The depth (negative z coordinate)
     *     of the near clipping plane.
     * @param {number} zFar The depth (negative z coordinate)
     *     of the far clipping plane.
     * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If none new one is created..
     * @return {module:twgl/m4.Mat4} The perspective matrix.
     * @memberOf module:twgl/m4
     */
    function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
      dst = dst || new MatType(16);

      const f = 1/ Math.tan(0.5 * fieldOfViewYInRadians);
      const rangeInv = 1.0 / (zNear - zFar);

      dst[0]  = f / aspect;
      dst[1]  = 0;
      dst[2]  = 0;
      dst[3]  = 0;

      dst[4]  = 0;
      dst[5]  = f;
      dst[6]  = 0;
      dst[7]  = 0;

      dst[8]  = 0;
      dst[9]  = 0;
      dst[10] = (zNear + zFar) * rangeInv;
      dst[11] = -1;

      dst[12] = 0;
      dst[13] = 0;
      dst[14] = zNear * zFar * rangeInv * 2;
      dst[15] = 0;

      return dst;
    }

    /**
     * Computes a 4-by-4 look-at transformation.
     *
     * This is a matrix which positions the camera itself. If you want
     * a view matrix (a matrix which moves things in front of the camera)
     * take the inverse of this.
     *
     * @param {module:twgl/v3.Vec3} eye The position of the eye.
     * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
     * @param {module:twgl/v3.Vec3} up A vector pointing up.
     * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If none new one is created..
     * @return {module:twgl/m4.Mat4} The look-at matrix.
     * @memberOf module:twgl/m4
     */
    function lookAt(eye, target, up, dst) {
      dst = dst || new MatType(16);

      const xAxis = tempV3a;
      const yAxis = tempV3b;
      const zAxis = tempV3c;

      normalize(
          subtract(eye, target, zAxis), zAxis);
      normalize(cross(up, zAxis, xAxis), xAxis);
      normalize(cross(zAxis, xAxis, yAxis), yAxis);

      dst[ 0] = xAxis[0];
      dst[ 1] = xAxis[1];
      dst[ 2] = xAxis[2];
      dst[ 3] = 0;
      dst[ 4] = yAxis[0];
      dst[ 5] = yAxis[1];
      dst[ 6] = yAxis[2];
      dst[ 7] = 0;
      dst[ 8] = zAxis[0];
      dst[ 9] = zAxis[1];
      dst[10] = zAxis[2];
      dst[11] = 0;
      dst[12] = eye[0];
      dst[13] = eye[1];
      dst[14] = eye[2];
      dst[15] = 1;

      return dst;
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    /* DataType */
    const BYTE                           = 0x1400;
    const UNSIGNED_BYTE                  = 0x1401;
    const SHORT                          = 0x1402;
    const UNSIGNED_SHORT                 = 0x1403;
    const INT                            = 0x1404;
    const UNSIGNED_INT                   = 0x1405;
    const FLOAT                          = 0x1406;
    const UNSIGNED_SHORT_4_4_4_4       = 0x8033;
    const UNSIGNED_SHORT_5_5_5_1       = 0x8034;
    const UNSIGNED_SHORT_5_6_5         = 0x8363;
    const HALF_FLOAT                   = 0x140B;
    const UNSIGNED_INT_2_10_10_10_REV  = 0x8368;
    const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
    const UNSIGNED_INT_5_9_9_9_REV     = 0x8C3E;
    const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
    const UNSIGNED_INT_24_8            = 0x84FA;

    const glTypeToTypedArray = {};
    {
      const tt = glTypeToTypedArray;
      tt[BYTE]                           = Int8Array;
      tt[UNSIGNED_BYTE]                  = Uint8Array;
      tt[SHORT]                          = Int16Array;
      tt[UNSIGNED_SHORT]                 = Uint16Array;
      tt[INT]                            = Int32Array;
      tt[UNSIGNED_INT]                   = Uint32Array;
      tt[FLOAT]                          = Float32Array;
      tt[UNSIGNED_SHORT_4_4_4_4]         = Uint16Array;
      tt[UNSIGNED_SHORT_5_5_5_1]         = Uint16Array;
      tt[UNSIGNED_SHORT_5_6_5]           = Uint16Array;
      tt[HALF_FLOAT]                     = Uint16Array;
      tt[UNSIGNED_INT_2_10_10_10_REV]    = Uint32Array;
      tt[UNSIGNED_INT_10F_11F_11F_REV]   = Uint32Array;
      tt[UNSIGNED_INT_5_9_9_9_REV]       = Uint32Array;
      tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
      tt[UNSIGNED_INT_24_8]              = Uint32Array;
    }

    /**
     * Get the GL type for a typedArray
     * @param {ArrayBufferView} typedArray a typedArray
     * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
     *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
     * @memberOf module:twgl/typedArray
     */
    function getGLTypeForTypedArray(typedArray) {
      if (typedArray instanceof Int8Array)         { return BYTE; }           // eslint-disable-line
      if (typedArray instanceof Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
      if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
      if (typedArray instanceof Int16Array)        { return SHORT; }          // eslint-disable-line
      if (typedArray instanceof Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
      if (typedArray instanceof Int32Array)        { return INT; }            // eslint-disable-line
      if (typedArray instanceof Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
      if (typedArray instanceof Float32Array)      { return FLOAT; }          // eslint-disable-line
      throw new Error('unsupported typed array type');
    }

    /**
     * Get the GL type for a typedArray type
     * @param {ArrayBufferView} typedArrayType a typedArray constructor
     * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
     *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
     * @memberOf module:twgl/typedArray
     */
    function getGLTypeForTypedArrayType(typedArrayType) {
      if (typedArrayType === Int8Array)         { return BYTE; }           // eslint-disable-line
      if (typedArrayType === Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
      if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
      if (typedArrayType === Int16Array)        { return SHORT; }          // eslint-disable-line
      if (typedArrayType === Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
      if (typedArrayType === Int32Array)        { return INT; }            // eslint-disable-line
      if (typedArrayType === Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
      if (typedArrayType === Float32Array)      { return FLOAT; }          // eslint-disable-line
      throw new Error('unsupported typed array type');
    }

    /**
     * Get the typed array constructor for a given GL type
     * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
     * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
     * @memberOf module:twgl/typedArray
     */
    function getTypedArrayTypeForGLType(type) {
      const CTOR = glTypeToTypedArray[type];
      if (!CTOR) {
        throw new Error('unknown gl type');
      }
      return CTOR;
    }

    const isArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
      ? function isArrayBufferOrSharedArrayBuffer(a) {
        return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
      }
      : function isArrayBuffer(a) {
        return a && a.buffer && a.buffer instanceof ArrayBuffer;
      };

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    const error =
        ( typeof console !== 'undefined'
          && console.error
          && typeof console.error === "function"
        )
        ? console.error.bind(console)
        : function() { };

    const warn =
        ( typeof console !== 'undefined'
          && console.warn
          && typeof console.warn === "function"
        )
        ? console.warn.bind(console)
        : function() { };

    function isBuffer(gl, t) {
      return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
    }

    function isRenderbuffer(gl, t) {
      return typeof WebGLRenderbuffer !== 'undefined' && t instanceof WebGLRenderbuffer;
    }

    function isShader(gl, t) {
      return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
    }

    function isTexture(gl, t) {
      return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
    }

    function isSampler(gl, t) {
      return typeof WebGLSampler !== 'undefined' && t instanceof WebGLSampler;
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */
    const defaults = {
      attribPrefix: "",
    };

    function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
    }

    /**
     * Given typed array creates a WebGLBuffer and copies the typed array
     * into it.
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
     * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
     * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
     * @return {WebGLBuffer} the created WebGLBuffer
     * @memberOf module:twgl/attributes
     */
    function createBufferFromTypedArray(gl, typedArray, type, drawType) {
      if (isBuffer(gl, typedArray)) {
        return typedArray;
      }
      type = type || gl.ARRAY_BUFFER;
      const buffer = gl.createBuffer();
      setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
      return buffer;
    }

    function isIndices(name) {
      return name === "indices";
    }

    // This is really just a guess. Though I can't really imagine using
    // anything else? Maybe for some compression?
    function getNormalizationForTypedArray(typedArray) {
      if (typedArray instanceof Int8Array)    { return true; }  // eslint-disable-line
      if (typedArray instanceof Uint8Array)   { return true; }  // eslint-disable-line
      return false;
    }

    // This is really just a guess. Though I can't really imagine using
    // anything else? Maybe for some compression?
    function getNormalizationForTypedArrayType(typedArrayType) {
      if (typedArrayType === Int8Array)    { return true; }  // eslint-disable-line
      if (typedArrayType === Uint8Array)   { return true; }  // eslint-disable-line
      return false;
    }

    function getArray(array) {
      return array.length ? array : array.data;
    }

    const texcoordRE = /coord|texture/i;
    const colorRE = /color|colour/i;

    function guessNumComponentsFromName(name, length) {
      let numComponents;
      if (texcoordRE.test(name)) {
        numComponents = 2;
      } else if (colorRE.test(name)) {
        numComponents = 4;
      } else {
        numComponents = 3;  // position, normals, indices ...
      }

      if (length % numComponents > 0) {
        throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
      }

      return numComponents;
    }

    function getNumComponents(array, arrayName) {
      return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
    }

    function makeTypedArray(array, name) {
      if (isArrayBuffer(array)) {
        return array;
      }

      if (isArrayBuffer(array.data)) {
        return array.data;
      }

      if (Array.isArray(array)) {
        array = {
          data: array,
        };
      }

      let Type = array.type;
      if (!Type) {
        if (isIndices(name)) {
          Type = Uint16Array;
        } else {
          Type = Float32Array;
        }
      }
      return new Type(array.data);
    }

    /**
     * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
     * for the attribute.
     *
     * @typedef {Object} AttribInfo
     * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
     *    disabled and set to this constant value and all other values will be ignored.
     * @property {number} [numComponents] the number of components for this attribute.
     * @property {number} [size] synonym for `numComponents`.
     * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
     * @property {boolean} [normalize] whether or not to normalize the data. Default = false
     * @property {number} [offset] offset into buffer in bytes. Default = 0
     * @property {number} [stride] the stride in bytes per element. Default = 0
     * @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
     *    where as anything else = do call it with this value
     * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
     * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
     * @memberOf module:twgl
     */

    /**
     * Use this type of array spec when TWGL can't guess the type or number of components of an array
     * @typedef {Object} FullArraySpec
     * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
     *    disabled and set to this constant value and all other values will be ignored.
     * @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
     * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
     *    If `coord` is in the name assumes `numComponents = 2`.
     *    If `color` is in the name assumes `numComponents = 4`.
     *    otherwise assumes `numComponents = 3`
     * @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
     * For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
     * @property {number} [size] synonym for `numComponents`.
     * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
     * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
     * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
     * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
     *    where as anything else = do call it with this value
     * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
     * @property {string} [name] synonym for `attrib`.
     * @property {string} [attribName] synonym for `attrib`.
     * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
     *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
     *    to provide this. Example:
     *
     *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
     *           position: [1, 2, 3, ... ],
     *         });
     *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
     *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
     *         });
     *
     * @memberOf module:twgl
     */

    /**
     * An individual array in {@link module:twgl.Arrays}
     *
     * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
     * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
     * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
     *
     * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
     * @memberOf module:twgl
     */

    /**
     * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
     * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
     *
     *     Bare JavaScript Arrays
     *
     *         var arrays = {
     *            position: [-1, 1, 0],
     *            normal: [0, 1, 0],
     *            ...
     *         }
     *
     *     Bare TypedArrays
     *
     *         var arrays = {
     *            position: new Float32Array([-1, 1, 0]),
     *            color: new Uint8Array([255, 128, 64, 255]),
     *            ...
     *         }
     *
     * *   Will guess at `numComponents` if not specified based on name.
     *
     *     If `coord` is in the name assumes `numComponents = 2`
     *
     *     If `color` is in the name assumes `numComponents = 4`
     *
     *     otherwise assumes `numComponents = 3`
     *
     * Objects with various fields. See {@link module:twgl.FullArraySpec}.
     *
     *     var arrays = {
     *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
     *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
     *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
     *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
     *     };
     *
     * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
     * @memberOf module:twgl
     */


    /**
     * Creates a set of attribute data and WebGLBuffers from set of arrays
     *
     * Given
     *
     *      var arrays = {
     *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
     *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
     *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
     *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
     *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
     *      };
     *
     * returns something like
     *
     *      var attribs = {
     *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
     *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
     *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
     *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
     *      };
     *
     * notes:
     *
     * *   Arrays can take various forms
     *
     *     Bare JavaScript Arrays
     *
     *         var arrays = {
     *            position: [-1, 1, 0],
     *            normal: [0, 1, 0],
     *            ...
     *         }
     *
     *     Bare TypedArrays
     *
     *         var arrays = {
     *            position: new Float32Array([-1, 1, 0]),
     *            color: new Uint8Array([255, 128, 64, 255]),
     *            ...
     *         }
     *
     * *   Will guess at `numComponents` if not specified based on name.
     *
     *     If `coord` is in the name assumes `numComponents = 2`
     *
     *     If `color` is in the name assumes `numComponents = 4`
     *
     *     otherwise assumes `numComponents = 3`
     *
     * @param {WebGLRenderingContext} gl The webgl rendering context.
     * @param {module:twgl.Arrays} arrays The arrays
     * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
     *   This lets you share buffers. Any arrays you supply will override
     *   the buffers from srcBufferInfo.
     * @return {Object.<string, module:twgl.AttribInfo>} the attribs
     * @memberOf module:twgl/attributes
     */
    function createAttribsFromArrays(gl, arrays) {
      const attribs = {};
      Object.keys(arrays).forEach(function(arrayName) {
        if (!isIndices(arrayName)) {
          const array = arrays[arrayName];
          const attribName = array.attrib || array.name || array.attribName || (defaults.attribPrefix + arrayName);
          if (array.value) {
            if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) {
              throw new Error('array.value is not array or typedarray');
            }
            attribs[attribName] = {
              value: array.value,
            };
          } else {
            let buffer;
            let type;
            let normalization;
            let numComponents;
            if (array.buffer && array.buffer instanceof WebGLBuffer) {
              buffer = array.buffer;
              numComponents = array.numComponents || array.size;
              type = array.type;
              normalization = array.normalize;
            } else if (typeof array === "number" || typeof array.data === "number") {
              const numValues = array.data || array;
              const arrayType = array.type || Float32Array;
              const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
              type = getGLTypeForTypedArrayType(arrayType);
              normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
              numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
              buffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
              gl.bufferData(gl.ARRAY_BUFFER, numBytes, array.drawType || gl.STATIC_DRAW);
            } else {
              const typedArray = makeTypedArray(array, arrayName);
              buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
              type = getGLTypeForTypedArray(typedArray);
              normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
              numComponents = getNumComponents(array, arrayName);
            }
            attribs[attribName] = {
              buffer:        buffer,
              numComponents: numComponents,
              type:          type,
              normalize:     normalization,
              stride:        array.stride || 0,
              offset:        array.offset || 0,
              divisor:       array.divisor === undefined ? undefined : array.divisor,
              drawType:      array.drawType,
            };
          }
        }
      });
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      return attribs;
    }

    function getBytesPerValueForGLType(gl, type) {
      if (type === gl.BYTE)           return 1;  // eslint-disable-line
      if (type === gl.UNSIGNED_BYTE)  return 1;  // eslint-disable-line
      if (type === gl.SHORT)          return 2;  // eslint-disable-line
      if (type === gl.UNSIGNED_SHORT) return 2;  // eslint-disable-line
      if (type === gl.INT)            return 4;  // eslint-disable-line
      if (type === gl.UNSIGNED_INT)   return 4;  // eslint-disable-line
      if (type === gl.FLOAT)          return 4;  // eslint-disable-line
      return 0;
    }

    // Tries to get the number of elements from a set of arrays.
    const positionKeys = ['position', 'positions', 'a_position'];

    function getNumElementsFromAttributes(gl, attribs) {
      let key;
      let ii;
      for (ii = 0; ii < positionKeys.length; ++ii) {
        key = positionKeys[ii];
        if (key in attribs) {
          break;
        }
        key = defaults.attribPrefix + key;
        if (key in attribs) {
          break;
        }
      }
      if (ii === positionKeys.length) {
        key = Object.keys(attribs)[0];
      }
      const attrib = attribs[key];
      gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
      const numBytes = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
      const totalElements = numBytes / bytesPerValue;
      const numComponents = attrib.numComponents || attrib.size;
      // TODO: check stride
      const numElements = totalElements / numComponents;
      if (numElements % 1 !== 0) {
        throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
      }
      return numElements;
    }

    /**
     * @typedef {Object} BufferInfo
     * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
     * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
     * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
     * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
     * @memberOf module:twgl
     */

    /**
     * Creates a BufferInfo from an object of arrays.
     *
     * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
     * {@link module:twgl:drawBufferInfo}.
     *
     * Given an object like
     *
     *     var arrays = {
     *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
     *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
     *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
     *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
     *     };
     *
     *  Creates an BufferInfo like this
     *
     *     bufferInfo = {
     *       numElements: 4,        // or whatever the number of elements is
     *       indices: WebGLBuffer,  // this property will not exist if there are no indices
     *       attribs: {
     *         a_position: { buffer: WebGLBuffer, numComponents: 3, },
     *         a_normal:   { buffer: WebGLBuffer, numComponents: 3, },
     *         a_texcoord: { buffer: WebGLBuffer, numComponents: 2, },
     *       },
     *     };
     *
     *  The properties of arrays can be JavaScript arrays in which case the number of components
     *  will be guessed.
     *
     *     var arrays = {
     *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
     *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
     *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
     *        indices:  [0, 1, 2, 1, 2, 3],
     *     };
     *
     *  They can also by TypedArrays
     *
     *     var arrays = {
     *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
     *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
     *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
     *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
     *     };
     *
     *  Or augmentedTypedArrays
     *
     *     var positions = createAugmentedTypedArray(3, 4);
     *     var texcoords = createAugmentedTypedArray(2, 4);
     *     var normals   = createAugmentedTypedArray(3, 4);
     *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
     *
     *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
     *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
     *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
     *     indices.push([0, 1, 2, 1, 2, 3]);
     *
     *     var arrays = {
     *        position: positions,
     *        texcoord: texcoords,
     *        normal:   normals,
     *        indices:  indices,
     *     };
     *
     * For the last example it is equivalent to
     *
     *     var bufferInfo = {
     *       attribs: {
     *         a_position: { numComponents: 3, buffer: gl.createBuffer(), },
     *         a_texcoords: { numComponents: 2, buffer: gl.createBuffer(), },
     *         a_normals: { numComponents: 3, buffer: gl.createBuffer(), },
     *       },
     *       indices: gl.createBuffer(),
     *       numElements: 6,
     *     };
     *
     *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_position.buffer);
     *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
     *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_texcoord.buffer);
     *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
     *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_normal.buffer);
     *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
     *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
     *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @param {module:twgl.Arrays} arrays Your data
     * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
     *        buffer info to start from. WebGLBuffers etc specified
     *        in the srcBufferInfo will be used in a new BufferInfo
     *        with any arrays specified overriding the ones in
     *        srcBufferInfo.
     * @return {module:twgl.BufferInfo} A BufferInfo
     * @memberOf module:twgl/attributes
     */
    function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
      const newAttribs = createAttribsFromArrays(gl, arrays);
      const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
      bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
      const indices = arrays.indices;
      if (indices) {
        const newIndices = makeTypedArray(indices, "indices");
        bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, gl.ELEMENT_ARRAY_BUFFER);
        bufferInfo.numElements = newIndices.length;
        bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
      } else if (!bufferInfo.numElements) {
        bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
      }

      return bufferInfo;
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    /**
     * Gets the gl version as a number
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @return {number} version of gl
     * @private
     */
    //function getVersionAsNumber(gl) {
    //  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
    //}

    /**
     * Check if context is WebGL 2.0
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @return {bool} true if it's WebGL 2.0
     * @memberOf module:twgl
     */
    function isWebGL2(gl) {
      // This is the correct check but it's slow
      //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
      // This might also be the correct check but I'm assuming it's slow-ish
      // return gl instanceof WebGL2RenderingContext;
      return !!gl.texStorage2D;
    }

    /**
     * Gets a string for WebGL enum
     *
     * Note: Several enums are the same. Without more
     * context (which function) it's impossible to always
     * give the correct enum. As it is, for matching values
     * it gives all enums. Checking the WebGL2RenderingContext
     * that means
     *
     *      0     = ZERO | POINT | NONE | NO_ERROR
     *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
     *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
     *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
     *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
     *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
     *
     * It's also not useful for bits really unless you pass in individual bits.
     * In other words
     *
     *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
     *     twgl.glEnumToString(gl, bits);  // not going to work
     *
     * Note that some enums only exist on extensions. If you
     * want them to show up you need to pass the extension at least
     * once. For example
     *
     *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
     *     if (ext) {
     *        twgl.glEnumToString(ext, 0);  // just prime the function
     *
     *        ..later..
     *
     *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
     *        console.log(twgl.glEnumToString(gl, internalFormat));
     *
     * Notice I didn't have to pass the extension the second time. This means
     * you can have place that generically gets an enum for texture formats for example.
     * and as long as you primed the function with the extensions
     *
     * If you're using `twgl.addExtensionsToContext` to enable your extensions
     * then twgl will automatically get the extension's enums.
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
     * @param {number} value the value of the enum you want to look up.
     * @return {string} enum string or hex value
     * @memberOf module:twgl
     * @function glEnumToString
     */
    const glEnumToString = (function() {
      const haveEnumsForType = {};
      const enums = {};

      function addEnums(gl) {
        const type = gl.constructor.name;
        if (!haveEnumsForType[type]) {
          for (const key in gl) {
            if (typeof gl[key] === 'number') {
              const existing = enums[gl[key]];
              enums[gl[key]] = existing ? `${existing} | ${key}` : key;
            }
          }
          haveEnumsForType[type] = true;
        }
      }

      return function glEnumToString(gl, value) {
        addEnums(gl);
        return enums[value] || ("0x" + value.toString(16));
      };
    }());

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */
    const defaults$1 = {
      textureColor: new Uint8Array([128, 192, 255, 255]),
      textureOptions: {},
      crossOrigin: undefined,
    };
    const isArrayBuffer$1 = isArrayBuffer;

    // Should we make this on demand?
    const ctx = (typeof document !== 'undefined' && document.createElement)
        ? document.createElement("canvas").getContext("2d")
        : null;

    // NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
    //       not only does Firefox NOT support it but Firefox freezes immediately
    //       if you try to create one instead of just returning null and continuing.
    //  : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d

    // NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
    // we can use the various unpack settings. Otherwise we could try using
    // the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
    // is async and the current TWGL code expects a non-Async result though that
    // might not be a problem. ImageBitmap though is not available in Edge or Safari
    // as of 2018-01-02

    /* PixelFormat */
    const ALPHA                          = 0x1906;
    const RGB                            = 0x1907;
    const RGBA                           = 0x1908;
    const LUMINANCE                      = 0x1909;
    const LUMINANCE_ALPHA                = 0x190A;
    const DEPTH_COMPONENT                = 0x1902;
    const DEPTH_STENCIL                  = 0x84F9;

    const R8                           = 0x8229;
    const R8_SNORM                     = 0x8F94;
    const R16F                         = 0x822D;
    const R32F                         = 0x822E;
    const R8UI                         = 0x8232;
    const R8I                          = 0x8231;
    const RG16UI                       = 0x823A;
    const RG16I                        = 0x8239;
    const RG32UI                       = 0x823C;
    const RG32I                        = 0x823B;
    const RG8                          = 0x822B;
    const RG8_SNORM                    = 0x8F95;
    const RG16F                        = 0x822F;
    const RG32F                        = 0x8230;
    const RG8UI                        = 0x8238;
    const RG8I                         = 0x8237;
    const R16UI                        = 0x8234;
    const R16I                         = 0x8233;
    const R32UI                        = 0x8236;
    const R32I                         = 0x8235;
    const RGB8                         = 0x8051;
    const SRGB8                        = 0x8C41;
    const RGB565                       = 0x8D62;
    const RGB8_SNORM                   = 0x8F96;
    const R11F_G11F_B10F               = 0x8C3A;
    const RGB9_E5                      = 0x8C3D;
    const RGB16F                       = 0x881B;
    const RGB32F                       = 0x8815;
    const RGB8UI                       = 0x8D7D;
    const RGB8I                        = 0x8D8F;
    const RGB16UI                      = 0x8D77;
    const RGB16I                       = 0x8D89;
    const RGB32UI                      = 0x8D71;
    const RGB32I                       = 0x8D83;
    const RGBA8                        = 0x8058;
    const SRGB8_ALPHA8                 = 0x8C43;
    const RGBA8_SNORM                  = 0x8F97;
    const RGB5_A1                      = 0x8057;
    const RGBA4                        = 0x8056;
    const RGB10_A2                     = 0x8059;
    const RGBA16F                      = 0x881A;
    const RGBA32F                      = 0x8814;
    const RGBA8UI                      = 0x8D7C;
    const RGBA8I                       = 0x8D8E;
    const RGB10_A2UI                   = 0x906F;
    const RGBA16UI                     = 0x8D76;
    const RGBA16I                      = 0x8D88;
    const RGBA32I                      = 0x8D82;
    const RGBA32UI                     = 0x8D70;

    const DEPTH_COMPONENT16            = 0x81A5;
    const DEPTH_COMPONENT24            = 0x81A6;
    const DEPTH_COMPONENT32F           = 0x8CAC;
    const DEPTH32F_STENCIL8            = 0x8CAD;
    const DEPTH24_STENCIL8             = 0x88F0;

    /* DataType */
    const BYTE$1                         = 0x1400;
    const UNSIGNED_BYTE$1                = 0x1401;
    const SHORT$1                        = 0x1402;
    const UNSIGNED_SHORT$1               = 0x1403;
    const INT$1                          = 0x1404;
    const UNSIGNED_INT$1                 = 0x1405;
    const FLOAT$1                        = 0x1406;
    const UNSIGNED_SHORT_4_4_4_4$1       = 0x8033;
    const UNSIGNED_SHORT_5_5_5_1$1       = 0x8034;
    const UNSIGNED_SHORT_5_6_5$1         = 0x8363;
    const HALF_FLOAT$1                   = 0x140B;
    const HALF_FLOAT_OES               = 0x8D61;  // Thanks Khronos for making this different >:(
    const UNSIGNED_INT_2_10_10_10_REV$1  = 0x8368;
    const UNSIGNED_INT_10F_11F_11F_REV$1 = 0x8C3B;
    const UNSIGNED_INT_5_9_9_9_REV$1     = 0x8C3E;
    const FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 0x8DAD;
    const UNSIGNED_INT_24_8$1            = 0x84FA;

    const RG                           = 0x8227;
    const RG_INTEGER                   = 0x8228;
    const RED                          = 0x1903;
    const RED_INTEGER                  = 0x8D94;
    const RGB_INTEGER                  = 0x8D98;
    const RGBA_INTEGER                 = 0x8D99;

    /**
     * @typedef {Object} TextureFormatDetails
     * @property {number} textureFormat format to pass texImage2D and similar functions.
     * @property {boolean} colorRenderable true if you can render to this format of texture.
     * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
     * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
     * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
     * @private
     */

    const textureInternalFormatInfo = {};
    {
      // NOTE: these properties need unique names so we can let Uglify mangle the name.
      const t = textureInternalFormatInfo;
      // unsized formats
      t[ALPHA]              = { textureFormat: ALPHA,           colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1, 2, 2, 4],        type: [UNSIGNED_BYTE$1, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$1], };
      t[LUMINANCE]          = { textureFormat: LUMINANCE,       colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1, 2, 2, 4],        type: [UNSIGNED_BYTE$1, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$1], };
      t[LUMINANCE_ALPHA]    = { textureFormat: LUMINANCE_ALPHA, colorRenderable: true,  textureFilterable: true,  bytesPerElement: [2, 4, 4, 8],        type: [UNSIGNED_BYTE$1, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$1], };
      t[RGB]                = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3, 6, 6, 12, 2],    type: [UNSIGNED_BYTE$1, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$1, UNSIGNED_SHORT_5_6_5$1], };
      t[RGBA]               = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 8, 8, 16, 2, 2], type: [UNSIGNED_BYTE$1, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$1, UNSIGNED_SHORT_4_4_4_4$1, UNSIGNED_SHORT_5_5_5_1$1], };

      // sized formats
      t[R8]                 = { textureFormat: RED,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1],        type: [UNSIGNED_BYTE$1], };
      t[R8_SNORM]           = { textureFormat: RED,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [1],        type: [BYTE$1], };
      t[R16F]               = { textureFormat: RED,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [4, 2],     type: [FLOAT$1, HALF_FLOAT$1], };
      t[R32F]               = { textureFormat: RED,             colorRenderable: false, textureFilterable: false, bytesPerElement: [4],        type: [FLOAT$1], };
      t[R8UI]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [1],        type: [UNSIGNED_BYTE$1], };
      t[R8I]                = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [1],        type: [BYTE$1], };
      t[R16UI]              = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [UNSIGNED_SHORT$1], };
      t[R16I]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [SHORT$1], };
      t[R32UI]              = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT$1], };
      t[R32I]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [INT$1], };
      t[RG8]                = { textureFormat: RG,              colorRenderable: true,  textureFilterable: true,  bytesPerElement: [2],        type: [UNSIGNED_BYTE$1], };
      t[RG8_SNORM]          = { textureFormat: RG,              colorRenderable: false, textureFilterable: true,  bytesPerElement: [2],        type: [BYTE$1], };
      t[RG16F]              = { textureFormat: RG,              colorRenderable: false, textureFilterable: true,  bytesPerElement: [8, 4],     type: [FLOAT$1, HALF_FLOAT$1], };
      t[RG32F]              = { textureFormat: RG,              colorRenderable: false, textureFilterable: false, bytesPerElement: [8],        type: [FLOAT$1], };
      t[RG8UI]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [UNSIGNED_BYTE$1], };
      t[RG8I]               = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [BYTE$1], };
      t[RG16UI]             = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_SHORT$1], };
      t[RG16I]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [SHORT$1], };
      t[RG32UI]             = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [UNSIGNED_INT$1], };
      t[RG32I]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [INT$1], };
      t[RGB8]               = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3],        type: [UNSIGNED_BYTE$1], };
      t[SRGB8]              = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [3],        type: [UNSIGNED_BYTE$1], };
      t[RGB565]             = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3, 2],     type: [UNSIGNED_BYTE$1, UNSIGNED_SHORT_5_6_5$1], };
      t[RGB8_SNORM]         = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [3],        type: [BYTE$1], };
      t[R11F_G11F_B10F]     = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6, 4], type: [FLOAT$1, HALF_FLOAT$1, UNSIGNED_INT_10F_11F_11F_REV$1], };
      t[RGB9_E5]            = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6, 4], type: [FLOAT$1, HALF_FLOAT$1, UNSIGNED_INT_5_9_9_9_REV$1], };
      t[RGB16F]             = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6],    type: [FLOAT$1, HALF_FLOAT$1], };
      t[RGB32F]             = { textureFormat: RGB,             colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [FLOAT$1], };
      t[RGB8UI]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [3],        type: [UNSIGNED_BYTE$1], };
      t[RGB8I]              = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [3],        type: [BYTE$1], };
      t[RGB16UI]            = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [6],        type: [UNSIGNED_SHORT$1], };
      t[RGB16I]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [6],        type: [SHORT$1], };
      t[RGB32UI]            = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [UNSIGNED_INT$1], };
      t[RGB32I]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [INT$1], };
      t[RGBA8]              = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_BYTE$1], };
      t[SRGB8_ALPHA8]       = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_BYTE$1], };
      t[RGBA8_SNORM]        = { textureFormat: RGBA,            colorRenderable: false, textureFilterable: true,  bytesPerElement: [4],        type: [BYTE$1], };
      t[RGB5_A1]            = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 2, 4],  type: [UNSIGNED_BYTE$1, UNSIGNED_SHORT_5_5_5_1$1, UNSIGNED_INT_2_10_10_10_REV$1], };
      t[RGBA4]              = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 2],     type: [UNSIGNED_BYTE$1, UNSIGNED_SHORT_4_4_4_4$1], };
      t[RGB10_A2]           = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_INT_2_10_10_10_REV$1], };
      t[RGBA16F]            = { textureFormat: RGBA,            colorRenderable: false, textureFilterable: true,  bytesPerElement: [16, 8],    type: [FLOAT$1, HALF_FLOAT$1], };
      t[RGBA32F]            = { textureFormat: RGBA,            colorRenderable: false, textureFilterable: false, bytesPerElement: [16],       type: [FLOAT$1], };
      t[RGBA8UI]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_BYTE$1], };
      t[RGBA8I]             = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [BYTE$1], };
      t[RGB10_A2UI]         = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT_2_10_10_10_REV$1], };
      t[RGBA16UI]           = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [UNSIGNED_SHORT$1], };
      t[RGBA16I]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [SHORT$1], };
      t[RGBA32I]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [16],       type: [INT$1], };
      t[RGBA32UI]           = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [16],       type: [UNSIGNED_INT$1], };
      // Sized Internal
      t[DEPTH_COMPONENT16]  = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [2, 4],     type: [UNSIGNED_SHORT$1, UNSIGNED_INT$1], };
      t[DEPTH_COMPONENT24]  = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT$1], };
      t[DEPTH_COMPONENT32F] = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [FLOAT$1], };
      t[DEPTH24_STENCIL8]   = { textureFormat: DEPTH_STENCIL,   colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT_24_8$1], };
      t[DEPTH32F_STENCIL8]  = { textureFormat: DEPTH_STENCIL,   colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [FLOAT_32_UNSIGNED_INT_24_8_REV$1], };

      Object.keys(t).forEach(function(internalFormat) {
        const info = t[internalFormat];
        info.bytesPerElementMap = {};
        info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
          const type = info.type[ndx];
          info.bytesPerElementMap[type] = bytesPerElement;
        });
      });
    }

    /**
     * Gets the number of bytes per element for a given internalFormat / type
     * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
     * @param {number} type The type parameter for texImage2D etc..
     * @return {number} the number of bytes per element for the given internalFormat, type combo
     * @memberOf module:twgl/textures
     */
    function getBytesPerElementForInternalFormat(internalFormat, type) {
      const info = textureInternalFormatInfo[internalFormat];
      if (!info) {
        throw "unknown internal format";
      }
      const bytesPerElement = info.bytesPerElementMap[type];
      if (bytesPerElement === undefined) {
        throw "unknown internal format";
      }
      return bytesPerElement;
    }

    /**
     * Info related to a specific texture internalFormat as returned
     * from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
     *
     * @typedef {Object} TextureFormatInfo
     * @property {number} format Format to pass to texImage2D and related functions
     * @property {number} type Type to pass to texImage2D and related functions
     * @memberOf module:twgl/textures
     */

    /**
     * Gets the format and type for a given internalFormat
     *
     * @param {number} internalFormat The internal format
     * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
     * @memberOf module:twgl/textures
     */
    function getFormatAndTypeForInternalFormat(internalFormat) {
      const info = textureInternalFormatInfo[internalFormat];
      if (!info) {
        throw "unknown internal format";
      }
      return {
        format: info.textureFormat,
        type: info.type[0],
      };
    }

    /**
     * Returns true if value is power of 2
     * @param {number} value number to check.
     * @return true if value is power of 2
     * @private
     */
    function isPowerOf2(value) {
      return (value & (value - 1)) === 0;
    }

    /**
     * Gets whether or not we can generate mips for the given
     * internal format.
     *
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {number} width The width parameter from texImage2D etc..
     * @param {number} height The height parameter from texImage2D etc..
     * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
     * @return {boolean} true if we can generate mips
     * @memberOf module:twgl/textures
     */
    function canGenerateMipmap(gl, width, height, internalFormat /*, type */) {
      if (!isWebGL2(gl)) {
        return isPowerOf2(width) && isPowerOf2(height);
      }
      const info = textureInternalFormatInfo[internalFormat];
      if (!info) {
        throw "unknown internal format";
      }
      return info.colorRenderable && info.textureFilterable;
    }

    /**
     * Gets whether or not we can generate mips for the given format
     * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
     * @return {boolean} true if we can generate mips
     * @memberOf module:twgl/textures
     */
    function canFilter(internalFormat /*, type */) {
      const info = textureInternalFormatInfo[internalFormat];
      if (!info) {
        throw "unknown internal format";
      }
      return info.textureFilterable;
    }

    /**
     * Gets the texture type for a given array type.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @return {number} the gl texture type
     * @private
     */
    function getTextureTypeForArrayType(gl, src, defaultType) {
      if (isArrayBuffer$1(src)) {
        return getGLTypeForTypedArray(src);
      }
      return defaultType || gl.UNSIGNED_BYTE;
    }

    function guessDimensions(gl, target, width, height, numElements) {
      if (numElements % 1 !== 0) {
        throw "can't guess dimensions";
      }
      if (!width && !height) {
        const size = Math.sqrt(numElements / (target === gl.TEXTURE_CUBE_MAP ? 6 : 1));
        if (size % 1 === 0) {
          width = size;
          height = size;
        } else {
          width = numElements;
          height = 1;
        }
      } else if (!height) {
        height = numElements / width;
        if (height % 1) {
          throw "can't guess dimensions";
        }
      } else if (!width) {
        width = numElements / height;
        if (width % 1) {
          throw "can't guess dimensions";
        }
      }
      return {
        width: width,
        height: height,
      };
    }

    /**
     * A function to generate the source for a texture.
     * @callback TextureFunc
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @param {module:twgl.TextureOptions} options the texture options
     * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
     * @memberOf module:twgl
     */

    /**
     * Texture options passed to most texture functions. Each function will use whatever options
     * are appropriate for its needs. This lets you pass the same options to all functions.
     *
     * Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
     * `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
     *
     * @typedef {Object} TextureOptions
     * @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
     * @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
     * @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
     * @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
     * @property {number} [depth] the depth of a texture. Only used if src is an array or type array or null and target is `TEXTURE_3D` .
     * @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
     *     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
     * @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
     * @property {number} [minMag] both the min and mag filter settings.
     * @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
     * @property {number} [format] format for texture. Defaults to `gl.RGBA`.
     * @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
     *     is ArrayBufferView defaults to type that matches ArrayBufferView type.
     * @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
     * @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
     * @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
     * @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
     * @property {number} [minLod] TEXTURE_MIN_LOD setting
     * @property {number} [maxLod] TEXTURE_MAX_LOD setting
     * @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
     * @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
     * @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
     * @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
     *     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
     *     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
     * @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
     *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
     *     the current setting for specific textures.
     * @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
     *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
     *     the current setting for specific textures.
     * @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
     *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
     *     the current setting for specific textures.
     * @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
     *    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
     *    then then `auto` is assumed to be `false` unless explicity set to `true`.
     * @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
     *
     *     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
     *      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
     *      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
     *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
     *      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
     *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
     *
     * @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
     *
     *    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
     *    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
     *    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
     *    The pieces will be uploaded in `cubeFaceOrder`
     *
     *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
     *
     *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
     *    and will be scaled to the specified width and height OR to the size of the first image that loads.
     *
     *    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
     *    `HTMLCanvasElement`, `HTMLVideoElement`.
     *
     *    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture. If `width` or `height` is
     *    not specified it is guessed as follows. First the number of elements is computed by `src.length / numComponents`
     *    where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
     *    by 6. Then
     *
     *    *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
     *        are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
     *
     *    *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
     *
     * If `number[]` will be converted to `type`.
     *
     * If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
     * Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
     * an array etc...
     *
     * If `src` is undefined then an empty texture will be created of size `width` by `height`.
     *
     * @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
     *    default: undefined. Also see {@link module:twgl.setDefaults}.
     *
     * @memberOf module:twgl
     */

    // NOTE: While querying GL is considered slow it's not remotely as slow
    // as uploading a texture. On top of that you're unlikely to call this in
    // a perf critical loop. Even if upload a texture every frame that's unlikely
    // to be more than 1 or 2 textures a frame. In other words, the benefits of
    // making the API easy to use outweigh any supposed perf benefits
    //
    // Also note I get that having one global of these is bad practice.
    // As long as it's used correctly it means no garbage which probably
    // doesn't matter when dealing with textures but old habits die hard.
    const lastPackState = {};

    /**
     * Saves any packing state that will be set based on the options.
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @private
     */
    function savePackState(gl, options) {
      if (options.colorspaceConversion !== undefined) {
        lastPackState.colorspaceConversion = gl.getParameter(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
      }
      if (options.premultiplyAlpha !== undefined) {
        lastPackState.premultiplyAlpha = gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
      }
      if (options.flipY !== undefined) {
        lastPackState.flipY = gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, options.flipY);
      }
    }

    /**
     * Restores any packing state that was set based on the options.
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @private
     */
    function restorePackState(gl, options) {
      if (options.colorspaceConversion !== undefined) {
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, lastPackState.colorspaceConversion);
      }
      if (options.premultiplyAlpha !== undefined) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, lastPackState.premultiplyAlpha);
      }
      if (options.flipY !== undefined) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, lastPackState.flipY);
      }
    }

    /**
     * Saves state related to data size
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @private
     */
    function saveSkipState(gl) {
      lastPackState.unpackAlignment   = gl.getParameter(gl.UNPACK_ALIGNMENT);
      if (isWebGL2(gl)) {
        lastPackState.unpackRowLength   = gl.getParameter(gl.UNPACK_ROW_LENGTH);
        lastPackState.unpackImageHeight = gl.getParameter(gl.UNPACK_IMAGE_HEIGHT);
        lastPackState.unpackSkipPixels  = gl.getParameter(gl.UNPACK_SKIP_PIXELS);
        lastPackState.unpackSkipRows    = gl.getParameter(gl.UNPACK_SKIP_ROWS);
        lastPackState.unpackSkipImages  = gl.getParameter(gl.UNPACK_SKIP_IMAGES);
      }
    }

    /**
     * Restores state related to data size
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @private
     */
    function restoreSkipState(gl) {
      gl.pixelStorei(gl.UNPACK_ALIGNMENT,    lastPackState.unpackAlignment);
      if (isWebGL2(gl)) {
        gl.pixelStorei(gl.UNPACK_ROW_LENGTH,   lastPackState.unpackRowLength);
        gl.pixelStorei(gl.UNPACK_IMAGE_HEIGHT, lastPackState.unpackImageHeight);
        gl.pixelStorei(gl.UNPACK_SKIP_PIXELS,  lastPackState.unpackSkipPixels);
        gl.pixelStorei(gl.UNPACK_SKIP_ROWS,    lastPackState.unpackSkipRows);
        gl.pixelStorei(gl.UNPACK_SKIP_IMAGES,  lastPackState.unpackSkipImages);
      }
    }


    /**
     * Sets the parameters of a texture or sampler
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {number|WebGLSampler} target texture target or sampler
     * @param {function()} parameteriFn texParameteri or samplerParameteri fn
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @private
     */
    function setTextureSamplerParameters(gl, target, parameteriFn, options) {
      if (options.minMag) {
        parameteriFn.call(gl, target, gl.TEXTURE_MIN_FILTER, options.minMag);
        parameteriFn.call(gl, target, gl.TEXTURE_MAG_FILTER, options.minMag);
      }
      if (options.min) {
        parameteriFn.call(gl, target, gl.TEXTURE_MIN_FILTER, options.min);
      }
      if (options.mag) {
        parameteriFn.call(gl, target, gl.TEXTURE_MAG_FILTER, options.mag);
      }
      if (options.wrap) {
        parameteriFn.call(gl, target, gl.TEXTURE_WRAP_S, options.wrap);
        parameteriFn.call(gl, target, gl.TEXTURE_WRAP_T, options.wrap);
        if (target === gl.TEXTURE_3D || isSampler(gl, target)) {
          parameteriFn.call(gl, target, gl.TEXTURE_WRAP_R, options.wrap);
        }
      }
      if (options.wrapR) {
        parameteriFn.call(gl, target, gl.TEXTURE_WRAP_R, options.wrapR);
      }
      if (options.wrapS) {
        parameteriFn.call(gl, target, gl.TEXTURE_WRAP_S, options.wrapS);
      }
      if (options.wrapT) {
        parameteriFn.call(gl, target, gl.TEXTURE_WRAP_T, options.wrapT);
      }
      if (options.minLod) {
        parameteriFn.call(gl, target, gl.TEXTURE_MIN_LOD, options.minLod);
      }
      if (options.maxLod) {
        parameteriFn.call(gl, target, gl.TEXTURE_MAX_LOD, options.maxLod);
      }
      if (options.baseLevel) {
        parameteriFn.call(gl, target, gl.TEXTURE_BASE_LEVEL, options.baseLevel);
      }
      if (options.maxLevel) {
        parameteriFn.call(gl, target, gl.TEXTURE_MAX_LEVEL, options.maxLevel);
      }
    }

    /**
     * Sets the texture parameters of a texture.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @memberOf module:twgl/textures
     */
    function setTextureParameters(gl, tex, options) {
      const target = options.target || gl.TEXTURE_2D;
      gl.bindTexture(target, tex);
      setTextureSamplerParameters(gl, target, gl.texParameteri, options);
    }

    /**
     * Makes a 1x1 pixel
     * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
     * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
     * @return {Uint8Array} Unit8Array with color.
     * @private
     */
    function make1Pixel(color) {
      color = color || defaults$1.textureColor;
      if (isArrayBuffer$1(color)) {
        return color;
      }
      return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
    }

    /**
     * Sets filtering or generates mips for texture based on width or height
     * If width or height is not passed in uses `options.width` and//or `options.height`
     *
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @param {number} [width] width of texture
     * @param {number} [height] height of texture
     * @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
     * @param {number} [type] The type parameter for texImage2D etc..
     * @memberOf module:twgl/textures
     */
    function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat, type) {
      options = options || defaults$1.textureOptions;
      internalFormat = internalFormat || gl.RGBA;
      type = type || gl.UNSIGNED_BYTE;
      const target = options.target || gl.TEXTURE_2D;
      width = width || options.width;
      height = height || options.height;
      gl.bindTexture(target, tex);
      if (canGenerateMipmap(gl, width, height, internalFormat)) {
        gl.generateMipmap(target);
      } else {
        const filtering = canFilter(internalFormat) ? gl.LINEAR : gl.NEAREST;
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, filtering);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
    }

    function shouldAutomaticallySetTextureFilteringForSize(options) {
      return options.auto === true || (options.auto === undefined && options.level === undefined);
    }

    /**
     * Gets an array of cubemap face enums
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @return {number[]} cubemap face enums
     * @private
     */
    function getCubeFaceOrder(gl, options) {
      options = options || {};
      return options.cubeFaceOrder || [
          gl.TEXTURE_CUBE_MAP_POSITIVE_X,
          gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
          gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
          gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
          gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
          gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        ];
    }

    /**
     * @typedef {Object} FaceInfo
     * @property {number} face gl enum for texImage2D
     * @property {number} ndx face index (0 - 5) into source data
     * @ignore
     */

    /**
     * Gets an array of FaceInfos
     * There's a bug in some NVidia drivers that will crash the driver if
     * `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
     * the user's desired order from his faces to WebGL and make sure we
     * do the faces in WebGL order
     *
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     * @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
     *    it's needed internally to sort the array of `ndx` properties by `face`.
     * @private
     */
    function getCubeFacesWithNdx(gl, options) {
      const faces = getCubeFaceOrder(gl, options);
      // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
      const facesWithNdx = faces.map(function(face, ndx) {
        return { face: face, ndx: ndx };
      });
      facesWithNdx.sort(function(a, b) {
        return a.face - b.face;
      });
      return facesWithNdx;
    }

    /**
     * Set a texture from the contents of an element. Will also set
     * texture filtering or generate mips based on the dimensions of the element
     * unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
     * attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {HTMLElement} element a canvas, img, or video element.
     * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @memberOf module:twgl/textures
     * @kind function
     */
    function setTextureFromElement(gl, tex, element, options) {
      options = options || defaults$1.textureOptions;
      const target = options.target || gl.TEXTURE_2D;
      const level = options.level || 0;
      let width = element.width;
      let height = element.height;
      const internalFormat = options.internalFormat || options.format || gl.RGBA;
      const formatType = getFormatAndTypeForInternalFormat(internalFormat);
      const format = options.format || formatType.format;
      const type = options.type || formatType.type;
      savePackState(gl, options);
      gl.bindTexture(target, tex);
      if (target === gl.TEXTURE_CUBE_MAP) {
        // guess the parts
        const imgWidth  = element.width;
        const imgHeight = element.height;
        let size;
        let slices;
        if (imgWidth / 6 === imgHeight) {
          // It's 6x1
          size = imgHeight;
          slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
        } else if (imgHeight / 6 === imgWidth) {
          // It's 1x6
          size = imgWidth;
          slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
        } else if (imgWidth / 3 === imgHeight / 2) {
          // It's 3x2
          size = imgWidth / 3;
          slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
        } else if (imgWidth / 2 === imgHeight / 3) {
          // It's 2x3
          size = imgWidth / 2;
          slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
        } else {
          throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
        }
        if (ctx) {
          ctx.canvas.width = size;
          ctx.canvas.height = size;
          width = size;
          height = size;
          getCubeFacesWithNdx(gl, options).forEach(function(f) {
            const xOffset = slices[f.ndx * 2 + 0] * size;
            const yOffset = slices[f.ndx * 2 + 1] * size;
            ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
            gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
          });
          // Free up the canvas memory
          ctx.canvas.width = 1;
          ctx.canvas.height = 1;
        } else if (typeof createImageBitmap !== 'undefined') {
          // NOTE: It seems like we should prefer ImageBitmap because unlike canvas it's
          // note lossy? (alpha is not premultiplied? although I'm not sure what
          width = size;
          height = size;
          getCubeFacesWithNdx(gl, options).forEach(function(f) {
            const xOffset = slices[f.ndx * 2 + 0] * size;
            const yOffset = slices[f.ndx * 2 + 1] * size;
            // We can't easily use a default texture color here as it would have to match
            // the type across all faces where as with a 2D one there's only one face
            // so we're replacing everything all at once. It also has to be the correct size.
            // On the other hand we need all faces to be the same size so as one face loads
            // the rest match else the texture will be un-renderable.
            gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
            createImageBitmap(element, xOffset, yOffset, size, size, {
              premultiplyAlpha: 'none',
              colorSpaceConversion: 'none',
            })
            .then(function(imageBitmap) {
              savePackState(gl, options);
              gl.bindTexture(target, tex);
              gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
              restorePackState(gl, options);
              if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                setTextureFilteringForSize(gl, tex, options, width, height, internalFormat, type);
              }
            });
          });
        }
      } else if (target === gl.TEXTURE_3D || target === gl.TEXTURE_2D_ARRAY) {
        const smallest = Math.min(element.width, element.height);
        const largest = Math.max(element.width, element.height);
        const depth = largest / smallest;
        if (depth % 1 !== 0) {
          throw "can not compute 3D dimensions of element";
        }
        const xMult = element.width  === largest ? 1 : 0;
        const yMult = element.height === largest ? 1 : 0;
        saveSkipState(gl);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.pixelStorei(gl.UNPACK_ROW_LENGTH, element.width);
        gl.pixelStorei(gl.UNPACK_IMAGE_HEIGHT, 0);
        gl.pixelStorei(gl.UNPACK_SKIP_IMAGES, 0);
        gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
        for (let d = 0; d < depth; ++d) {
          const srcX = d * smallest * xMult;
          const srcY = d * smallest * yMult;
          gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, srcX);
          gl.pixelStorei(gl.UNPACK_SKIP_ROWS, srcY);
          gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
        }
        restoreSkipState(gl);
      } else {
        gl.texImage2D(target, level, internalFormat, format, type, element);
      }
      restorePackState(gl, options);
      if (shouldAutomaticallySetTextureFilteringForSize(options)) {
        setTextureFilteringForSize(gl, tex, options, width, height, internalFormat, type);
      }
      setTextureParameters(gl, tex, options);
    }

    function noop() {
    }

    /**
     * Checks whether the url's origin is the same so that we can set the `crossOrigin`
     * @param {string} url url to image
     * @returns {boolean} true if the window's origin is the same as image's url
     * @private
     */
    function urlIsSameOrigin(url) {
      if (typeof document !== 'undefined') {
        // for IE really
        const a = document.createElement('a');
        a.href = url;
        return a.hostname === location.hostname &&
               a.port     === location.port &&
               a.protocol === location.protocol;
      } else {
        const localOrigin = (new URL(location.href)).origin;
        const urlOrigin = (new URL(url, location.href)).origin;
        return urlOrigin === localOrigin;
      }
    }

    function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
      return crossOrigin === undefined && !urlIsSameOrigin(url)
         ? 'anonymous'
         : crossOrigin;
    }

    /**
     * Loads an image
     * @param {string} url url to image
     * @param {string} crossOrigin
     * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
     *     if there was an error
     * @return {HTMLImageElement} the image being loaded.
     * @private
     */
    function loadImage(url, crossOrigin, callback) {
      callback = callback || noop;
      let img;
      crossOrigin = crossOrigin !== undefined ? crossOrigin : defaults$1.crossOrigin;
      crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
      if (typeof Image !== 'undefined') {
        img = new Image();
        if (crossOrigin !== undefined) {
          img.crossOrigin = crossOrigin;
        }

        const clearEventHandlers = function clearEventHandlers() {
          img.removeEventListener('error', onError);  // eslint-disable-line
          img.removeEventListener('load', onLoad);  // eslint-disable-line
          img = null;
        };

        const onError = function onError() {
          const msg = "couldn't load image: " + url;
          error(msg);
          callback(msg, img);
          clearEventHandlers();
        };

        const onLoad = function onLoad() {
          callback(null, img);
          clearEventHandlers();
        };

        img.addEventListener('error', onError);
        img.addEventListener('load', onLoad);
        img.src = url;
        return img;
      } else if (typeof ImageBitmap !== 'undefined') {
        let err;
        let bm;
        const cb = function cb() {
          callback(err, bm);
        };

        const options = {};
        if (crossOrigin) {
          options.mode = 'cors'; // TODO: not sure how to translate image.crossOrigin
        }
        fetch(url, options).then(function(response) {
          if (!response.ok) {
            throw response;
          }
          return response.blob();
        }).then(function(blob) {
          return createImageBitmap(blob, {
            premultiplyAlpha: 'none',
            colorSpaceConversion: 'none',
          });
        }).then(function(bitmap) {
          // not sure if this works. We don't want
          // to catch the user's error. So, call
          // the callback in a timeout so we're
          // not in this scope inside the promise.
          bm = bitmap;
          setTimeout(cb);
        }).catch(function(e) {
          err = e;
          setTimeout(cb);
        });
        img = null;
      }
      return img;
    }

    /**
     * check if object is a TexImageSource
     *
     * @param {Object} obj Object to test
     * @return {boolean} true if object is a TexImageSource
     * @private
     */
    function isTexImageSource(obj) {
      return (typeof ImageBitmap !== 'undefined' && obj instanceof ImageBitmap) ||
             (typeof ImageData !== 'undefined'  && obj instanceof ImageData) ||
             (typeof HTMLElement !== 'undefined'  && obj instanceof HTMLElement);
    }

    /**
     * if obj is an TexImageSource then just
     * uses it otherwise if obj is a string
     * then load it first.
     *
     * @param {string|TexImageSource} obj
     * @param {string} crossOrigin
     * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
     *     if there was an error
     * @private
     */
    function loadAndUseImage(obj, crossOrigin, callback) {
      if (isTexImageSource(obj)) {
        setTimeout(function() {
          callback(null, obj);
        });
        return obj;
      }

      return loadImage(obj, crossOrigin, callback);
    }

    /**
     * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
     * the default texture color is used which can be set by calling `setDefaultTextureColor`.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @memberOf module:twgl/textures
     */
    function setTextureTo1PixelColor(gl, tex, options) {
      options = options || defaults$1.textureOptions;
      const target = options.target || gl.TEXTURE_2D;
      gl.bindTexture(target, tex);
      if (options.color === false) {
        return;
      }
      // Assume it's a URL
      // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
      const color = make1Pixel(options.color);
      if (target === gl.TEXTURE_CUBE_MAP) {
        for (let ii = 0; ii < 6; ++ii) {
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
        }
      } else if (target === gl.TEXTURE_3D || target === gl.TEXTURE_2D_ARRAY) {
        gl.texImage3D(target, 0, gl.RGBA, 1, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
      } else {
        gl.texImage2D(target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, color);
      }
    }

    /**
     * The src image(s) used to create a texture.
     *
     * When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
     * you can pass in urls for images to load into the textures. If it's a single url
     * then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
     * this will be a corresponding array of images for the cubemap.
     *
     * @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
     * @memberOf module:twgl
     */

    /**
     * A callback for when an image finished downloading and been uploaded into a texture
     * @callback TextureReadyCallback
     * @param {*} err If truthy there was an error.
     * @param {WebGLTexture} texture the texture.
     * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
     * @memberOf module:twgl
     */

    /**
     * A callback for when all images have finished downloading and been uploaded into their respective textures
     * @callback TexturesReadyCallback
     * @param {*} err If truthy there was an error.
     * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
     * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
     * @memberOf module:twgl
     */

    /**
     * A callback for when an image finished downloading and been uploaded into a texture
     * @callback CubemapReadyCallback
     * @param {*} err If truthy there was an error.
     * @param {WebGLTexture} tex the texture.
     * @param {HTMLImageElement[]} imgs the images for each face.
     * @memberOf module:twgl
     */

    /**
     * A callback for when an image finished downloading and been uploaded into a texture
     * @callback ThreeDReadyCallback
     * @param {*} err If truthy there was an error.
     * @param {WebGLTexture} tex the texture.
     * @param {HTMLImageElement[]} imgs the images for each slice.
     * @memberOf module:twgl
     */

    /**
     * Loads a texture from an image from a Url as specified in `options.src`
     * If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
     * immediately useable. It will be updated with the contents of the image once the image has finished
     * downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
     * @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
     *    be non null if there was an error.
     * @return {HTMLImageElement} the image being downloaded.
     * @memberOf module:twgl/textures
     */
    function loadTextureFromUrl(gl, tex, options, callback) {
      callback = callback || noop;
      options = options || defaults$1.textureOptions;
      setTextureTo1PixelColor(gl, tex, options);
      // Because it's async we need to copy the options.
      options = Object.assign({}, options);
      const img = loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
        if (err) {
          callback(err, tex, img);
        } else {
          setTextureFromElement(gl, tex, img, options);
          callback(null, tex, img);
        }
      });
      return img;
    }

    /**
     * Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
     * so that it is usable immediately unless `option.color === false`.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     * @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
     *    be non null if there was an error.
     * @memberOf module:twgl/textures
     */
    function loadCubemapFromUrls(gl, tex, options, callback) {
      callback = callback || noop;
      const urls = options.src;
      if (urls.length !== 6) {
        throw "there must be 6 urls for a cubemap";
      }
      const level = options.level || 0;
      const internalFormat = options.internalFormat || options.format || gl.RGBA;
      const formatType = getFormatAndTypeForInternalFormat(internalFormat);
      const format = options.format || formatType.format;
      const type = options.type || gl.UNSIGNED_BYTE;
      const target = options.target || gl.TEXTURE_2D;
      if (target !== gl.TEXTURE_CUBE_MAP) {
        throw "target must be TEXTURE_CUBE_MAP";
      }
      setTextureTo1PixelColor(gl, tex, options);
      // Because it's async we need to copy the options.
      options = Object.assign({}, options);
      let numToLoad = 6;
      const errors = [];
      const faces = getCubeFaceOrder(gl, options);
      let imgs;  // eslint-disable-line

      function uploadImg(faceTarget) {
        return function(err, img) {
          --numToLoad;
          if (err) {
            errors.push(err);
          } else {
            if (img.width !== img.height) {
              errors.push("cubemap face img is not a square: " + img.src);
            } else {
              savePackState(gl, options);
              gl.bindTexture(target, tex);

              // So assuming this is the first image we now have one face that's img sized
              // and 5 faces that are 1x1 pixel so size the other faces
              if (numToLoad === 5) {
                // use the default order
                getCubeFaceOrder(gl).forEach(function(otherTarget) {
                  // Should we re-use the same face or a color?
                  gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
                });
              } else {
                gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
              }

              restorePackState(gl, options);
              if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                gl.generateMipmap(target);
              }
            }
          }

          if (numToLoad === 0) {
            callback(errors.length ? errors : undefined, tex, imgs);
          }
        };
      }

      imgs = urls.map(function(url, ndx) {
        return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
      });
    }

    /**
     * Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
     * Will set the texture to a 1x1 pixel color
     * so that it is usable immediately unless `option.color === false`.
     *
     * If the width and height is not specified the width and height of the first
     * image loaded will be used. Note that since images are loaded async
     * which image downloads first is unknown.
     *
     * If an image is not the same size as the width and height it will be scaled
     * to that width and height.
     *
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     * @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
     *    be non null if there was an error.
     * @memberOf module:twgl/textures
     */
    function loadSlicesFromUrls(gl, tex, options, callback) {
      callback = callback || noop;
      const urls = options.src;
      const internalFormat = options.internalFormat || options.format || gl.RGBA;
      const formatType = getFormatAndTypeForInternalFormat(internalFormat);
      const format = options.format || formatType.format;
      const type = options.type || gl.UNSIGNED_BYTE;
      const target = options.target || gl.TEXTURE_2D_ARRAY;
      if (target !== gl.TEXTURE_3D && target !== gl.TEXTURE_2D_ARRAY) {
        throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
      }
      setTextureTo1PixelColor(gl, tex, options);
      // Because it's async we need to copy the options.
      options = Object.assign({}, options);
      let numToLoad = urls.length;
      const errors = [];
      let imgs;  // eslint-disable-line
      const level = options.level || 0;
      let width = options.width;
      let height = options.height;
      const depth = urls.length;
      let firstImage = true;

      function uploadImg(slice) {
        return function(err, img) {
          --numToLoad;
          if (err) {
            errors.push(err);
          } else {
            savePackState(gl, options);
            gl.bindTexture(target, tex);

            if (firstImage) {
              firstImage = false;
              width = options.width || img.width;
              height = options.height || img.height;
              gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);

              // put it in every slice otherwise some slices will be 0,0,0,0
              for (let s = 0; s < depth; ++s) {
                gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
              }
            } else {
              let src = img;
              if (img.width !== width || img.height !== height) {
                // Size the image to fix
                src = ctx.canvas;
                ctx.canvas.width = width;
                ctx.canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
              }

              gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);

              // free the canvas memory
              if (src === ctx.canvas) {
                ctx.canvas.width = 0;
                ctx.canvas.height = 0;
              }
            }

            restorePackState(gl, options);
            if (shouldAutomaticallySetTextureFilteringForSize(options)) {
              gl.generateMipmap(target);
            }
          }

          if (numToLoad === 0) {
            callback(errors.length ? errors : undefined, tex, imgs);
          }
        };
      }

      imgs = urls.map(function(url, ndx) {
        return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
      });
    }

    /**
     * Sets a texture from an array or typed array. If the width or height is not provided will attempt to
     * guess the size. See {@link module:twgl.TextureOptions}.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
     * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
     *   This is often the same options you passed in when you created the texture.
     * @memberOf module:twgl/textures
     */
    function setTextureFromArray(gl, tex, src, options) {
      options = options || defaults$1.textureOptions;
      const target = options.target || gl.TEXTURE_2D;
      gl.bindTexture(target, tex);
      let width = options.width;
      let height = options.height;
      let depth = options.depth;
      const level = options.level || 0;
      const internalFormat = options.internalFormat || options.format || gl.RGBA;
      const formatType = getFormatAndTypeForInternalFormat(internalFormat);
      const format = options.format || formatType.format;
      const type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
      if (!isArrayBuffer$1(src)) {
        const Type = getTypedArrayTypeForGLType(type);
        src = new Type(src);
      } else if (src instanceof Uint8ClampedArray) {
        src = new Uint8Array(src.buffer);
      }

      const bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
      const numElements = src.byteLength / bytesPerElement;  // TODO: check UNPACK_ALIGNMENT?
      if (numElements % 1) {
        throw "length wrong size for format: " + glEnumToString(gl, format);
      }
      let dimensions;
      if (target === gl.TEXTURE_3D) {
        if (!width && !height && !depth) {
          const size = Math.cbrt(numElements);
          if (size % 1 !== 0) {
            throw "can't guess cube size of array of numElements: " + numElements;
          }
          width = size;
          height = size;
          depth = size;
        } else if (width && (!height || !depth)) {
          dimensions = guessDimensions(gl, target, height, depth, numElements / width);
          height = dimensions.width;
          depth = dimensions.height;
        } else if (height && (!width || !depth)) {
          dimensions = guessDimensions(gl, target, width, depth, numElements / height);
          width = dimensions.width;
          depth = dimensions.height;
        } else {
          dimensions = guessDimensions(gl, target, width, height, numElements / depth);
          width = dimensions.width;
          height = dimensions.height;
        }
      } else {
        dimensions = guessDimensions(gl, target, width, height, numElements);
        width = dimensions.width;
        height = dimensions.height;
      }
      saveSkipState(gl);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, options.unpackAlignment || 1);
      savePackState(gl, options);
      if (target === gl.TEXTURE_CUBE_MAP) {
        const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
        const faceSize = numElements / 6 * elementsPerElement;

        getCubeFacesWithNdx(gl, options).forEach(f => {
          const offset = faceSize * f.ndx;
          const data = src.subarray(offset, offset + faceSize);
          gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
        });
      } else if (target === gl.TEXTURE_3D) {
        gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
      } else {
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
      }
      restorePackState(gl, options);
      restoreSkipState(gl);
      return {
        width: width,
        height: height,
        depth: depth,
        type: type,
      };
    }

    /**
     * Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
     * You must set `options.width` and `options.height`.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {WebGLTexture} tex the WebGLTexture to set parameters for
     * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
     * @memberOf module:twgl/textures
     */
    function setEmptyTexture(gl, tex, options) {
      const target = options.target || gl.TEXTURE_2D;
      gl.bindTexture(target, tex);
      const level = options.level || 0;
      const internalFormat = options.internalFormat || options.format || gl.RGBA;
      const formatType = getFormatAndTypeForInternalFormat(internalFormat);
      const format = options.format || formatType.format;
      const type = options.type || formatType.type;
      savePackState(gl, options);
      if (target === gl.TEXTURE_CUBE_MAP) {
        for (let ii = 0; ii < 6; ++ii) {
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
        }
      } else if (target === gl.TEXTURE_3D) {
        gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
      } else {
        gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
      }
      restorePackState(gl, options);
    }

    /**
     * Creates a texture based on the options passed in.
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
     * @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
     * @return {WebGLTexture} the created texture.
     * @memberOf module:twgl/textures
     */
    function createTexture(gl, options, callback) {
      callback = callback || noop;
      options = options || defaults$1.textureOptions;
      const tex = gl.createTexture();
      const target = options.target || gl.TEXTURE_2D;
      let width  = options.width  || 1;
      let height = options.height || 1;
      const internalFormat = options.internalFormat || gl.RGBA;
      const formatType = getFormatAndTypeForInternalFormat(internalFormat);
      let type = options.type || formatType.type;
      gl.bindTexture(target, tex);
      if (target === gl.TEXTURE_CUBE_MAP) {
        // this should have been the default for cubemaps :(
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
      let src = options.src;
      if (src) {
        if (typeof src === "function") {
          src = src(gl, options);
        }
        if (typeof (src) === "string") {
          loadTextureFromUrl(gl, tex, options, callback);
        } else if (isArrayBuffer$1(src) ||
                   (Array.isArray(src) && (
                        typeof src[0] === 'number' ||
                        Array.isArray(src[0]) ||
                        isArrayBuffer$1(src[0]))
                   )
                  ) {
          const dimensions = setTextureFromArray(gl, tex, src, options);
          width  = dimensions.width;
          height = dimensions.height;
          type   = dimensions.type;
        } else if (Array.isArray(src) && (typeof (src[0]) === 'string' || isTexImageSource(src[0]))) {
          if (target === gl.TEXTURE_CUBE_MAP) {
            loadCubemapFromUrls(gl, tex, options, callback);
          } else {
            loadSlicesFromUrls(gl, tex, options, callback);
          }
        } else if (isTexImageSource(src)) {
          setTextureFromElement(gl, tex, src, options);
          width  = src.width;
          height = src.height;
        } else {
          throw "unsupported src type";
        }
      } else {
        setEmptyTexture(gl, tex, options);
      }
      if (shouldAutomaticallySetTextureFilteringForSize(options)) {
        setTextureFilteringForSize(gl, tex, options, width, height, internalFormat, type);
      }
      setTextureParameters(gl, tex, options);
      return tex;
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    /**
     * Low level shader program related functions
     *
     * You should generally not need to use these functions. They are provided
     * for those cases where you're doing something out of the ordinary
     * and you need lower level access.
     *
     * For backward compatibility they are available at both `twgl.programs` and `twgl`
     * itself
     *
     * See {@link module:twgl} for core functions
     *
     * @module twgl/programs
     */

    const error$1 = error;
    const getElementById = (typeof document !== 'undefined' && document.getElementById)
      ? document.getElementById.bind(document)
      : function() {
        return null;
    };

    const FLOAT$2                         = 0x1406;
    const FLOAT_VEC2                    = 0x8B50;
    const FLOAT_VEC3                    = 0x8B51;
    const FLOAT_VEC4                    = 0x8B52;
    const INT$2                           = 0x1404;
    const INT_VEC2                      = 0x8B53;
    const INT_VEC3                      = 0x8B54;
    const INT_VEC4                      = 0x8B55;
    const BOOL                          = 0x8B56;
    const BOOL_VEC2                     = 0x8B57;
    const BOOL_VEC3                     = 0x8B58;
    const BOOL_VEC4                     = 0x8B59;
    const FLOAT_MAT2                    = 0x8B5A;
    const FLOAT_MAT3                    = 0x8B5B;
    const FLOAT_MAT4                    = 0x8B5C;
    const SAMPLER_2D                    = 0x8B5E;
    const SAMPLER_CUBE                  = 0x8B60;
    const SAMPLER_3D                    = 0x8B5F;
    const SAMPLER_2D_SHADOW             = 0x8B62;
    const FLOAT_MAT2x3                  = 0x8B65;
    const FLOAT_MAT2x4                  = 0x8B66;
    const FLOAT_MAT3x2                  = 0x8B67;
    const FLOAT_MAT3x4                  = 0x8B68;
    const FLOAT_MAT4x2                  = 0x8B69;
    const FLOAT_MAT4x3                  = 0x8B6A;
    const SAMPLER_2D_ARRAY              = 0x8DC1;
    const SAMPLER_2D_ARRAY_SHADOW       = 0x8DC4;
    const SAMPLER_CUBE_SHADOW           = 0x8DC5;
    const UNSIGNED_INT$2                  = 0x1405;
    const UNSIGNED_INT_VEC2             = 0x8DC6;
    const UNSIGNED_INT_VEC3             = 0x8DC7;
    const UNSIGNED_INT_VEC4             = 0x8DC8;
    const INT_SAMPLER_2D                = 0x8DCA;
    const INT_SAMPLER_3D                = 0x8DCB;
    const INT_SAMPLER_CUBE              = 0x8DCC;
    const INT_SAMPLER_2D_ARRAY          = 0x8DCF;
    const UNSIGNED_INT_SAMPLER_2D       = 0x8DD2;
    const UNSIGNED_INT_SAMPLER_3D       = 0x8DD3;
    const UNSIGNED_INT_SAMPLER_CUBE     = 0x8DD4;
    const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;

    const TEXTURE_2D                    = 0x0DE1;
    const TEXTURE_CUBE_MAP              = 0x8513;
    const TEXTURE_3D                    = 0x806F;
    const TEXTURE_2D_ARRAY              = 0x8C1A;

    const typeMap = {};

    /**
     * Returns the corresponding bind point for a given sampler type
     */
    function getBindPointForSamplerType(gl, type) {
      return typeMap[type].bindPoint;
    }

    // This kind of sucks! If you could compose functions as in `var fn = gl[name];`
    // this code could be a lot smaller but that is sadly really slow (T_T)

    function floatSetter(gl, location) {
      return function(v) {
        gl.uniform1f(location, v);
      };
    }

    function floatArraySetter(gl, location) {
      return function(v) {
        gl.uniform1fv(location, v);
      };
    }

    function floatVec2Setter(gl, location) {
      return function(v) {
        gl.uniform2fv(location, v);
      };
    }

    function floatVec3Setter(gl, location) {
      return function(v) {
        gl.uniform3fv(location, v);
      };
    }

    function floatVec4Setter(gl, location) {
      return function(v) {
        gl.uniform4fv(location, v);
      };
    }

    function intSetter(gl, location) {
      return function(v) {
        gl.uniform1i(location, v);
      };
    }

    function intArraySetter(gl, location) {
      return function(v) {
        gl.uniform1iv(location, v);
      };
    }

    function intVec2Setter(gl, location) {
      return function(v) {
        gl.uniform2iv(location, v);
      };
    }

    function intVec3Setter(gl, location) {
      return function(v) {
        gl.uniform3iv(location, v);
      };
    }

    function intVec4Setter(gl, location) {
      return function(v) {
        gl.uniform4iv(location, v);
      };
    }

    function uintSetter(gl, location) {
      return function(v) {
        gl.uniform1ui(location, v);
      };
    }

    function uintArraySetter(gl, location) {
      return function(v) {
        gl.uniform1uiv(location, v);
      };
    }

    function uintVec2Setter(gl, location) {
      return function(v) {
        gl.uniform2uiv(location, v);
      };
    }

    function uintVec3Setter(gl, location) {
      return function(v) {
        gl.uniform3uiv(location, v);
      };
    }

    function uintVec4Setter(gl, location) {
      return function(v) {
        gl.uniform4uiv(location, v);
      };
    }

    function floatMat2Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix2fv(location, false, v);
      };
    }

    function floatMat3Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix3fv(location, false, v);
      };
    }

    function floatMat4Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix4fv(location, false, v);
      };
    }

    function floatMat23Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix2x3fv(location, false, v);
      };
    }

    function floatMat32Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix3x2fv(location, false, v);
      };
    }

    function floatMat24Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix2x4fv(location, false, v);
      };
    }

    function floatMat42Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix4x2fv(location, false, v);
      };
    }

    function floatMat34Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix3x4fv(location, false, v);
      };
    }

    function floatMat43Setter(gl, location) {
      return function(v) {
        gl.uniformMatrix4x3fv(location, false, v);
      };
    }

    function samplerSetter(gl, type, unit, location) {
      const bindPoint = getBindPointForSamplerType(gl, type);
      return isWebGL2(gl) ? function(textureOrPair) {
        let texture;
        let sampler;
        if (isTexture(gl, textureOrPair)) {
          texture = textureOrPair;
          sampler = null;
        } else {
          texture = textureOrPair.texture;
          sampler = textureOrPair.sampler;
        }
        gl.uniform1i(location, unit);
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
        gl.bindSampler(unit, sampler);
      } : function(texture) {
        gl.uniform1i(location, unit);
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
      };
    }

    function samplerArraySetter(gl, type, unit, location, size) {
      const bindPoint = getBindPointForSamplerType(gl, type);
      const units = new Int32Array(size);
      for (let ii = 0; ii < size; ++ii) {
        units[ii] = unit + ii;
      }

      return isWebGL2(gl) ? function(textures) {
        gl.uniform1iv(location, units);
        textures.forEach(function(textureOrPair, index) {
          gl.activeTexture(gl.TEXTURE0 + units[index]);
          let texture;
          let sampler;
          if (isTexture(gl, textureOrPair)) {
            texture = textureOrPair;
            sampler = null;
          } else {
            texture = textureOrPair.texture;
            sampler = textureOrPair.sampler;
          }
          gl.bindSampler(unit, sampler);
          gl.bindTexture(bindPoint, texture);
        });
      } : function(textures) {
        gl.uniform1iv(location, units);
        textures.forEach(function(texture, index) {
          gl.activeTexture(gl.TEXTURE0 + units[index]);
          gl.bindTexture(bindPoint, texture);
        });
      };
    }

    typeMap[FLOAT$2]                         = { Type: Float32Array, size:  4, setter: floatSetter,      arraySetter: floatArraySetter, };
    typeMap[FLOAT_VEC2]                    = { Type: Float32Array, size:  8, setter: floatVec2Setter,  };
    typeMap[FLOAT_VEC3]                    = { Type: Float32Array, size: 12, setter: floatVec3Setter,  };
    typeMap[FLOAT_VEC4]                    = { Type: Float32Array, size: 16, setter: floatVec4Setter,  };
    typeMap[INT$2]                           = { Type: Int32Array,   size:  4, setter: intSetter,        arraySetter: intArraySetter, };
    typeMap[INT_VEC2]                      = { Type: Int32Array,   size:  8, setter: intVec2Setter,    };
    typeMap[INT_VEC3]                      = { Type: Int32Array,   size: 12, setter: intVec3Setter,    };
    typeMap[INT_VEC4]                      = { Type: Int32Array,   size: 16, setter: intVec4Setter,    };
    typeMap[UNSIGNED_INT$2]                  = { Type: Uint32Array,  size:  4, setter: uintSetter,       arraySetter: uintArraySetter, };
    typeMap[UNSIGNED_INT_VEC2]             = { Type: Uint32Array,  size:  8, setter: uintVec2Setter,   };
    typeMap[UNSIGNED_INT_VEC3]             = { Type: Uint32Array,  size: 12, setter: uintVec3Setter,   };
    typeMap[UNSIGNED_INT_VEC4]             = { Type: Uint32Array,  size: 16, setter: uintVec4Setter,   };
    typeMap[BOOL]                          = { Type: Uint32Array,  size:  4, setter: intSetter,        arraySetter: intArraySetter, };
    typeMap[BOOL_VEC2]                     = { Type: Uint32Array,  size:  8, setter: intVec2Setter,    };
    typeMap[BOOL_VEC3]                     = { Type: Uint32Array,  size: 12, setter: intVec3Setter,    };
    typeMap[BOOL_VEC4]                     = { Type: Uint32Array,  size: 16, setter: intVec4Setter,    };
    typeMap[FLOAT_MAT2]                    = { Type: Float32Array, size: 16, setter: floatMat2Setter,  };
    typeMap[FLOAT_MAT3]                    = { Type: Float32Array, size: 36, setter: floatMat3Setter,  };
    typeMap[FLOAT_MAT4]                    = { Type: Float32Array, size: 64, setter: floatMat4Setter,  };
    typeMap[FLOAT_MAT2x3]                  = { Type: Float32Array, size: 24, setter: floatMat23Setter, };
    typeMap[FLOAT_MAT2x4]                  = { Type: Float32Array, size: 32, setter: floatMat24Setter, };
    typeMap[FLOAT_MAT3x2]                  = { Type: Float32Array, size: 24, setter: floatMat32Setter, };
    typeMap[FLOAT_MAT3x4]                  = { Type: Float32Array, size: 48, setter: floatMat34Setter, };
    typeMap[FLOAT_MAT4x2]                  = { Type: Float32Array, size: 32, setter: floatMat42Setter, };
    typeMap[FLOAT_MAT4x3]                  = { Type: Float32Array, size: 48, setter: floatMat43Setter, };
    typeMap[SAMPLER_2D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D,       };
    typeMap[SAMPLER_CUBE]                  = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
    typeMap[SAMPLER_3D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D,       };
    typeMap[SAMPLER_2D_SHADOW]             = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D,       };
    typeMap[SAMPLER_2D_ARRAY]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };
    typeMap[SAMPLER_2D_ARRAY_SHADOW]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };
    typeMap[SAMPLER_CUBE_SHADOW]           = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
    typeMap[INT_SAMPLER_2D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D,       };
    typeMap[INT_SAMPLER_3D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D,       };
    typeMap[INT_SAMPLER_CUBE]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
    typeMap[INT_SAMPLER_2D_ARRAY]          = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };
    typeMap[UNSIGNED_INT_SAMPLER_2D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D,       };
    typeMap[UNSIGNED_INT_SAMPLER_3D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D,       };
    typeMap[UNSIGNED_INT_SAMPLER_CUBE]     = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
    typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };

    function floatAttribSetter(gl, index) {
      return function(b) {
        if (b.value) {
          gl.disableVertexAttribArray(index);
          switch (b.value.length) {
            case 4:
              gl.vertexAttrib4fv(index, b.value);
              break;
            case 3:
              gl.vertexAttrib3fv(index, b.value);
              break;
            case 2:
              gl.vertexAttrib2fv(index, b.value);
              break;
            case 1:
              gl.vertexAttrib1fv(index, b.value);
              break;
            default:
              throw new Error('the length of a float constant value must be between 1 and 4!');
          }
        } else {
          gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
          gl.enableVertexAttribArray(index);
          gl.vertexAttribPointer(
              index, b.numComponents || b.size, b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
          if (b.divisor !== undefined) {
            gl.vertexAttribDivisor(index, b.divisor);
          }
        }
      };
    }

    function intAttribSetter(gl, index) {
      return function(b) {
        if (b.value) {
          gl.disableVertexAttribArray(index);
          if (b.value.length === 4) {
            gl.vertexAttrib4iv(index, b.value);
          } else {
            throw new Error('The length of an integer constant value must be 4!');
          }
        } else {
          gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
          gl.enableVertexAttribArray(index);
          gl.vertexAttribIPointer(
              index, b.numComponents || b.size, b.type || gl.INT, b.stride || 0, b.offset || 0);
          if (b.divisor !== undefined) {
            gl.vertexAttribDivisor(index, b.divisor);
          }
        }
      };
    }

    function uintAttribSetter(gl, index) {
      return function(b) {
        if (b.value) {
          gl.disableVertexAttribArray(index);
          if (b.value.length === 4) {
            gl.vertexAttrib4uiv(index, b.value);
          } else {
            throw new Error('The length of an unsigned integer constant value must be 4!');
          }
        } else {
          gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
          gl.enableVertexAttribArray(index);
          gl.vertexAttribIPointer(
              index, b.numComponents || b.size, b.type || gl.UNSIGNED_INT, b.stride || 0, b.offset || 0);
          if (b.divisor !== undefined) {
            gl.vertexAttribDivisor(index, b.divisor);
          }
        }
      };
    }

    function matAttribSetter(gl, index, typeInfo) {
      const defaultSize = typeInfo.size;
      const count = typeInfo.count;

      return function(b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        const numComponents = b.size || b.numComponents || defaultSize;
        const size = numComponents / count;
        const type = b.type || gl.FLOAT;
        const typeInfo = typeMap[type];
        const stride = typeInfo.size * numComponents;
        const normalize = b.normalize || false;
        const offset = b.offset || 0;
        const rowOffset = stride / count;
        for (let i = 0; i < count; ++i) {
          gl.enableVertexAttribArray(index + i);
          gl.vertexAttribPointer(
              index + i, size, type, normalize, stride, offset + rowOffset * i);
          if (b.divisor !== undefined) {
            gl.vertexAttribDivisor(index + i, b.divisor);
          }
        }
      };
    }



    const attrTypeMap = {};
    attrTypeMap[FLOAT$2]             = { size:  4, setter: floatAttribSetter, };
    attrTypeMap[FLOAT_VEC2]        = { size:  8, setter: floatAttribSetter, };
    attrTypeMap[FLOAT_VEC3]        = { size: 12, setter: floatAttribSetter, };
    attrTypeMap[FLOAT_VEC4]        = { size: 16, setter: floatAttribSetter, };
    attrTypeMap[INT$2]               = { size:  4, setter: intAttribSetter,   };
    attrTypeMap[INT_VEC2]          = { size:  8, setter: intAttribSetter,   };
    attrTypeMap[INT_VEC3]          = { size: 12, setter: intAttribSetter,   };
    attrTypeMap[INT_VEC4]          = { size: 16, setter: intAttribSetter,   };
    attrTypeMap[UNSIGNED_INT$2]      = { size:  4, setter: uintAttribSetter,  };
    attrTypeMap[UNSIGNED_INT_VEC2] = { size:  8, setter: uintAttribSetter,  };
    attrTypeMap[UNSIGNED_INT_VEC3] = { size: 12, setter: uintAttribSetter,  };
    attrTypeMap[UNSIGNED_INT_VEC4] = { size: 16, setter: uintAttribSetter,  };
    attrTypeMap[BOOL]              = { size:  4, setter: intAttribSetter,   };
    attrTypeMap[BOOL_VEC2]         = { size:  8, setter: intAttribSetter,   };
    attrTypeMap[BOOL_VEC3]         = { size: 12, setter: intAttribSetter,   };
    attrTypeMap[BOOL_VEC4]         = { size: 16, setter: intAttribSetter,   };
    attrTypeMap[FLOAT_MAT2]        = { size:  4, setter: matAttribSetter,   count: 2, };
    attrTypeMap[FLOAT_MAT3]        = { size:  9, setter: matAttribSetter,   count: 3, };
    attrTypeMap[FLOAT_MAT4]        = { size: 16, setter: matAttribSetter,   count: 4, };

    /**
     * Error Callback
     * @callback ErrorCallback
     * @param {string} msg error message.
     * @param {number} [lineOffset] amount to add to line number
     * @memberOf module:twgl
     */

    function addLineNumbers(src, lineOffset) {
      lineOffset = lineOffset || 0;
      ++lineOffset;

      return src.split("\n").map(function(line, ndx) {
        return (ndx + lineOffset) + ": " + line;
      }).join("\n");
    }

    const spaceRE = /^[ \t]*\n/;

    /**
     * Loads a shader.
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
     * @param {string} shaderSource The shader source.
     * @param {number} shaderType The type of shader.
     * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
     * @return {WebGLShader} The created shader.
     * @private
     */
    function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
      const errFn = opt_errorCallback || error$1;
      // Create the shader object
      const shader = gl.createShader(shaderType);

      // Remove the first end of line because WebGL 2.0 requires
      // #version 300 es
      // as the first line. No whitespace allowed before that line
      // so
      //
      // <script>
      // #version 300 es
      // </script>
      //
      // Has one line before it which is invalid according to GLSL ES 3.00
      //
      let lineOffset = 0;
      if (spaceRE.test(shaderSource)) {
        lineOffset = 1;
        shaderSource = shaderSource.replace(spaceRE, '');
      }

      // Load the shader source
      gl.shaderSource(shader, shaderSource);

      // Compile the shader
      gl.compileShader(shader);

      // Check the compile status
      const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        errFn(addLineNumbers(shaderSource, lineOffset) + "\n*** Error compiling shader: " + lastError);
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    /**
     * @typedef {Object} ProgramOptions
     * @property {function(string)} [errorCallback] callback for errors
     * @property {Object.<string,number>} [attribLocations] a attribute name to location map
     * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
     *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
     *   you can pass an array of names.
     * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
     * @memberOf module:twgl
     */

    /**
     * Gets the program options based on all these optional arguments
     * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
     * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
     * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
     *        on error. If you want something else pass an callback. It's passed an error message.
     * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
     * @private
     */
    function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
      let transformFeedbackVaryings;
      if (typeof opt_locations === 'function') {
        opt_errorCallback = opt_locations;
        opt_locations = undefined;
      }
      if (typeof opt_attribs === 'function') {
        opt_errorCallback = opt_attribs;
        opt_attribs = undefined;
      } else if (opt_attribs && !Array.isArray(opt_attribs)) {
        // If we have an errorCallback we can just return this object
        // Otherwise we need to construct one with default errorCallback
        if (opt_attribs.errorCallback) {
          return opt_attribs;
        }
        const opt = opt_attribs;
        opt_errorCallback = opt.errorCallback;
        opt_attribs = opt.attribLocations;
        transformFeedbackVaryings = opt.transformFeedbackVaryings;
      }

      const options = {
        errorCallback: opt_errorCallback || error$1,
        transformFeedbackVaryings: transformFeedbackVaryings,
      };

      if (opt_attribs) {
        let attribLocations = {};
        if (Array.isArray(opt_attribs)) {
          opt_attribs.forEach(function(attrib,  ndx) {
            attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
          });
        } else {
          attribLocations = opt_attribs;
        }
        options.attribLocations = attribLocations;
      }

      return options;
    }

    const defaultShaderType = [
      "VERTEX_SHADER",
      "FRAGMENT_SHADER",
    ];

    function getShaderTypeFromScriptType(gl, scriptType) {
      if (scriptType.indexOf("frag") >= 0) {
        return gl.FRAGMENT_SHADER;
      } else if (scriptType.indexOf("vert") >= 0) {
        return gl.VERTEX_SHADER;
      }
      return undefined;
    }

    function deleteShaders(gl, shaders) {
      shaders.forEach(function(shader) {
        gl.deleteShader(shader);
      });
    }

    /**
     * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
     * program and calls useProgram.
     *
     * NOTE: There are 4 signatures for this function
     *
     *     twgl.createProgram(gl, [vs, fs], options);
     *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
     *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
     *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
     *
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
     * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
     * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
     * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
     * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
     *        on error. If you want something else pass an callback. It's passed an error message.
     * @return {WebGLProgram?} the created program or null if error.
     * @memberOf module:twgl/programs
     */
    function createProgram(
        gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
      const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
      const realShaders = [];
      const newShaders = [];
      for (let ndx = 0; ndx < shaders.length; ++ndx) {
        let shader = shaders[ndx];
        if (typeof (shader) === 'string') {
          const elem = getElementById(shader);
          const src = elem ? elem.text : shader;
          let type = gl[defaultShaderType[ndx]];
          if (elem && elem.type) {
            type = getShaderTypeFromScriptType(gl, elem.type) || type;
          }
          shader = loadShader(gl, src, type, progOptions.errorCallback);
          newShaders.push(shader);
        }
        if (isShader(gl, shader)) {
          realShaders.push(shader);
        }
      }

      if (realShaders.length !== shaders.length) {
        progOptions.errorCallback("not enough shaders for program");
        deleteShaders(gl, newShaders);
        return null;
      }

      const program = gl.createProgram();
      realShaders.forEach(function(shader) {
        gl.attachShader(program, shader);
      });
      if (progOptions.attribLocations) {
        Object.keys(progOptions.attribLocations).forEach(function(attrib) {
          gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
        });
      }
      let varyings = progOptions.transformFeedbackVaryings;
      if (varyings) {
        if (varyings.attribs) {
          varyings = varyings.attribs;
        }
        if (!Array.isArray(varyings)) {
          varyings = Object.keys(varyings);
        }
        gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || gl.SEPARATE_ATTRIBS);
      }
      gl.linkProgram(program);

      // Check the link status
      const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        progOptions.errorCallback("Error in program linking:" + lastError);

        gl.deleteProgram(program);
        deleteShaders(gl, newShaders);
        return null;
      }
      return program;
    }

    /**
     * Creates a program from 2 sources.
     *
     * NOTE: There are 4 signatures for this function
     *
     *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
     *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
     *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
     *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
     *
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext
     *        to use.
     * @param {string[]} shaderSources Array of sources for the
     *        shaders. The first is assumed to be the vertex shader,
     *        the second the fragment shader.
     * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
     * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
     * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
     *        on error. If you want something else pass an callback. It's passed an error message.
     * @return {WebGLProgram?} the created program or null if error.
     * @memberOf module:twgl/programs
     */
    function createProgramFromSources(
        gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
      const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
      const shaders = [];
      for (let ii = 0; ii < shaderSources.length; ++ii) {
        const shader = loadShader(
            gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
        if (!shader) {
          return null;
        }
        shaders.push(shader);
      }
      return createProgram(gl, shaders, progOptions);
    }

    /**
     * Returns true if attribute/uniform is a reserved/built in
     *
     * It makes no sense to me why GL returns these because it's
     * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
     * with names that start with `gl_` (and `webgl_` in WebGL)
     *
     * I can only assume they are there because they might count
     * when computing the number of uniforms/attributes used when you want to
     * know if you are near the limit. That doesn't really make sense
     * to me but the fact that these get returned are in the spec.
     *
     * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
     *    `gl.getActiveAttrib`.
     * @return {bool} true if it's reserved
     * @private
     */
    function isBuiltIn(info) {
      const name = info.name;
      return name.startsWith("gl_") || name.startsWith("webgl_");
    }

    /**
     * Creates setter functions for all uniforms of a shader
     * program.
     *
     * @see {@link module:twgl.setUniforms}
     *
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
     * @param {WebGLProgram} program the program to create setters for.
     * @returns {Object.<string, function>} an object with a setter by name for each uniform
     * @memberOf module:twgl/programs
     */
    function createUniformSetters(gl, program) {
      let textureUnit = 0;

      /**
       * Creates a setter for a uniform of the given program with it's
       * location embedded in the setter.
       * @param {WebGLProgram} program
       * @param {WebGLUniformInfo} uniformInfo
       * @returns {function} the created setter.
       */
      function createUniformSetter(program, uniformInfo) {
        const location = gl.getUniformLocation(program, uniformInfo.name);
        const isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]");
        const type = uniformInfo.type;
        const typeInfo = typeMap[type];
        if (!typeInfo) {
          throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
        }
        let setter;
        if (typeInfo.bindPoint) {
          // it's a sampler
          const unit = textureUnit;
          textureUnit += uniformInfo.size;
          if (isArray) {
            setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
          } else {
            setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
          }
        } else {
          if (typeInfo.arraySetter && isArray) {
            setter = typeInfo.arraySetter(gl, location);
          } else {
            setter = typeInfo.setter(gl, location);
          }
        }
        setter.location = location;
        return setter;
      }

      const uniformSetters = { };
      const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

      for (let ii = 0; ii < numUniforms; ++ii) {
        const uniformInfo = gl.getActiveUniform(program, ii);
        if (isBuiltIn(uniformInfo)) {
            continue;
        }
        let name = uniformInfo.name;
        // remove the array suffix.
        if (name.substr(-3) === "[0]") {
          name = name.substr(0, name.length - 3);
        }
        const setter = createUniformSetter(program, uniformInfo);
        uniformSetters[name] = setter;
      }
      return uniformSetters;
    }

    /**
     * @typedef {Object} TransformFeedbackInfo
     * @property {number} index index of transform feedback
     * @property {number} type GL type
     * @property {number} size 1 - 4
     * @memberOf module:twgl
     */

    /**
     * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
     * @param {WebGLProgram} program an existing WebGLProgram.
     * @return {Object<string, module:twgl.TransformFeedbackInfo>}
     * @memberOf module:twgl
     */
    function createTransformFeedbackInfo(gl, program) {
      const info = {};
      const numVaryings = gl.getProgramParameter(program, gl.TRANSFORM_FEEDBACK_VARYINGS);
      for (let ii = 0; ii < numVaryings; ++ii) {
        const varying = gl.getTransformFeedbackVarying(program, ii);
        info[varying.name] = {
          index: ii,
          type: varying.type,
          size: varying.size,
        };
      }
      return info;
    }

    /**
     * @typedef {Object} UniformData
     * @property {number} type The WebGL type enum for this uniform
     * @property {number} size The number of elements for this uniform
     * @property {number} blockNdx The block index this uniform appears in
     * @property {number} offset The byte offset in the block for this uniform's value
     * @memberOf module:twgl
     */

    /**
     * The specification for one UniformBlockObject
     *
     * @typedef {Object} BlockSpec
     * @property {number} index The index of the block.
     * @property {number} size The size in bytes needed for the block
     * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
     *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
     * @property {bool} usedByVertexShader Self explanatory
     * @property {bool} usedByFragmentShader Self explanatory
     * @property {bool} used Self explanatory
     * @memberOf module:twgl
     */

    /**
     * A `UniformBlockSpec` represents the data needed to create and bind
     * UniformBlockObjects for a given program
     *
     * @typedef {Object} UniformBlockSpec
     * @property {Object.<string, module:twgl.BlockSpec> blockSpecs The BlockSpec for each block by block name
     * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
     * @memberOf module:twgl
     */

    /**
     * Creates a UniformBlockSpec for the given program.
     *
     * A UniformBlockSpec represents the data needed to create and bind
     * UniformBlockObjects
     *
     * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
     * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
     * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
     * @memberOf module:twgl/programs
     */
    function createUniformBlockSpecFromProgram(gl, program) {
      const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      const uniformData = [];
      const uniformIndices = [];

      for (let ii = 0; ii < numUniforms; ++ii) {
        uniformIndices.push(ii);
        uniformData.push({});
        const uniformInfo = gl.getActiveUniform(program, ii);
        if (isBuiltIn(uniformInfo)) {
          break;
        }
        // REMOVE [0]?
        uniformData[ii].name = uniformInfo.name;
      }

      [
        [ "UNIFORM_TYPE", "type" ],
        [ "UNIFORM_SIZE", "size" ],  // num elements
        [ "UNIFORM_BLOCK_INDEX", "blockNdx" ],
        [ "UNIFORM_OFFSET", "offset", ],
      ].forEach(function(pair) {
        const pname = pair[0];
        const key = pair[1];
        gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
          uniformData[ndx][key] = value;
        });
      });

      const blockSpecs = {};

      const numUniformBlocks = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);
      for (let ii = 0; ii < numUniformBlocks; ++ii) {
        const name = gl.getActiveUniformBlockName(program, ii);
        const blockSpec = {
          index: ii,
          usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, gl.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
          usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, gl.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
          size: gl.getActiveUniformBlockParameter(program, ii, gl.UNIFORM_BLOCK_DATA_SIZE),
          uniformIndices: gl.getActiveUniformBlockParameter(program, ii, gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),
        };
        blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
        blockSpecs[name] = blockSpec;
      }

      return {
        blockSpecs: blockSpecs,
        uniformData: uniformData,
      };
    }

    /**
     * Set uniforms and binds related textures.
     *
     * example:
     *
     *     const programInfo = createProgramInfo(
     *         gl, ["some-vs", "some-fs"]);
     *
     *     const tex1 = gl.createTexture();
     *     const tex2 = gl.createTexture();
     *
     *     ... assume we setup the textures with data ...
     *
     *     const uniforms = {
     *       u_someSampler: tex1,
     *       u_someOtherSampler: tex2,
     *       u_someColor: [1,0,0,1],
     *       u_somePosition: [0,1,1],
     *       u_someMatrix: [
     *         1,0,0,0,
     *         0,1,0,0,
     *         0,0,1,0,
     *         0,0,0,0,
     *       ],
     *     };
     *
     *     gl.useProgram(program);
     *
     * This will automatically bind the textures AND set the
     * uniforms.
     *
     *     twgl.setUniforms(programInfo, uniforms);
     *
     * For the example above it is equivalent to
     *
     *     var texUnit = 0;
     *     gl.activeTexture(gl.TEXTURE0 + texUnit);
     *     gl.bindTexture(gl.TEXTURE_2D, tex1);
     *     gl.uniform1i(u_someSamplerLocation, texUnit++);
     *     gl.activeTexture(gl.TEXTURE0 + texUnit);
     *     gl.bindTexture(gl.TEXTURE_2D, tex2);
     *     gl.uniform1i(u_someSamplerLocation, texUnit++);
     *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
     *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
     *     gl.uniformMatrix4fv(u_someMatrix, false, [
     *         1,0,0,0,
     *         0,1,0,0,
     *         0,0,1,0,
     *         0,0,0,0,
     *       ]);
     *
     * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
     *
     *     const uniforms = {
     *       u_someSampler: tex1,
     *       u_someOtherSampler: tex2,
     *     };
     *
     *     const moreUniforms {
     *       u_someColor: [1,0,0,1],
     *       u_somePosition: [0,1,1],
     *       u_someMatrix: [
     *         1,0,0,0,
     *         0,1,0,0,
     *         0,0,1,0,
     *         0,0,0,0,
     *       ],
     *     };
     *
     *     twgl.setUniforms(programInfo, uniforms);
     *     twgl.setUniforms(programInfo, moreUniforms);
     *
     * You can also add WebGLSamplers to uniform samplers as in
     *
     *     const uniforms = {
     *       u_someSampler: {
     *         texture: someWebGLTexture,
     *         sampler: someWebGLSampler,
     *       },
     *     };
     *
     * In which case both the sampler and texture will be bound to the
     * same unit.
     *
     * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
     *        `createUniformSetters`.
     * @param {Object.<string, ?>} values an object with values for the
     *        uniforms.
     *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
     *
     *     const sharedUniforms = {
     *       u_fogNear: 10,
     *       u_projection: ...
     *       ...
     *     };
     *
     *     const localUniforms = {
     *       u_world: ...
     *       u_diffuseColor: ...
     *     };
     *
     *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
     *
     *     // is the same as
     *
     *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
     *
     *     // is the same as
     *
     *     twgl.setUniforms(programInfo, sharedUniforms);
     *     twgl.setUniforms(programInfo, localUniforms};
     *
     * @memberOf module:twgl/programs
     */
    function setUniforms(setters, values) {  // eslint-disable-line
      const actualSetters = setters.uniformSetters || setters;
      const numArgs = arguments.length;
      for (let aNdx = 1; aNdx < numArgs; ++aNdx) {
        const values = arguments[aNdx];
        if (Array.isArray(values)) {
          const numValues = values.length;
          for (let ii = 0; ii < numValues; ++ii) {
            setUniforms(actualSetters, values[ii]);
          }
        } else {
          for (const name in values) {
            const setter = actualSetters[name];
            if (setter) {
              setter(values[name]);
            }
          }
        }
      }
    }

    /**
     * Creates setter functions for all attributes of a shader
     * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
     *
     * @see {@link module:twgl.setAttributes} for example
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
     * @param {WebGLProgram} program the program to create setters for.
     * @return {Object.<string, function>} an object with a setter for each attribute by name.
     * @memberOf module:twgl/programs
     */
    function createAttributeSetters(gl, program) {
      const attribSetters = {
      };

      const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
      for (let ii = 0; ii < numAttribs; ++ii) {
        const attribInfo = gl.getActiveAttrib(program, ii);
        if (isBuiltIn(attribInfo)) {
            continue;
        }
        const index = gl.getAttribLocation(program, attribInfo.name);
        const typeInfo = attrTypeMap[attribInfo.type];
        const setter = typeInfo.setter(gl, index, typeInfo);
        setter.location = index;
        attribSetters[attribInfo.name] = setter;
      }

      return attribSetters;
    }

    /**
     * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
     *
     * Example:
     *
     *     const program = createProgramFromScripts(
     *         gl, ["some-vs", "some-fs");
     *
     *     const attribSetters = createAttributeSetters(program);
     *
     *     const positionBuffer = gl.createBuffer();
     *     const texcoordBuffer = gl.createBuffer();
     *
     *     const attribs = {
     *       a_position: {buffer: positionBuffer, numComponents: 3},
     *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
     *     };
     *
     *     gl.useProgram(program);
     *
     * This will automatically bind the buffers AND set the
     * attributes.
     *
     *     setAttributes(attribSetters, attribs);
     *
     * Properties of attribs. For each attrib you can add
     * properties:
     *
     * *   type: the type of data in the buffer. Default = gl.FLOAT
     * *   normalize: whether or not to normalize the data. Default = false
     * *   stride: the stride. Default = 0
     * *   offset: offset into the buffer. Default = 0
     * *   divisor: the divisor for instances. Default = undefined
     *
     * For example if you had 3 value float positions, 2 value
     * float texcoord and 4 value uint8 colors you'd setup your
     * attribs like this
     *
     *     const attribs = {
     *       a_position: {buffer: positionBuffer, numComponents: 3},
     *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
     *       a_color: {
     *         buffer: colorBuffer,
     *         numComponents: 4,
     *         type: gl.UNSIGNED_BYTE,
     *         normalize: true,
     *       },
     *     };
     *
     * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
     * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
     * @memberOf module:twgl/programs
     * @deprecated use {@link module:twgl.setBuffersAndAttributes}
     */
    function setAttributes(setters, buffers) {
      for (const name in buffers) {
        const setter = setters[name];
        if (setter) {
          setter(buffers[name]);
        }
      }
    }

    /**
     * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
     *
     * Example:
     *
     *     const programInfo = createProgramInfo(
     *         gl, ["some-vs", "some-fs");
     *
     *     const arrays = {
     *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
     *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
     *     };
     *
     *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
     *
     *     gl.useProgram(programInfo.program);
     *
     * This will automatically bind the buffers AND set the
     * attributes.
     *
     *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
     *
     * For the example above it is equivalent to
     *
     *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     *     gl.enableVertexAttribArray(a_positionLocation);
     *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
     *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
     *     gl.enableVertexAttribArray(a_texcoordLocation);
     *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
     * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
     * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
     *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
     * @memberOf module:twgl/programs
     */
    function setBuffersAndAttributes(gl, programInfo, buffers) {
      if (buffers.vertexArrayObject) {
        gl.bindVertexArray(buffers.vertexArrayObject);
      } else {
        setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
        if (buffers.indices) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        }
      }
    }

    /**
     * @typedef {Object} ProgramInfo
     * @property {WebGLProgram} program A shader program
     * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
     * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
     * @property {module:twgl.UniformBlockSpec} [uniformBlockSpace] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
     * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
     * @memberOf module:twgl
     */

    /**
     * Creates a ProgramInfo from an existing program.
     *
     * A ProgramInfo contains
     *
     *     programInfo = {
     *        program: WebGLProgram,
     *        uniformSetters: object of setters as returned from createUniformSetters,
     *        attribSetters: object of setters as returned from createAttribSetters,
     *     }
     *
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext
     *        to use.
     * @param {WebGLProgram} program an existing WebGLProgram.
     * @return {module:twgl.ProgramInfo} The created ProgramInfo.
     * @memberOf module:twgl/programs
     */
    function createProgramInfoFromProgram(gl, program) {
      const uniformSetters = createUniformSetters(gl, program);
      const attribSetters = createAttributeSetters(gl, program);
      const programInfo = {
        program: program,
        uniformSetters: uniformSetters,
        attribSetters: attribSetters,
      };

      if (isWebGL2(gl)) {
        programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
        programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
      }

      return programInfo;
    }

    /**
     * Creates a ProgramInfo from 2 sources.
     *
     * A ProgramInfo contains
     *
     *     programInfo = {
     *        program: WebGLProgram,
     *        uniformSetters: object of setters as returned from createUniformSetters,
     *        attribSetters: object of setters as returned from createAttribSetters,
     *     }
     *
     * NOTE: There are 4 signatures for this function
     *
     *     twgl.createProgramInfo(gl, [vs, fs], options);
     *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
     *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
     *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
     *
     * @param {WebGLRenderingContext} gl The WebGLRenderingContext
     *        to use.
     * @param {string[]} shaderSources Array of sources for the
     *        shaders or ids. The first is assumed to be the vertex shader,
     *        the second the fragment shader.
     * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
     * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
     * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
     *        on error. If you want something else pass an callback. It's passed an error message.
     * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
     * @memberOf module:twgl/programs
     */
    function createProgramInfo(
        gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
      const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
      let good = true;
      shaderSources = shaderSources.map(function(source) {
        // Lets assume if there is no \n it's an id
        if (source.indexOf("\n") < 0) {
          const script = getElementById(source);
          if (!script) {
            progOptions.errorCallback("no element with id: " + source);
            good = false;
          } else {
            source = script.text;
          }
        }
        return source;
      });
      if (!good) {
        return null;
      }
      const program = createProgramFromSources(gl, shaderSources, progOptions);
      if (!program) {
        return null;
      }
      return createProgramInfoFromProgram(gl, program);
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    /**
     * Drawing related functions
     *
     * For backward compatibility they are available at both `twgl.draw` and `twgl`
     * itself
     *
     * See {@link module:twgl} for core functions
     *
     * @module twgl/draw
     */

    /**
     * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
     *
     * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
     * but calling this means if you switch from indexed data to non-indexed
     * data you don't have to remember to update your draw call.
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
     *   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
     * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
     * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
     * @param {number} [offset] An optional offset. Defaults to 0.
     * @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
     * @memberOf module:twgl/draw
     */
    function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
      type = type === undefined ? gl.TRIANGLES : type;
      const indices = bufferInfo.indices;
      const elementType = bufferInfo.elementType;
      const numElements = count === undefined ? bufferInfo.numElements : count;
      offset = offset === undefined ? 0 : offset;
      if (elementType || indices) {
        if (instanceCount !== undefined) {
          gl.drawElementsInstanced(type, numElements, elementType === undefined ? gl.UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
        } else {
          gl.drawElements(type, numElements, elementType === undefined ? gl.UNSIGNED_SHORT : bufferInfo.elementType, offset);
        }
      } else {
        if (instanceCount !== undefined) {
          gl.drawArraysInstanced(type, offset, numElements, instanceCount);
        } else {
          gl.drawArrays(type, offset, numElements);
        }
      }
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    const UNSIGNED_BYTE$2                  = 0x1401;

    /* PixelFormat */
    const DEPTH_COMPONENT$1                = 0x1902;
    const RGBA$1                           = 0x1908;

    /* Framebuffer Object. */
    const RGBA4$1                          = 0x8056;
    const RGB5_A1$1                        = 0x8057;
    const RGB565$1                         = 0x8D62;
    const DEPTH_COMPONENT16$1              = 0x81A5;
    const STENCIL_INDEX                  = 0x1901;
    const STENCIL_INDEX8                 = 0x8D48;
    const DEPTH_STENCIL$1                  = 0x84F9;
    const COLOR_ATTACHMENT0              = 0x8CE0;
    const DEPTH_ATTACHMENT               = 0x8D00;
    const STENCIL_ATTACHMENT             = 0x8D20;
    const DEPTH_STENCIL_ATTACHMENT       = 0x821A;
    const CLAMP_TO_EDGE                  = 0x812F;
    const LINEAR                         = 0x2601;

    /**
     * The options for a framebuffer attachment.
     *
     * Note: For a `format` that is a texture include all the texture
     * options from {@link module:twgl.TextureOptions} for example
     * `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
     * `auto` defaults to `false` for attachment textures but `min` and `mag` default
     * to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
     *
     * @typedef {Object} AttachmentOptions
     * @property {number} [attach] The attachment point. Defaults
     *   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
     *   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
     *   on the format or attachment type.
     * @property {number} [format] The format. If one of `gl.RGBA4`,
     *   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
     *   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
     *   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
     * @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
     * @property {number} [target] The texture target for `gl.framebufferTexture2D`.
     *   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
     * @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
     * @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
     *   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
     * @property {WebGLObject} [attachment] An existing renderbuffer or texture.
     *    If provided will attach this Object. This allows you to share
     *    attachments across framebuffers.
     * @memberOf module:twgl
     */

    const defaultAttachments = [
      { format: RGBA$1, type: UNSIGNED_BYTE$2, min: LINEAR, wrap: CLAMP_TO_EDGE, },
      { format: DEPTH_STENCIL$1, },
    ];

    const attachmentsByFormat = {};
    attachmentsByFormat[DEPTH_STENCIL$1] = DEPTH_STENCIL_ATTACHMENT;
    attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
    attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
    attachmentsByFormat[DEPTH_COMPONENT$1] = DEPTH_ATTACHMENT;
    attachmentsByFormat[DEPTH_COMPONENT16$1] = DEPTH_ATTACHMENT;

    function getAttachmentPointForFormat(format) {
      return attachmentsByFormat[format];
    }

    const renderbufferFormats = {};
    renderbufferFormats[RGBA4$1] = true;
    renderbufferFormats[RGB5_A1$1] = true;
    renderbufferFormats[RGB565$1] = true;
    renderbufferFormats[DEPTH_STENCIL$1] = true;
    renderbufferFormats[DEPTH_COMPONENT16$1] = true;
    renderbufferFormats[STENCIL_INDEX] = true;
    renderbufferFormats[STENCIL_INDEX8] = true;

    function isRenderbufferFormat(format) {
      return renderbufferFormats[format];
    }

    /**
     * @typedef {Object} FramebufferInfo
     * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
     * @property {WebGLObject[]} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
     * @memberOf module:twgl
     */

    /**
     * Creates a framebuffer and attachments.
     *
     * This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
     *
     * The simplest usage
     *
     *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
     *     const fbi = twgl.createFramebufferInfo(gl);
     *
     * More complex usage
     *
     *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
     *     const attachments = [
     *       { format: RGB565, mag: NEAREST },
     *       { format: STENCIL_INDEX8 },
     *     ]
     *     const fbi = twgl.createFramebufferInfo(gl, attachments);
     *
     * Passing in a specific size
     *
     *     const width = 256;
     *     const height = 256;
     *     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
     *
     * **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
     * [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
     *
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
     *    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
     * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
     * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
     * @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
     * @memberOf module:twgl/framebuffers
     */
    function createFramebufferInfo(gl, attachments, width, height) {
      const target = gl.FRAMEBUFFER;
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(target, fb);
      width  = width  || gl.drawingBufferWidth;
      height = height || gl.drawingBufferHeight;
      attachments = attachments || defaultAttachments;
      let colorAttachmentCount = 0;
      const framebufferInfo = {
        framebuffer: fb,
        attachments: [],
        width: width,
        height: height,
      };
      attachments.forEach(function(attachmentOptions) {
        let attachment = attachmentOptions.attachment;
        const format = attachmentOptions.format;
        let attachmentPoint = getAttachmentPointForFormat(format);
        if (!attachmentPoint) {
          attachmentPoint = COLOR_ATTACHMENT0 + colorAttachmentCount++;
        }
        if (!attachment) {
          if (isRenderbufferFormat(format)) {
            attachment = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, attachment);
            gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
          } else {
            const textureOptions = Object.assign({}, attachmentOptions);
            //textureOptions.internalFormat = textureOptions.format;
            //delete textureOptions.format;
            textureOptions.width = width;
            textureOptions.height = height;
            if (textureOptions.auto === undefined) {
              textureOptions.auto = false;
              textureOptions.min = textureOptions.min || textureOptions.minMag || gl.LINEAR;
              textureOptions.mag = textureOptions.mag || textureOptions.minMag || gl.LINEAR;
              textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || gl.CLAMP_TO_EDGE;
              textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || gl.CLAMP_TO_EDGE;
            }
            attachment = createTexture(gl, textureOptions);
          }
        }
        if (isRenderbuffer(gl, attachment)) {
          gl.framebufferRenderbuffer(target, attachmentPoint, gl.RENDERBUFFER, attachment);
        } else if (isTexture(gl, attachment)) {
          if (attachmentOptions.layer !== undefined) {
            gl.framebufferTextureLayer(
              target,
              attachmentPoint,
              attachment,
              attachmentOptions.level || 0,
              attachmentOptions.layer);
          } else {
            gl.framebufferTexture2D(
                target,
                attachmentPoint,
                attachmentOptions.texTarget || gl.TEXTURE_2D,
                attachment,
                attachmentOptions.level || 0);
          }
        } else {
          throw new Error('unknown attachment type');
        }
        framebufferInfo.attachments.push(attachment);
      });
      return framebufferInfo;
    }

    /**
     * Binds a framebuffer
     *
     * This function pretty much solely exists because I spent hours
     * trying to figure out why something I wrote wasn't working only
     * to realize I forget to set the viewport dimensions.
     * My hope is this function will fix that.
     *
     * It is effectively the same as
     *
     *     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
     *     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
     *
     * @param {WebGLRenderingContext} gl the WebGLRenderingContext
     * @param {module:twgl.FramebufferInfo} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
     *   If not passed will bind the canvas.
     * @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
     * @memberOf module:twgl/framebuffers
     */

    function bindFramebufferInfo(gl, framebufferInfo, target) {
      target = target || gl.FRAMEBUFFER;
      if (framebufferInfo) {
        gl.bindFramebuffer(target, framebufferInfo.framebuffer);
        gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
      } else {
        gl.bindFramebuffer(target, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    }

    /*
     * Copyright 2019 Gregg Tavares
     *
     * Permission is hereby granted, free of charge, to any person obtaining a
     * copy of this software and associated documentation files (the "Software"),
     * to deal in the Software without restriction, including without limitation
     * the rights to use, copy, modify, merge, publish, distribute, sublicense,
     * and/or sell copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
     * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     * DEALINGS IN THE SOFTWARE.
     */

    const prefixRE = /^(.*?)_/;
    function addExtensionToContext(gl, extensionName) {
      glEnumToString(gl, 0);
      const ext = gl.getExtension(extensionName);
      if (ext) {
        const enums = {};
        const fnSuffix = prefixRE.exec(extensionName)[1];
        const enumSuffix = '_' + fnSuffix;
        for (const key in ext) {
          const value = ext[key];
          const isFunc = typeof (value) === 'function';
          const suffix = isFunc ? fnSuffix : enumSuffix;
          let name = key;
          // examples of where this is not true are WEBGL_compressed_texture_s3tc
          // and WEBGL_compressed_texture_pvrtc
          if (key.endsWith(suffix)) {
            name = key.substring(0, key.length - suffix.length);
          }
          if (gl[name] !== undefined) {
            if (!isFunc && gl[name] !== value) {
              warn(name, gl[name], value, key);
            }
          } else {
            if (isFunc) {
              gl[name] = function(origFn) {
                return function() {
                  return origFn.apply(ext, arguments);
                };
              }(value);
            } else {
              gl[name] = value;
              enums[name] = value;
            }
          }
        }
        // pass the modified enums to glEnumToString
        enums.constructor = {
          name: ext.constructor.name,
        };
        glEnumToString(enums, 0);
      }
      return ext;
    }

    /*
     * If you're wondering why the code doesn't just iterate
     * over all extensions using `gl.getExtensions` is that it's possible
     * some future extension is incompatible with this code. Rather than
     * have thing suddenly break it seems better to manually add to this
     * list.
     *
     */
    const supportedExtensions = [
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_float',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_disjoint_timer_query_webgl2',
      'EXT_frag_depth',
      'EXT_sRGB',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_compressed_texture_s3tc_srgb',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
    ];

    /**
     * Attempts to enable all of the following extensions
     * and add their functions and constants to the
     * `WebGLRenderingContext` using their normal non-extension like names.
     *
     *      ANGLE_instanced_arrays
     *      EXT_blend_minmax
     *      EXT_color_buffer_float
     *      EXT_color_buffer_half_float
     *      EXT_disjoint_timer_query
     *      EXT_disjoint_timer_query_webgl2
     *      EXT_frag_depth
     *      EXT_sRGB
     *      EXT_shader_texture_lod
     *      EXT_texture_filter_anisotropic
     *      OES_element_index_uint
     *      OES_standard_derivatives
     *      OES_texture_float
     *      OES_texture_float_linear
     *      OES_texture_half_float
     *      OES_texture_half_float_linear
     *      OES_vertex_array_object
     *      WEBGL_color_buffer_float
     *      WEBGL_compressed_texture_atc
     *      WEBGL_compressed_texture_etc1
     *      WEBGL_compressed_texture_pvrtc
     *      WEBGL_compressed_texture_s3tc
     *      WEBGL_compressed_texture_s3tc_srgb
     *      WEBGL_depth_texture
     *      WEBGL_draw_buffers
     *
     * For example if `ANGLE_instanced_arrays` exists then the functions
     * `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
     * and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
     * `WebGLRenderingContext`.
     *
     * Note that if you want to know if the extension exists you should
     * probably call `gl.getExtension` for each extension. Alternatively
     * you can check for the existence of the functions or constants that
     * are expected to be added. For example
     *
     *    if (gl.drawBuffers) {
     *      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
     *      ....
     *
     * @param {WebGLRenderingContext} gl A WebGLRenderingContext
     * @memberOf module:twgl
     */
    function addExtensionsToContext(gl) {
      for (let ii = 0; ii < supportedExtensions.length; ++ii) {
        addExtensionToContext(gl, supportedExtensions[ii]);
      }
    }

    /**
     * Resize a canvas to match the size it's displayed.
     * @param {HTMLCanvasElement} canvas The canvas to resize.
     * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
     * @return {boolean} true if the canvas was resized.
     * @memberOf module:twgl
     */
    function resizeCanvasToDisplaySize(canvas, multiplier) {
      multiplier = multiplier || 1;
      multiplier = Math.max(0, multiplier);
      const width  = canvas.clientWidth  * multiplier | 0;
      const height = canvas.clientHeight * multiplier | 0;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function random(seed) {
        seed = seed % 2147483647;
        if (seed <= 0)
            seed += 2147483646;
        return () => {
            return (seed = (seed * 16807) % 2147483647);
        };
    }
    function loadFile(uri, responseType = "text") {
        return new Promise(resolve => {
            let request = new XMLHttpRequest();
            request.open("GET", uri, true);
            request.responseType = responseType;
            request.onload = () => resolve(request.response);
            request.send();
        });
    }
    function playFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const audio = new Audio(uri);
            audio.loop = true;
            const audioCtx = new window.AudioContext();
            const source = audioCtx.createMediaElementSource(audio);
            const gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(1.0, 0);
            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            audio.play();
            return { context: audioCtx, gain: gainNode };
        });
    }

    const voxResolution = 200;
    const noiseResolution = 200;
    const toSun = normalize([0.1, 0.2, 1]);
    const citySize = [50, 50, 30];
    const blockSize = 32;
    //const toSun = v3.normalize([0., 0., 1]);
    let canvas;
    let gl;
    let noise;
    const fullScreenQuad = {
        position: [-1, -1, 0, 1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]
    };
    const up = [0, 0, 1];
    let textTexture;
    function prepareRender(crash, collect, superSampling) {
        return __awaiter(this, void 0, void 0, function* () {
            canvas = document.getElementById("c");
            gl = canvas.getContext("webgl2");
            if (!textTexture)
                textTexture = createText();
            if (!gl) {
                document.children[0].innerHTML =
                    "This browser has no WebGL2 support or it is not turned on.";
                return;
            }
            /*gl.getExtension("EXT_color_buffer_float");
            gl.getExtension("OES_texture_float_linear");
            gl.getExtension("WEBGL_color_buffer_float");*/
            addExtensionsToContext(gl);
            const shaderSources = [
                "noise-f",
                "city-v",
                "city-f",
                "sky-f",
                "simple-geo-v",
                "star-f",
                "raymarch-f",
                "lattice-v",
                "geo-f",
                "quad-v",
                "light-f",
                "screen-f"
            ];
            const shaderFiles = yield Promise.all(shaderSources.map(f => {
                let inlined = document.getElementById(`${f}.glsl`);
                if (inlined)
                    return inlined.innerHTML;
                return (document.getElementById(`${f}.glsl`) || loadFile(`./shaders/${f}.glsl`));
            }));
            const shaders = shaderFiles.reduce((p, c, i) => ((p[shaderSources[i]] = c), p), {});
            const [noiseFs, cityVs, cityFs, skyFs, simpleGeoVs, starFs, raymarchFs, latticeVs, geoFs, quadVs, lightFs, screenFs] = shaderFiles;
            //let va = await loadStage();
            const bufferWH = [
                canvas.clientWidth * superSampling,
                canvas.clientHeight * superSampling
            ];
            const depthTexture = createTexture$1(gl, bufferWH, {
                internalFormat: gl.DEPTH24_STENCIL8
            });
            const everythingTexture = createTexture$1(gl, bufferWH, {
                internalFormat: gl.RGBA,
                min: gl.NEAREST
            });
            const colorTexture = createTexture$1(gl, bufferWH, {
                internalFormat: gl.RGBA16F
            });
            const positionTexture = createTexture$1(gl, bufferWH, {
                internalFormat: gl.RGBA32F
            });
            const screenTexture = createTexture$1(gl, bufferWH, {
                internalFormat: gl.RGBA16F,
                min: superSampling > 1 ? gl.LINEAR : gl.NEAREST
            });
            if (!noise)
                noise = makeTheNoise([quadVs, noiseFs]);
            const geometryTarget = createFramebufferInfo(gl, [
                //{ attachment: colorTexture },
                { attachment: everythingTexture },
                //{ attachment: positionTexture },
                { format: gl.DEPTH_STENCIL, attachment: depthTexture }
            ], bufferWH[0], bufferWH[1]);
            gl.drawBuffers([
                gl.COLOR_ATTACHMENT0 /*, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2*/
            ]);
            gl.enable(gl.DEPTH_TEST);
            //gl.enable(gl.BLEND);
            const rayPass = {
                programs: [quadVs, skyFs],
                source: createBufferInfoFromArrays(gl, fullScreenQuad),
                target: geometryTarget
            };
            let polyGeometry = {
                color: { size: 1, data: [...new Array(6)].map((v, i) => 0) },
                position: fullScreenQuad.position.map(n => n * 200)
            };
            const polyPass = {
                programs: [cityVs, cityFs],
                //overwrite: true,
                source: createBufferInfoFromArrays(gl, {
                    numElements: citySize[0] * citySize[1] * citySize[2] * 6 * 6 * 3
                }),
                //source: twgl.createBufferInfoFromArrays(gl, {position:fullScreenQuad.position.map(n => n * 0.)}),
                target: geometryTarget
            };
            const lightPass = {
                programs: [quadVs, lightFs],
                uniforms: {
                    //u_color: colorTexture,
                    u_everything: everythingTexture,
                    //u_position: positionTexture,
                    u_depth: depthTexture
                },
                source: createBufferInfoFromArrays(gl, fullScreenQuad),
                target: createFramebufferInfo(gl, [{ attachment: screenTexture }], bufferWH[0], bufferWH[1])
            };
            gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
            const viewportPass = {
                programs: [quadVs, screenFs],
                uniforms: {
                    u_color: lightPass.target.attachments[0],
                    u_bufferSize: bufferWH
                },
                source: createBufferInfoFromArrays(gl, fullScreenQuad)
            };
            resizeCanvasToDisplaySize(canvas);
            gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
            //const capturer = new CCapture( { format: 'webm' } );
            let collectedBits = new Int32Array(100);
            let render;
            //gl.enable(gl.CULL_FACE);
            /*let tcam = m4.inverse(m4.lookAt([0,-1,0], [0, 0, 0], [1, 0, 0]));
            console.log(tcam);
            console.log( m4.transformPoint(tcam, [10,100,0]) )*/
            render = (time, eye, direction, collected, checkpoint, previousCheckpoint, musicTime) => {
                const fov = (40 * Math.PI) / 180;
                const aspect = canvas.clientWidth / canvas.clientHeight;
                const zNear = 5;
                const zFar = 2000;
                const perspective$1 = perspective(fov, aspect, zNear, zFar);
                const camera = lookAt(eye, add(eye, direction), up);
                const raycastCamera = lookAt([0, 0, 0], direction, up);
                const raycastProjection = inverse(multiply(perspective$1, inverse(raycastCamera)));
                const inverseCamera = inverse(camera);
                const viewProjectionTransform = multiply(perspective$1, inverseCamera);
                const inverseViewProjectionTransform = inverse(viewProjectionTransform);
                //console.log(v3.subtract(m4.transformPoint(invertViewProjectionTransform, [0,1,0]), eye));
                const world = identity();
                collectedBits.fill(0, 0);
                for (let i = 0; i < collected.length; i++) {
                    let j = Math.floor(i / 16);
                    if (collected[i])
                        collectedBits[j] = collectedBits[j] + (1 << i % 16);
                    //console.log(i, j, collectedBits);
                }
                let zA = (zFar + zNear) / (zFar - zNear);
                let zB = (2.0 * zFar * zNear) / (zFar - zNear);
                let center = add(eye, mulScalar(direction, 15 * blockSize));
                let origin = center.map((x, i) => Math.floor(x / blockSize - citySize[i] / 2));
                //console.log(origin);
                const uniforms = {
                    "u_light[0].pos": [1300, 1000, 2000],
                    "u_light[0].color": [1, 1, 1, 5],
                    u_ambient: [1, 1, 1, 0.1],
                    u_specular: [1, 1, 1, 1],
                    u_shininess: 10,
                    u_time: time,
                    u_orbRadius: 1 + Math.sin(time * 3) * 0.2,
                    u_eye: eye,
                    u_origin: origin,
                    u_toSun: toSun,
                    u_resolution: voxResolution,
                    u_scale: 100,
                    u_depthRange: [zNear, zFar],
                    u_bufferSize: bufferWH,
                    u_camera: camera,
                    u_inverseCamera: inverseCamera,
                    u_near: zNear,
                    u_far: zFar,
                    u_a: zA,
                    u_b: zB,
                    u_world: world,
                    u_citySize: citySize,
                    u_blockSize: blockSize,
                    u_worldInverseTranspose: transpose(inverse(world)),
                    u_worldViewProjection: viewProjectionTransform,
                    u_inverseWorldViewProjection: inverseViewProjectionTransform,
                    u_raycastProjection: raycastProjection,
                    u_collected: collectedBits,
                    u_noise: noise,
                    u_checkpoint: checkpoint,
                    u_previousCheckpoint: previousCheckpoint,
                    u_text: textTexture,
                    u_musicTime: musicTime
                };
                Object.assign(lightPass.uniforms, uniforms);
                polyPass.uniforms = uniforms;
                rayPass.uniforms = uniforms;
                //renderPass(gl, rayPass);
                renderPass(gl, polyPass);
                renderPass(gl, lightPass);
                const data = new Float32Array(4);
                gl.readBuffer(gl.COLOR_ATTACHMENT0);
                gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, data);
                if (data[2])
                    crash();
                else if (data[0])
                    collect(data[0]);
                renderPass(gl, viewportPass);
            };
            return render;
        });
    }
    function renderPass(gl, pass) {
        bindFramebufferInfo(gl, pass.target);
        if (!pass.overwrite)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (!pass.programInfo) {
            pass.programInfo = createProgramInfo(gl, pass.programs, error => console.log(error));
        }
        const program = pass.programInfo;
        gl.useProgram(program.program);
        setBuffersAndAttributes(gl, program, pass.source);
        setUniforms(program, pass.uniforms);
        drawBufferInfo(gl, pass.source);
        if (pass.then) {
            pass.then();
        }
    }
    function createTexture$1(gl, size, other) {
        return createTexture(gl, Object.assign({
            width: size[0],
            height: size[1]
        }, other));
    }
    function makeTheNoise(programs) {
        let numPixels = noiseResolution * noiseResolution * noiseResolution;
        let noise2DSide = Math.ceil(Math.sqrt(numPixels));
        const noisePass = {
            programs,
            source: createBufferInfoFromArrays(gl, fullScreenQuad),
            uniforms: { u_resolution: noiseResolution, u_side: noise2DSide },
            target: createFramebufferInfo(gl, [{ internalFormat: gl.R32F }], noise2DSide, noise2DSide)
        };
        gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
        renderPass(gl, noisePass);
        gl.flush();
        const data = new Float32Array(noise2DSide * noise2DSide);
        gl.readBuffer(gl.COLOR_ATTACHMENT0);
        gl.readPixels(0, 0, noise2DSide, noise2DSide, gl.RED, gl.FLOAT, data);
        const noise3DTexture = createTexture(gl, {
            target: gl.TEXTURE_3D,
            width: noiseResolution,
            height: noiseResolution,
            depth: noiseResolution,
            wrap: gl.MIRRORED_REPEAT,
            minMag: gl.LINEAR,
            internalFormat: gl.R16F,
            src: data.slice(0, numPixels)
        });
        return noise3DTexture;
    }
    function createText() {
        const ctx = document.createElement("canvas").getContext("2d");
        let texts = [
            "Music by Ashley Thorpe (The Soundsmith)",
            "無限の都市",
            "Добро пожаловать в Омск",
            "एक असीम शहर",
            "Design&code by @baturinsky",
            "Thanks to Procjam Discord",
            "Written in GLSL (mostly)",
            "A Boundless City"
        ];
        ctx.canvas.width = 1024;
        ctx.canvas.height = 512;
        ctx.fillStyle = "white";
        ctx.font = "bold 48px Verdana";
        ctx.scale(0.85, 1);
        for (let i = 0; i < 8; i++) {
            ctx.fillText(texts[i % 8], 0, 64 * (0.5 + i));
            ctx.scale(1, 1);
        }
        let canvas = ctx.canvas;
        let tex = createTexture(gl, { src: canvas, wrap: gl.REPEAT });
        return tex;
    }

    class Keyboard {
        constructor(element) {
            this.interval = 100;
            this.pressed = {};
            this.subs = [];
            element.addEventListener("keydown", this);
            element.addEventListener("keyup", this);
            element.addEventListener("mousedown", this);
            element.addEventListener("mouseup", this);
        }
        handleEvent(e) {
            let code;
            let type;
            if (e instanceof KeyboardEvent) {
                code = e.code;
                type = e.type == "keydown" ? "down" : "up";
            }
            else {
                code = "Click" + e.button;
                type = e.type == "mousedown" ? "down" : "up";
            }
            if (type == "down") {
                if (!(code in this.pressed)) {
                    this.click(code);
                    this.pressed[code] = window.setInterval(() => this.click(code), this.interval);
                }
            }
            if (type == "up") {
                window.clearInterval(this.pressed[code]);
                delete this.pressed[code];
            }
        }
        click(code) {
            for (let s of this.subs) {
                s(code);
            }
        }
        sub(handler) {
            this.subs.push(handler);
        }
        unsub(handler) {
            this.subs = this.subs.filter(s => {
                return s != handler;
            });
        }
        once(handler) {
            let f = (code) => {
                this.unsub(f);
                handler(code);
            };
            this.sub(f);
        }
        isPressed(keyCode) {
            return keyCode in this.pressed;
        }
        clear() {
            this.subs = [];
        }
    }

    function zzfxInit() {
      let zzfx_v = 0.5;
      let zzfx_x = new AudioContext();

      return (e, f, a, b = 1, d = 0.1, g = 0, h = 0, k = 0, l = 0) => {
        let S = 44100,
          P = Math.PI;
        a *= (2 * P) / S;
        a *= 1 + f * (2 * Math.random() - 1);
        g *= (1e3 * P) / S ** 2;
        b = 0 < b ? (S * (10 < b ? 10 : b)) | 0 : 1;
        d *= b | 0;
        k *= (2 * P) / S;
        l *= P;
        f = [];
        for (var m = 0, n = 0, c = 0; c < b; ++c)
          (f[c] =
            e *
            zzfx_v *
            Math.cos(m * a * Math.cos(n * k + l)) *
            (c < d ? c / d : 1 - (c - d) / (b - d))),
            (m += 1 + h * (2 * Math.random() - 1)),
            (n += 1 + h * (2 * Math.random() - 1)),
            (a += g);
        e = zzfx_x.createBuffer(1, b, S);
        a = zzfx_x.createBufferSource();
        e.getChannelData(0).set(f);
        a.buffer = e;
        a.connect(zzfx_x.destination);
        a.start();
        return a;
      };
    }

    let volume = 1;
    let zzfx;
    let upgradesDiv;
    let sfxDefs = {
        playerExplode: [1, 0.1, 0, 0.8, 0.05, 0.7, 4.6, 21.2, 0.4],
        explode: [3, 0.1, 1811, 0.8, 0.01, 1.9, 3, 0.5, 0.04],
        powerup: [1, 0.1, 240, 0.2, 0.85, 5.7, 0.8, 0, 0.77],
        shieldDest: [1, 0.1, 1750, 0.7, 0.05, 0.1, 1.8, 0.3, 0.18],
        blast: [1, 0.1, 5000, 1.7, 0.01, 0, 4, 0, 0.45],
        ponk: [0.5, 0.1, 1549, 0.1, 0, 0, 1.2, 48.9, 0.17],
        //UNUSED BUT COOL
        boom: [1, 0.1, 3000, 1.5, 0.01, 0, 4, 0, 0.48],
        rumble: [1, 0.1, 200, 0.7, 0.1, 0, 5, 0.1, 0.36],
        sad: [1, 0.1, 264, 1.1, 0.53, 0, 0, 0.1, 0.94],
        vwom: [1, 0.1, 1, 1, 0.11, 0, 0, 69.2, 0.95],
        pop: [1, 0.1, 21, 0.1, 0.46, 9, 0.1, 5.7, 0.12],
        swipe: [1, 0.1, 866, 0.1, 0.5, 0, 1.6, 0.4, 0.98],
        ow: [1, 0.1, 1682, 0.2, 0.66, 3, 0, 1.2, 0.69],
        wave: [1, 0.1, 1825, 1, 0.2, 0, 5, 0.2, 0.3],
        bobbleUp: [1, 0.1, 17, 1, 0.26, 0.2, 0.1, 8, 0.66]
    };
    function sfx(def) {
        if (!zzfx)
            zzfx = zzfxInit();
        zzfx(sfxDefs[def][0] * volume, ...sfxDefs[def].slice(1));
    }
    const possibleUpgrades = [
        ["brake", [10]],
        ["boosts", [100, 200, 300, 400, 500]],
        ["boostMore", [100, 200, 300, 400, 500]],
        ["clasterFaster", [100, 200, 500, 1000, 2000]],
        ["rewind", [100, 300, 500]],
        ["rewindCheckpoint", [1000]],
        ["pickup", [500]],
        ["friction", [100, 200, 500, 1000, 2000]],
        ["time", [100, 200, 500, 1000, 2000]]
        //["lane", [1000]]
    ];
    const upgradeDescriptions = {
        brake: "Brake on <b>right mouse click</b>",
        boosts: "You can accelerate with <b>left mouse click</b> up to {0/1/2/3/4/5} times per checkpoint.",
        boostMore: "You gain {0/25/50/75/100/125} more velocity when accelerating.",
        clasterFaster: "You gain {0/25/50/75/100/125} more velocity when collecting a cluster.",
        rewind: "You rewind back to previous checkpoint up to {0/1/2/3} times when crashing.",
        rewindCheckpoint: "You get 1 more rewind when reaching checkpoint.",
        pickup: "You can collect checkpoint from a longer distance",
        friction: "Air friction is reduced by {0/10%/20%/30%/40%/50%}",
        time: "Time limit for reaching checkpoint is increased by {0/10%/20%/30%/40%/50%}"
        //lane: "When you are in car lane, you are accelerated in the lane direction"
    };
    const rad = Math.PI / 180;
    const acc = 300;
    const heightToSpeed = 0.3;
    const friction = 0.03;
    const orbSpeedBonus = 10;
    const minimumVelocity = 10;
    const accPerClick = 30;
    const slowPerClick = 30;
    let frame = 0;
    let lastTime = 0;
    let dir = [1, 0, 0];
    let mouseDelta = [0, 0];
    let fps = 60;
    let state;
    let lsbs = localStorage["boundlessCity"];
    let storage = lsbs
        ? JSON.parse(lsbs)
        : {
            upgrades: {},
            coins: 100,
            mute: false
        };
    function save(bonusCoins = 0) {
        localStorage["boundlessCity"] = JSON.stringify({
            upgrades,
            mute,
            coins: coins + bonusCoins
        });
    }
    let upgrades = storage.upgrades;
    let coins = storage.coins;
    let mute = !!storage.mute;
    function initGame() {
        state = initState();
        let g = {
            time: 0,
            timeLeft: 40 * (1 + 0.1 * (upgrades.time || 0)),
            collected: new Uint8Array(1000),
            thisRunCoins: 0,
            boosts: upgrades.boosts || 0,
            lives: (upgrades.rewind || 0) + 1,
            previousCheckpoint: initState(),
            checkpoint: [20, 0, -3],
            checkpoints: 0,
            over: 0,
            state
        };
        return g;
    }
    let game = initGame();
    function upgradeCost(upgrade) {
        let r = possibleUpgrades.find(u => u[0] == upgrade)[1][upgrades[upgrade] || 0] ||
            1e9;
        //console.log(upgrade, r);
        return r;
    }
    function initState() {
        return {
            pos: [0, 0, 0],
            vel: 50,
            time: 0,
            rot: [0, 0],
            smoothRot: [0, 0]
        };
    }
    function active() {
        return document.pointerLockElement == canvas && !gameOver();
    }
    const CRASH = 1;
    const TIMEOUT = 2;
    const gameOverReasons = [
        "",
        "You have crashed into something solid. Or something solid has crashed into you.",
        "You have run out of time. You remember that <span style='color:#0f0'>checkpoints</span> extend time, right?"
    ];
    function gameOver() {
        return game.over;
    }
    function crash() {
        sfx("bobbleUp");
        if (game.lives > 1) {
            game.lives--;
            rewind();
        }
        else {
            endGame(CRASH);
        }
    }
    function endGame(reason) {
        game.over = reason;
        coins += game.thisRunCoins;
        save();
        updateUpgrades();
        pause();
    }
    function collectCluster(hash) {
        //console.log(orb);
        if (game.collected[hash])
            return;
        sfx("ponk");
        game.thisRunCoins += game.checkpoints + 1;
        state.vel += orbSpeedBonus * (1 + 0.25 * (upgrades.clasterFaster || 0));
        if (hash >= 0)
            game.collected[hash] = 1;
        save(game.thisRunCoins);
    }
    function remember() {
        game.previousCheckpoint = JSON.parse(JSON.stringify(state));
        game.previousCheckpoint.pos = copy(game.checkpoint)
            .map(v => v * blockSize);
        console.log(game.previousCheckpoint);
    }
    function rewind() {
        Object.assign(state, JSON.parse(JSON.stringify(game.previousCheckpoint)));
        state.vel = Math.min(state.vel, 30);
        game.boosts = upgrades.boosts || 0;
        mouseDelta = [0, 0];
    }
    function highlightCurrentLevel(s, level) {
        s = s.replace(/\{(.*)\}/, v => {
            let vv = v.substr(1, v.length - 2).split("/");
            vv[level] = `<b style="color:white">` + vv[level] + "</b>";
            return `<span style="color:#bbb">` + vv.join("/") + "</span>";
        });
        return s;
    }
    function pause() {
        document.exitPointerLock();
    }
    function unpause() {
        canvas.requestPointerLock();
    }
    function collectCheckpoint() {
        sfx("powerup");
        game.checkpoints++;
        game.boosts = upgrades.boosts || 0;
        if (upgrades.rewindCheckpoint) {
            game.lives = Math.min(game.lives + 1, (upgrades.rewind || 0) + 1);
        }
        game.timeLeft += 20 * (1 + 0.1 * (upgrades.time || 0));
        let r = random(frame + length$1(game.checkpoint));
        remember();
        let normHorDir = normalize([dir[0], dir[1], 0]);
        let shift = [r(), r(), r()].map((v, i) => Math.floor((v % 1500) / 100 -
            10 +
            (i == 2 ? -3 + game.checkpoints : normHorDir[i] * 30)) *
            (1 + 0.2 * game.checkpoints));
        game.checkpoint = add(shift, game.checkpoint).map(n => Math.floor(n));
    }
    function toggleMusic() {
        mute = !mute;
        if (!music)
            return;
        if (mute) {
            music.context.suspend();
        }
        else {
            music.context.resume();
        }
        save();
    }
    function updateUpgrades() {
        upgradesDiv.innerHTML =
            `
  <div>Level</div><div>Cost</div><div> </div><div>Upgrade</div>
  ` +
                possibleUpgrades
                    .map(u => `<div>${upgrades[u[0]] || 0}/${u[1].length}</div><div>${u[1][upgrades[u[0]] || 0] || "MAX"}</div>      
    <button ${upgradeCost(u[0]) > coins ? "disabled" : ""} onclick="buy('${u[0]}')">Buy!</button>
    <div style="text-align: left;">${highlightCurrentLevel(upgradeDescriptions[u[0]], upgrades[u[0]] || 0)}</div>`)
                    .join("") +
                `<div>Coins:</div><div class="coin">${coins}</div>
  `;
    }
    let loopId;
    let music;
    window.onload = (e) => __awaiter(void 0, void 0, void 0, function* () {
        let renderHQ = yield prepareRender(crash, collectCluster, 2);
        let renderLQ = yield prepareRender(crash, collectCluster, 1);
        let render = renderHQ;
        let statsDiv = document.getElementById("stats");
        let orbsDiv = document.getElementById("orbs");
        let pauseDiv = document.getElementById("pause");
        let winDiv = document.getElementById("win");
        upgradesDiv = document.getElementById("upgrades");
        //<button ${upgradeCost(u[0]) > game.coins?"disabled":""}">Buy!</button>
        window["buy"] = (s) => {
            coins -= upgradeCost(s);
            upgrades[s] = (upgrades[s] || 0) + 1;
            save();
            updateUpgrades();
        };
        function restart() {
            game = initGame();
            renderFrame();
            runLoop();
        }
        window["restartGame"] = () => restart();
        //canvas.requestPointerLock();
        const keyboard = new Keyboard(document);
        document.addEventListener("keydown", (e) => {
            if (e.code == "Space") {
                if (!active())
                    unpause();
                else
                    pause();
            }
            if (e.code == "KeyR") {
                restart();
                return;
            }
            if (e.code == "KeyP") {
                rewind();
                return;
            }
            if (e.code == "KeyQ") {
                render = render == renderHQ ? renderLQ : renderHQ;
                return;
            }
            if (e.code == "KeyM") {
                toggleMusic();
            }
        });
        canvas.addEventListener("mousedown", (e) => __awaiter(void 0, void 0, void 0, function* () {
            if (!music) {
                music = yield playFile("/Boundless_City.mp3");
                if (mute)
                    music.context.suspend();
            }
            if (!active())
                canvas.requestPointerLock();
            else {
                if (e.button == 0 && game.boosts > 0) {
                    game.boosts--;
                    state.vel += accPerClick * (1 + (upgrades.boostMore || 0) * 0.25);
                }
                if (e.button == 2 && upgrades.brake) {
                    state.vel = Math.max(state.vel - slowPerClick, minimumVelocity * 2);
                }
            }
        }));
        canvas.addEventListener("mousemove", (e) => {
            mouseDelta[0] += e.movementX;
            mouseDelta[1] += e.movementY;
        });
        restart();
        pause();
        updateUpgrades();
        function renderFrame() {
            render(state.time, state.pos, dir, game.collected, game.checkpoint, game.previousCheckpoint.pos.map(v => v / blockSize), music ? music.context.currentTime : 0);
        }
        function runLoop() {
            if (!loopId)
                loopId = window.requestAnimationFrame(loop);
        }
        function loop(frameTime) {
            loopId = 0;
            pauseDiv.style.visibility = !active() && !gameOver() ? "visible" : "hidden";
            frame++;
            winDiv.style.visibility = gameOver() ? "visible" : "hidden";
            if (gameOver()) {
                winDiv.innerHTML = `<h2>Run complete</h2> ${gameOverReasons[game.over]} <br/> You have collected <b>${game.thisRunCoins}</b> coins in <b>${Math.floor(state.time)} seconds!</b><br/><br/> <button onclick="restartGame()"><b>R</b>estart</button>`;
                return;
            }
            if (!active() && frame > 1) {
                runLoop();
                return;
            }
            let dTime = (frameTime - lastTime) / 1000;
            if (dTime > 0.1)
                dTime = 0.1;
            fps = fps * 0.99 + 0.01 / dTime;
            lastTime = frameTime;
            state.time += dTime;
            game.timeLeft -= dTime;
            if (game.timeLeft <= 0) {
                endGame(TIMEOUT);
                runLoop();
                return;
            }
            mouseDelta = mouseDelta.map(d => Math.sign(d) * Math.min(30, Math.abs(d) * dTime * 60));
            state.rot[0] = state.rot[0] - mouseDelta[0] * 0.1;
            state.rot[1] = Math.max(-89.999, Math.min(89.999, state.rot[1] - mouseDelta[1] * 0.1));
            let turn = Math.min(1, dTime * 30);
            state.smoothRot = state.smoothRot.map((prevSmooth, i) => prevSmooth * (1 - turn) + state.rot[i] * turn);
            let [yaw, pitch] = state.smoothRot.map(v => v * rad);
            dir = normalize([
                Math.cos(pitch) * Math.cos(yaw),
                Math.cos(pitch) * Math.sin(yaw),
                Math.sin(pitch)
            ]);
            mouseDelta = [0, 0];
            if (keyboard.pressed["KeyO"]) {
                state.vel += acc * dTime;
            }
            if (keyboard.pressed["KeyL"]) {
                state.vel = Math.max(0, state.vel - acc * dTime);
            }
            state.vel *= 1 - friction * (1 - (upgrades.friction || 0) * 0.1) * dTime;
            if (state.vel <= minimumVelocity) {
                let drop = minimumVelocity - state.vel / 100;
                state.pos[2] -= drop * heightToSpeed;
                state.vel += drop;
            }
            let delta = mulScalar(dir, state.vel * dTime);
            state.vel -= delta[2] * heightToSpeed;
            state.pos = add(state.pos, delta);
            if (frame % 5 == 0) {
                statsDiv.innerText = `Time: ${Math.floor(state.time)} Position: ${state.pos
                .map(n => Math.round(n))
                .join(",")} Velocity: ${Math.floor(state.vel)} FPS: ${Math.round(fps)}`;
                orbsDiv.innerHTML = `        
      <div>Coins: <span class="coin">${game.thisRunCoins}</span></div>
      <div>Mult.: <b>${game.checkpoints + 1}</b></div>
      <div>Lives: <b style="color:#0f0">${game.lives}</b></div>
      <div>Boosts: <b style="color:#f00">${game.boosts}</b></div>
      <div>Time: <b style="color:#8ff">${Math.floor(game.timeLeft)}</b></div>
      `;
            }
            if (distance(game.checkpoint, divScalar(state.pos, blockSize)) <
                1 * (1 + (upgrades.pickup || 0) * 2)) {
                collectCheckpoint();
            }
            renderFrame();
            runLoop();
        }
        runLoop();
    });

}());
