import { describe, it, expect } from 'bun:test';
import Mexp from '../src';
import { createMathFunctions } from '../src/functionAdapters/math';
import { createBigNumberFunctions } from '../src/functionAdapters/bignumber';

const mexp = new Mexp(createMathFunctions);
const bnMexp = new Mexp(createBigNumberFunctions);

describe('negative decimal', function () {
  it('should evaluate to 0.4', function () {
      expect(bnMexp.eval('-0.6+1')).toBe(0.4)
      expect(mexp.eval('-0.6+1')).toBe(0.4)
  })
  it('should evaluate to 0.1 when using .', function () {
      expect(bnMexp.eval('-.6+.7')).toBe(0.1)
      expect(mexp.eval('-.6+.7')).toBe(0.1)
  })

})