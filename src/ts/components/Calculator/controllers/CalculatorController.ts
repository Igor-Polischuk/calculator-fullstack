import { ExpressionProcessor } from './services/processing/ExpressionProcessor';
import { ICalculatorController, ICalculatorModel, IError } from '@components/Calculator/interfaces/ICalculator';
import { formatDecimal } from '@utilities/formatDecimal';
import { CalculatorObserverEvent } from '../calculator-event';
import { calculatorConfig } from './config/calculator-config';
import { formatExpression, getNumbersFromString } from './services';
import { validate } from './validation/validate';

//2+3*4-5/6^7+sin8*cos9-10+11*12/13-sin14+cos15*16+17-18/19^20+sin21*cos22-23+24*25/26-sin27+cos28*29 = -12.524865745452113
//2 + 3 * 4 - 5 / (6 ** 7) + Math.sin(8) * Math.cos(9) - 10 + 11 * 12 / 13 - Math.sin(14) + Math.cos(15) * 16 + 17 - 18 / (19 ** 20) + Math.sin(21) * Math.cos(22) - 23 + 24 * 25 /26 - Math.sin(27) + Math.cos(28)*29;

export class CalculatorController implements ICalculatorController {
  private expressionProcessor = new ExpressionProcessor(this.calculateUnbracketedExpression)
  constructor(public model: ICalculatorModel) {
    this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this));
  }

  private calculateExpression(inputExpression: string): void {
    const expression = formatExpression(inputExpression);

    try {
      validate(expression);
      const resultString = this.calculate(expression)
      const result = Number(resultString)
      console.log(`${inputExpression} = ${result}`)
      const roundedResult = formatDecimal(result, 5)
      this.model.setResult(roundedResult);
    } catch (error) {
      console.log(error);
      this.model.setError(error as IError[]);
    }
  }

  private calculate = (expression: string) => this.expressionProcessor.processBracketedExpression(expression)

  private calculateUnbracketedExpression(resultAcc: string, operation: string): string {
    const currentOperationObj = calculatorConfig[operation];
    const matchedExpressionWithOperation = resultAcc.match(currentOperationObj.reg)
    if (!matchedExpressionWithOperation) {
      return resultAcc
    }
    const [expressionWithCurrentOperation] = matchedExpressionWithOperation
    const numbersOperand = getNumbersFromString(expressionWithCurrentOperation)

    currentOperationObj.checkException(numbersOperand);
    const calculationResult = currentOperationObj.calculate(...numbersOperand).toString()

    return resultAcc.replace(expressionWithCurrentOperation, calculationResult)
  }

}
