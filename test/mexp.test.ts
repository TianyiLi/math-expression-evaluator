// This test is for node JS

import Mexp from '../src';
import { describe, it, expect } from 'bun:test';
import { createMathFunctions } from '../src/functionAdapters/functions';

const mexp = new Mexp(createMathFunctions)

interface TestCase {
	expr: string;
	expected: number;
}

describe('Testing Unit', function () {
	it('should equal 2 to check a number', function () {
		expect(mexp.eval('2')).toBe(2);
	})
	it('checks a math function', function () {
		expect(mexp.eval('tan(180)')).toBe(-0);
	})
	it('checks a parenthesis less function', function () {
		expect(mexp.eval('sin180')).toBe(0);
	})
	it('checks a parenthesis less function with multiplication', function () {
		expect(mexp.eval('0sin180')).toBe(0);
	})
	it('checks a multiplication of root function', function () {
		expect(mexp.eval('3 root 9')).toBe(9);
	})
	it('checks a multiplication of root function', function () {
		expect(mexp.eval('3root9')).toBe(9);
	})

	it('checks a parenthesis less function with multiplication by decimal', function () {
		expect(mexp.eval('0.5sin90')).toBe(0.5);
	})
	it('checks a parenthesis less function after a space', function () {
		expect(mexp.eval('cos 180')).toBe(-1);
	})

	it('checks a parenthesis function with multiplication', function () {
		expect(mexp.eval('0.5sin(90)')).toBe(0.5);
	})

	it('checks a parenthesis less function after multiple spaces', function () {
		expect(mexp.eval('cos   180')).toBe(-1);
	})
	it('checks consecutive operator', function () {
		expect(mexp.eval('0+-2')).toBe(-2);
	})
	it('checks ^ operator', function () {
		expect(mexp.eval('2^2')).toBe(4);
	})
	it('checks when * is omitted before parenthesis and after', function () {
		expect(mexp.eval('2(7-4)3')).toBe(18);
	})
	it('checks multiplication and exponential in series', function () {
		expect(mexp.eval('2*7^2')).toBe(98);
	})
	it('checks exponential and multiplication in series', function () {
		expect(mexp.eval('2^5*2')).toBe(64);
	})
	it('-3^2=9', function () {
		expect(mexp.eval('-3^2')).toBe(-9);
	})
	it('3^2-2^2=5', function () {
		expect(mexp.eval('3^2-2^2')).toBe(5);

		expect(
			Math.round((mexp.eval('(4-(2-1)^2)^.5') + Number.EPSILON) * 100) / 100,
		).toBe(
			Math.round((Math.sqrt(3) + Number.EPSILON) * 100) / 100
		)
	})

	it('test to check the bug when number contains decimal', function () {
		expect(mexp.eval('int2.3')).toBe(2);
	})
	it('test to check auto correct of parenthesis mismatch if opening>closing', function () {
		expect(mexp.eval('(2+(3-4')).toBe(1);
	})
	it('check for negative of a constant', function () {
		expect(mexp.eval('-e')).toBe(-Math.E);
	})
	it('check for constant inside Sigma', function () {
		expect(mexp.eval('Sigma1,3,2', [{ type: 3, value: 'x', show: 'x', token: 'x', precedence: 0 }], { x: 2 })).toBe(6);
	})
	it('check when arithmetic and n are present inside sigma', function () {
		expect(mexp.eval('Sigma1,2,n')).toBe(3);
	})
	it(' should check when 4C3', function () {
		expect(mexp.eval('4C3')).toBe(4);
	})
	it('check when arithmetic and n are present inside sigma', function () {
		expect(mexp.eval('Sigma1,2,(n*n)')).toBe(5);
	})

	it('check when two parenthesis less functions are consecutive on one parameter', function () {
		// console.log(a.lex('int(2.6*2)*10'))
		expect(mexp.eval('sinint2')).toBe(mexp.eval('sin(int(2))'));
	})

	it('check eval method with single argument', function () {
		expect(mexp.eval('5*3')).toBe(15);
	})
	it('check eval method with three argument', function () {
		expect(mexp.eval('mexp*3', [{ type: 3, show: 'mexp', token: 'mexp', value: 'mexp', precedence: 0 }], {
				mexp: 5,
			})).toBe(15);
	})
	it('check eval method with two argument when second one is value of constants', function () {
		expect(mexp.eval('mexp*3', [{ type: 3, show: 'mexp', value: 'mexp', token: 'mexp', precedence: 0 }], { mexp: 5 })).toBe(15);
	})
	it('check eval method with two argument when second one is value of constants', function () {
		expect(mexp.eval('mexp3', [
				{
					type: 0,
					show: 'mexp',
					value: function (a: number) {
						return 10 * a
					},
					token: 'mexp',
					precedence: 0,
				},
			]),
		).toBe(30);
	})
	it('check eval method with two argument when second one is token list', function () {
		expect(mexp.eval('mexp(3)', [
				{
					type: 0,
					show: 'mexp(',
					value: function (a: number) {
						return 5 * a
					},
					token: 'mexp',
					precedence: 0,
				},
			]),
		).toBe(15);
	})
	it('Pi', function () {
		expect(mexp.eval('Pi1,5,n')).toBe(120);
	})
	it('tan5(6+3)', function () {
		expect(
			Math.round((mexp.eval('tan45(6+3)') + Number.EPSILON) * 100) / 100,)
			.toBe(
				Math.round((9 + Number.EPSILON) * 100) / 100
		)
	})
	it('tan(40+5)', function () {
		expect(mexp.eval('tan(40+5)')).toBe(1);
	})
	it('checks when a 0 is missing in a decimal number', function () {
		expect(mexp.eval('5*.8')).toBe(4);
	})
	it('checks root function', function () {
		expect(mexp.eval('root4')).toBe(2);
		expect(
			Math.round((mexp.eval('root(4-1^2)') + Number.EPSILON) * 100) / 100,
		).toBe(
			Math.round((Math.sqrt(3) + Number.EPSILON) * 100) / 100
		)
		expect(
			Math.round((mexp.eval('root(4-(2-1)^2)') + Number.EPSILON) * 100) / 100,
		).toBe(
			Math.round((Math.sqrt(3) + Number.EPSILON) * 100) / 100
		)
	})
	it('checks + precedence before number insise parenthesis ', function () {
		expect(mexp.eval('(-2)')).toBe(-2);
	})
	it('dividing by negative number ', function () {
		expect(mexp.eval('2/-2')).toBe(-1);
	})
	it('multiplying by negative number ', function () {
		expect(mexp.eval('2*-2')).toBe(-4);
	})
	it('checks multiple allowable operator', function () {
		expect(mexp.eval('2+++-++-+-+3')).toBe(-1);
		expect(mexp.eval('2*+3')).toBe(6);
	})
	it("checks sign after function", function() {
		expect(mexp.eval('cos-0-cos0')).toBe(0);
	})
})
describe('These expression will check for types of returned result', function () {
	it('should tell to compllete expression', function () {
		expect(typeof mexp.eval('0')).toBe('number');
	})
})
describe('These expression will raise error', function () {
	it('should tell to compllete expression', function () {
		try {
			mexp.eval('2*')
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('complete the expression');
		}
	})
	it('should warn about multiple operators', function () {
		try {
			mexp.eval('2**3')
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('* is not allowed after *');
		}
	})
	it('should warn about multiple operators', function () {
		try {
			mexp.eval('2*Mod*3')
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Mod is not allowed after *');
		}
	})
	it('should warn about operator inside parenthesis', function () {
		try {
			mexp.eval('(+)')
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe(') is not allowed after +');
		}
	})
	it('should warn about operator inside parenthesis', function () {
		try {
			mexp.eval('(2+3+)')
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe(') is not allowed after +');
		}
	})
	it('should warn about using space as operator', function () {
		try {
			console.log(mexp.eval('1 2'))
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Unexpected Space');
		}
	})
	it('should warn about using space as operator', function () {
		try {
			console.log(mexp.eval('1. 2'))
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Unexpected Space')
		}
	})
})
describe('Check autoclose of parenthesis of parser', function () {
	it('should tell to compllete expression', function () {
		expect(mexp.eval('((2+3*4')).toBe(14);
	})
})
describe('Ading Token', function () {
	it('should tell to compllete expression', function () {
		expect(mexp.eval('27nroot3', [
				{
					type: 2,
					token: 'nroot',
					show: 'nroot',
					value: function (a: number, b: number) {
						return Math.pow(a, 1 / b)
					},
					precedence: 0,
				},
			]),
		).toBe(3);
		expect(mexp.eval('27nrootlongesttoken3', [
				{
					type: 2,
					token: 'nrootlongesttoken',
					show: 'nrootlongesttoken',
					value: function (a: number, b: number) {
						return Math.pow(a, 1 / b)
					},
					precedence: 0,
				},
			]),
		).toBe(3);
		expect(mexp.eval('17tokenwithnumber347', [
				{
					type: 2,
					token: 'tokenwithnumber34',
					show: 'tokenwithnumber34',
					value: function (a: number, b: number) {
						return a + b
					},
					precedence: 0,
				},
			]),
		).toBe(24);
	})
	it('should evaluate to correct two functions', function () {
		// console.log("PAGAL", a.eval("min(4,ceil(0.1*10))"))
		expect(mexp.eval('min(4,ceil(0.011*100))', [
				{
					type: 0,
					token: 'ceil',
					show: 'ceil',
					value: function (a: number) {
						const ans = Math.ceil(a)
						return ans
					},
					precedence: 0,
				},
				{
					type: 8,
					token: 'min',
					show: 'min',
					value: function (a: number, b: number) {
						return Math.min(a, b)
					},
					precedence: 0,
				},
			]),
		).toBe(2);
	})
	it('should also evaluate to correct two functions', function () {
		// console.log("PAGAL", a.eval("min(4,ceil(0.1*10))"))
		expect(mexp.eval('ceil(min(4, 0.0801*100))')).toBe(4);
	})

	it('should tell to compllete expression', function () {
		expect(mexp.eval('27nroot3', [
				{
					type: 2,
					token: 'nroot',
					show: 'nroot',
					value: function (a: number, b: number) {
						return Math.pow(a, 1 / b)
					},
					precedence: 0,
				},
			]),
		).toBe(3);
	})
	it('should tell to compllete expression', function () {
		expect(mexp.eval('27nrootlongesttoken3', [
				{
					type: 2,
					token: 'nrootlongesttoken',
					show: 'nrootlongesttoken',
					value: function (a: number, b: number) {
						return Math.pow(a, 1 / b)
					},
					precedence: 0,
				},
			]),
		).toBe(3);
	})
	it('should tell to compllete expression', function () {
		expect(mexp.eval('17tokenwithnumber347', [
				{
					type: 2,
					token: 'tokenwithnumber34',
					show: 'tokenwithnumber34',
					value: function (a: number, b: number) {
						return a + b
					},
					precedence: 0,
				},
			]),
		).toBe(24);
	})
	it('maximum of 5 numbers', function () {
		expect(mexp.eval('maxof2(1,maxof2(maxof2(maxof2(maxof2(2,3),5),6),7))', [
				{
					type: 8,
					token: 'maxof2',
					show: 'maxof2',
					value: function (a: number, b: number, c: number) {
						return Math.max(a, b)
					},
					precedence: 0,
				},
			]),
		).toBe(7);
	})
	it('maximum of 5 numbers using n arguments', function () {
		expect(mexp.eval('maxof5(7, 12, 23, 33, 2)', [
				{
					type: Mexp.tokenTypes.FUNCTION_WITH_N_ARGS,
					token: 'maxof5',
					show: 'maxof5',
					numberOfArguments: 5,
					value: function (a: number, b: number, c: number, d: number, e: number) {
						return Math.max.apply(Math, [a, b, c, d, e])
					},
					precedence: 0,
				},
			]),
		).toBe(33);
	})
	it ('should test simple X token', function () {
		mexp.addToken([{
			type: 2,
			token: "X",
			show: "X",
			value: mexp.math.mul,
			precedence: 0,
		}])
		expect(mexp.eval("2X3")).toBe(6);
	})
	it('token with absolute', function () {
		expect(mexp.eval('root(positive(2-6))', [
				{
					type: 0,
					token: 'positive',
					show: 'positive',
					value: function (a: number) {
						return Math.abs(a)
					},
					precedence: 0,
				},
			]),
		).toBe(2);
	})
})
