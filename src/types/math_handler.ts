import { ParsedToken } from '../token';

export interface MathHandler<BaseType = number, NaNType = 'NaN'> {
  isDegree: boolean
  acos: (x: BaseType) => BaseType
  add: (a: BaseType, b: BaseType) => BaseType
  asin: (x: BaseType) => BaseType
  atan: (x: BaseType) => BaseType
  acosh: (x: BaseType) => BaseType
  asinh: (x: BaseType) => BaseType
  atanh: (x: BaseType) => BaseType
  C: (n: BaseType, r: BaseType) => BaseType | NaNType
  changeSign: (x: BaseType) => BaseType
  cos: (x: BaseType) => BaseType
  cosh: (x: BaseType) => BaseType
  div: (a: BaseType, b: BaseType) => BaseType
  fact: (n: BaseType) => BaseType | NaNType
  inverse: (x: BaseType) => BaseType
  log: (x: BaseType) => BaseType
  mod: (a: BaseType, b: BaseType) => BaseType
  mul: (a: BaseType, b: BaseType) => BaseType
  P: (n: BaseType, r: BaseType) => BaseType
  Pi: (low: BaseType, high: BaseType, ex: ParsedToken[]) => BaseType
  pow10x: (e: BaseType) => BaseType
  sigma: (low: BaseType, high: BaseType, ex: ParsedToken[]) => BaseType
  sin: (x: BaseType) => BaseType
  sinh: (x: BaseType) => BaseType
  sub: (a: BaseType, b: BaseType) => BaseType
  tan: (x: BaseType) => BaseType
  tanh: (x: BaseType) => BaseType
  toRadian: (x: BaseType) => BaseType
  and: (a: BaseType, b: BaseType) => BaseType
}