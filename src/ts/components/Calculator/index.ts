import { CalculatorController } from "./controllers/CalculatorController";
import { CalculatorView } from "./views/CalculatorView";
import { CalculatorModel } from "./models/CalculatorModel";

export function initCalculator(){
    const calculatorModel = new CalculatorModel()
    new CalculatorController(calculatorModel)
    new CalculatorView(calculatorModel)
    // calculatorModel.setExpression('8 + 2 * (3 + (5 - 3)) - 10 / 2 * (6 - 4)')
    calculatorModel.setExpression('2 + 2 * 2')
}

export {CalculatorController, CalculatorModel, CalculatorView}