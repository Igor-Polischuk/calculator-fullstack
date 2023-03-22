import { calculatorConfig } from "../../config/calculator-config";
import { ExpressionProcessor } from "./ExpressionProcessor";

export class ExpressionValidation extends ExpressionProcessor {
    constructor() { super() }

    descendantProcessor(resultAcc: string, operation: string): string {
        const currentOperationObj = calculatorConfig[operation];
        const matchedExpressionWithOperation = resultAcc.match(currentOperationObj.reg)
        if (!matchedExpressionWithOperation) {
            return resultAcc
        }
        return resultAcc.replace(matchedExpressionWithOperation[0], '0')
    }
}