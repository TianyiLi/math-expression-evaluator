// This test is for node JS
import { describe, it, expect } from 'bun:test';
import Mexp from '../src';
import { createMathFunctions } from '../src/functionAdapters/math';
import { createBigNumberFunctions } from '../src/functionAdapters/bignumber';
describe('Testing Issue #64', function () {
	const mexp = new Mexp(createMathFunctions);
	const bnMexp = new Mexp(createBigNumberFunctions);
	it('should check parenthesis less number with exponent', function () {
		expect(mexp.eval('-3^(1+1)')).toBe(-9);
		expect(bnMexp.eval('-3^(1+1)')).toBe(-9);
	});
});
