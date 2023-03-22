import { calculatorConfig } from "../../config/calculator-config";
import { getNumbersFromString } from "../expressionGetters/getNumbersFromString";
import { ExpressionProcessor } from "./ExpressionProcessor";

export class ExpressionCalculation extends ExpressionProcessor {
    constructor() { super() }

    descendantProcessor(resultAcc: string, operation: string): string {
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