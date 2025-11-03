import { lex, addToken } from './lexer'
import { tokenTypes, Token, createTokens } from './token'
import { toPostfix } from './postfix'
import { postfixEval, Constants } from './postfix_evaluator'
import { MathHandler } from './types/math_handler';
('use strict')
// var Mexp = function (parsed) {
//   this.value = parsed
// }
class Mexp<BaseType = number, NaNType = 'NaN'> {
	static TOKEN_TYPES = tokenTypes
	static tokenTypes = tokenTypes
	tokens!: Token[]
	toPostfix = toPostfix
	addToken = addToken
	lex = lex
	postfixEval = postfixEval
	eval(string: string, tokens?: Token[], Constants?: Constants): number {
		return this.postfixEval(this.toPostfix(this.lex(string, tokens)), Constants)
	}
	public math: MathHandler<BaseType, NaNType>;
	constructor(mathHandler: (mexp: Mexp<BaseType, NaNType>) => MathHandler<BaseType, NaNType>) {
		this.math = mathHandler(this)
		this.tokens = createTokens(this)
	}
}
export default Mexp
