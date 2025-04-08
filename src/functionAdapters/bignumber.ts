import { MathHandler } from '../types/math_handler';
import { ParsedToken } from '../token';
import Mexp from '../index';
import BigNumber from 'bignumber.js';

// 輔助函數
const factorial = (n: BigNumber): BigNumber => {
	let result = new BigNumber(1);
	for (let i = 2; i <= n.toNumber(); i++) {
		result = result.times(i);
	}
	return result;
};

const toRadians = (x: BigNumber): BigNumber => x.times(Math.PI).div(180);

const log10 = (x: BigNumber): BigNumber => {
	return new BigNumber(Math.log10(x.toNumber()));
};

const bitwiseAnd = (a: BigNumber, b: BigNumber): BigNumber => {
	return new BigNumber(a.toNumber() & b.toNumber());
};

export const createBigNumberFunctions = (mexp: Mexp): MathHandler => ({
	isDegree: true,
	acos: (x: number) => {
		const result = new BigNumber(Math.acos(x));
		return mexp.math.isDegree ? result.times(180).div(Math.PI).toNumber() : result.toNumber();
	},
	add: (a: number, b: number) => new BigNumber(a).plus(b).toNumber(),
	asin: (x: number) => {
		const result = new BigNumber(Math.asin(x));
		return mexp.math.isDegree ? result.times(180).div(Math.PI).toNumber() : result.toNumber();
	},
	atan: (x: number) => {
		const result = new BigNumber(Math.atan(x));
		return mexp.math.isDegree ? result.times(180).div(Math.PI).toNumber() : result.toNumber();
	},
	acosh: (x: number) => new BigNumber(Math.acosh(x)).toNumber(),
	asinh: (x: number) => new BigNumber(Math.asinh(x)).toNumber(),
	atanh: (x: number) => new BigNumber(Math.atanh(x)).toNumber(),
	C: (n: number, r: number) => {
		if (n % 1 !== 0 || r % 1 !== 0) return 0;
		const nBN = new BigNumber(n);
		const rBN = new BigNumber(r);
		const diff = nBN.minus(rBN);
		if (diff.isNegative()) return 0;
		return factorial(nBN).div(factorial(rBN).times(factorial(diff))).toNumber();
	},
	changeSign: (x: number) => new BigNumber(x).negated().toNumber(),
	cos: (x: number) => {
		const rad = mexp.math.isDegree ? toRadians(new BigNumber(x)) : new BigNumber(x);
		return new BigNumber(Math.cos(rad.toNumber())).toNumber();
	},
	cosh: (x: number) => {
		const exp = new BigNumber(Math.E).pow(x);
		return exp.plus(new BigNumber(1).div(exp)).div(2).toNumber();
	},
	div: (a: number, b: number) => new BigNumber(a).div(b).toNumber(),
	fact: (n: number) => {
		if (n % 1 !== 0) return 0;
		return factorial(new BigNumber(n)).toNumber();
	},
	inverse: (x: number) => new BigNumber(1).div(x).toNumber(),
	log: (x: number) => log10(new BigNumber(x)).toNumber(),
	mod: (a: number, b: number) => new BigNumber(a).mod(b).toNumber(),
	mul: (a: number, b: number) => new BigNumber(a).times(b).toNumber(),
	P: (n: number, r: number) => {
		if (n % 1 !== 0 || r % 1 !== 0) return 0;
		const nBN = new BigNumber(n);
		const rBN = new BigNumber(r);
		const diff = nBN.minus(rBN);
		if (diff.isNegative()) return 0;
		return factorial(nBN).div(factorial(diff)).toNumber();
	},
	Pi: (low: number, high: number, ex: ParsedToken[]) => {
		let pro = new BigNumber(1);
		for (let i = low; i <= high; i++) {
			pro = pro.times(mexp.postfixEval(ex, { n: i }));
		}
		return pro.toNumber();
	},
	pow10x: (e: number) => new BigNumber(10).pow(e).toNumber(),
	sigma: (low: number, high: number, ex: ParsedToken[]) => {
		let sum = new BigNumber(0);
		for (let i = low; i <= high; i++) {
			sum = sum.plus(mexp.postfixEval(ex, { n: i }));
		}
		return sum.toNumber();
	},
	sin: (x: number) => {
		const rad = mexp.math.isDegree ? toRadians(new BigNumber(x)) : new BigNumber(x);
		return new BigNumber(Math.sin(rad.toNumber())).toNumber();
	},
	sinh: (x: number) => {
		const exp = new BigNumber(Math.E).pow(x);
		return exp.minus(new BigNumber(1).div(exp)).div(2).toNumber();
	},
	sub: (a: number, b: number) => new BigNumber(a).minus(b).toNumber(),
	tan: (x: number) => {
		const rad = mexp.math.isDegree ? toRadians(new BigNumber(x)) : new BigNumber(x);
		return new BigNumber(Math.tan(rad.toNumber())).toNumber();
	},
	tanh: (x: number) => {
		const exp = new BigNumber(Math.E).pow(x);
		const expNeg = new BigNumber(1).div(exp);
		return exp.minus(expNeg).div(exp.plus(expNeg)).toNumber();
	},
	toRadian: (x: number) => toRadians(new BigNumber(x)).toNumber(),
	and: (a: number, b: number) => bitwiseAnd(new BigNumber(a), new BigNumber(b)).toNumber()
});
