// This test is for node JS

import { describe, it, expect } from 'bun:test';
import Mexp from '../src';
import { createMathFunctions } from '../src/functionAdapters/functions';
import { createBigNumberFunctions } from '../src/functionAdapters/bignumber';
describe('Testing Issue #91', function () {
  const mexp = new Mexp(createMathFunctions);
  const bnMexp = new Mexp(createBigNumberFunctions);
  const testCases = [
    {
      expr: 'sincos1-sincos1',
      expected: 0,
    },
  ];
  it.each(testCases)('should work subtracting functions', function ({ expr, expected }) {
    expect(mexp.eval(expr)).toBe(expected);
    expect(bnMexp.eval(expr)).toBe(expected);
  });
});
