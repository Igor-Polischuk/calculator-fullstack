import { CalculatorController } from "./controllers/CalculatorController";
import { CalculatorView } from "./views/CalculatorView";
import { CalculatorModel } from "./models/CalculatorModel";

export function initCalculator(){
    const calculatorModel = new CalculatorModel()
    new CalculatorController(calculatorModel)
    new CalculatorView(calculatorModel)
    calculatorModel.setExpression('2 +  (1 + (3 + 2 * (4 + 5)))') //24
    calculatorModel.setExpression('8+2*(3+(5 -3))-10/2*(6-4)') //8
    calculatorModel.setExpression('(((sqrt(9))^2*2)-(10/2))+(8+((2^3)+1))') 
}

export {CalculatorController, CalculatorModel, CalculatorView}