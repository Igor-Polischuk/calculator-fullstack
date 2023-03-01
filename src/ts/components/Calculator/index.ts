import { CalculatorController } from "./controllers/CalculatorController";
import { CalculatorView } from "./views/CalculatorView";
import { CalculatorModel } from "./models/CalculatorModel";

export default function(){
    const calculatorModel = new CalculatorModel()
    new CalculatorController(calculatorModel)
    new CalculatorView(calculatorModel)

    // calculatorModel.setResult(10)
    // calculatorModel.setResult(10)
    // calculatorModel.setResult(10)
    calculatorModel.setExpression('5 + 5')
    calculatorModel.setExpression('5 + 5')
    calculatorModel.setExpression('5 + 5')
    calculatorModel.setExpression('5 + 5')
}

export {CalculatorController, CalculatorModel, CalculatorView}