import { MathHandler } from '../types/math_handler';
import { ParsedToken } from '../token';
import type Mexp from '../index';
import { Decimal } from 'decimal.js';

// 輔助函數
const factorial = (n: Decimal): Decimal => {
	let result = new Decimal(1);
	for (let i = 2; i <= n.toNumber(); i++) {
		result = result.times(i);
	}
	return result;
};

const toRadians = (x: Decimal): Decimal => x.times(Math.PI).div(180);

const log10 = (x: Decimal): Decimal => {
	return new Decimal(Math.log10(x.toNumber()));
};

const bitwiseAnd = (a: Decimal, b: Decimal): Decimal => {
	return new Decimal(a.toNumber() & b.toNumber());
};

export const createBase = (v: Decimal.Value): Decimal => new Decimal(v)

export const createDecimalFunctions = (mexp: Mexp): MathHandler => ({
	isDegree: true,
	acos: (x: number) => {
		const result = new Decimal(Math.acos(x));
		return mexp.math.isDegree ? result.times(180).div(Math.PI).toNumber() : result.toNumber();
	},
	add: (a: number, b: number) => new Decimal(a).plus(b).toNumber(),
	asin: (x: number) => {
		const result = new Decimal(Math.asin(x));
		return mexp.math.isDegree ? result.times(180).div(Math.PI).toNumber() : result.toNumber();
	},
	atan: (x: number) => {
		const result = new Decimal(Math.atan(x));
		return mexp.math.isDegree ? result.times(180).div(Math.PI).toNumber() : result.toNumber();
	},
	acosh: (x: number) => new Decimal(Math.acosh(x)).toNumber(),
	asinh: (x: number) => new Decimal(Math.asinh(x)).toNumber(),
	atanh: (x: number) => new Decimal(Math.atanh(x)).toNumber(),
	C: (n: number, r: number) => {
		if (n % 1 !== 0 || r % 1 !== 0) return 0;
		const nBN = new Decimal(n);
		const rBN = new Decimal(r);
		const diff = nBN.minus(rBN);
		if (diff.isNegative()) return 0;
		return factorial(nBN).div(factorial(rBN).times(factorial(diff))).toNumber();
	},
	changeSign: (x: number) => new Decimal(x).negated().toNumber(),
	cos: (x: number) => {
		const rad = mexp.math.isDegree ? toRadians(new Decimal(x)) : new Decimal(x);
		return new Decimal(Math.cos(rad.toNumber())).toNumber();
	},
	cosh: (x: number) => {
		const exp = new Decimal(Math.E).pow(x);
		return exp.plus(new Decimal(1).div(exp)).div(2).toNumber();
	},
	div: (a: number, b: number) => new Decimal(a).div(b).toNumber(),
	fact: (n: number) => {
		if (n % 1 !== 0) return 0;
		return factorial(new Decimal(n)).toNumber();
	},
	inverse: (x: number) => new Decimal(1).div(x).toNumber(),
	log: (x: number) => log10(new Decimal(x)).toNumber(),
	mod: (a: number, b: number) => new Decimal(a).mod(b).toNumber(),
	mul: (a: number, b: number) => new Decimal(a).times(b).toNumber(),
	P: (n: number, r: number) => {
		if (n % 1 !== 0 || r % 1 !== 0) return 0;
		const nBN = new Decimal(n);
		const rBN = new Decimal(r);
		const diff = nBN.minus(rBN);
		if (diff.isNegative()) return 0;
		return factorial(nBN).div(factorial(diff)).toNumber();
	},
	Pi: (low: number, high: number, ex: ParsedToken[]) => {
		let pro = new Decimal(1);
		for (let i = low; i <= high; i++) {
			pro = pro.times(mexp.postfixEval(ex, { n: i }));
		}
		return pro.toNumber();
	},
	pow10x: (e: number) => new Decimal(10).pow(e).toNumber(),
	sigma: (low: number, high: number, ex: ParsedToken[]) => {
		let sum = new Decimal(0);
		for (let i = low; i <= high; i++) {
			sum = sum.plus(mexp.postfixEval(ex, { n: i }));
		}
		return sum.toNumber();
	},
	sin: (x: number) => {
		const rad = mexp.math.isDegree ? toRadians(new Decimal(x)) : new Decimal(x);
		return new Decimal(Math.sin(rad.toNumber())).toNumber();
	},
	sinh: (x: number) => {
		const exp = new Decimal(Math.E).pow(x);
		return exp.minus(new Decimal(1).div(exp)).div(2).toNumber();
	},
	sub: (a: number, b: number) => new Decimal(a).minus(b).toNumber(),
	tan: (x: number) => {
		const rad = mexp.math.isDegree ? toRadians(new Decimal(x)) : new Decimal(x);
		return new Decimal(Math.tan(rad.toNumber())).toNumber();
	},
	tanh: (x: number) => {
		const exp = new Decimal(Math.E).pow(x);
		const expNeg = new Decimal(1).div(exp);
		return exp.minus(expNeg).div(exp.plus(expNeg)).toNumber();
	},
	toRadian: (x: number) => toRadians(new Decimal(x)).toNumber(),
	and: (a: number, b: number) => bitwiseAnd(new Decimal(a), new Decimal(b)).toNumber(),
	floor: (x: number) => new Decimal(x).floor().toNumber(),
	pow: (a: number, b: number) => {
    return new Decimal(a).pow(b).toNumber()
	},
	sqrt: (x: number) => new Decimal(x).sqrt().toNumber(),
});
