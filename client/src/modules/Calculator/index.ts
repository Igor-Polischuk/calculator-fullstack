import { CalculatorController } from "./controllers/CalculatorController";
import { CalculatorView } from "./views/CalculatorView";
import { CalculatorModel } from "./models/CalculatorModel";

export function initCalculator() {
    const calculatorModel = new CalculatorModel()
    new CalculatorController(calculatorModel)
    new CalculatorView(calculatorModel)
}

export { CalculatorController, CalculatorModel, CalculatorView }