import { describe, it, expect } from 'bun:test';
import Mexp from '../src';
import { createMathFunctions } from '../src/functionAdapters/functions';
import { createBigNumberFunctions } from '../src/functionAdapters/bignumber';

describe('Floating Point', function () {
  const mexp = new Mexp(createMathFunctions);
  const bnMexp = new Mexp(createBigNumberFunctions);

  const textCases = [
    {
      expr: '0.1 + 0.2',
      expected: 0.3,
    },
    { expr: '(0.01 + 0.02) * 10', expected: 0.3 },
    { expr: '(1 + 2) / 10', expected: 0.3 },
    {
      expr: '((0.1) * 10 + (0.2) * 10) / 10',
      expected: 0.3,
    },
    {
      expr: '(1 + 2) / 10',
      expected: 0.3,
    },
    {
      expr: '(0.1 * 10 + 0.2 * 10) / 10',
      expected: 0.3,
    },
  ];
  it.each(textCases)(
    'should evaluate floating point',
    function ({ expr, expected }) {
      expect(mexp.eval(expr)).toBe(expected);
    }
  );
  it.each(textCases)(
    'should evaluate floating point',
    function ({ expr, expected }) {
      expect(bnMexp.eval(expr)).toBe(expected);
    }
  );
});
