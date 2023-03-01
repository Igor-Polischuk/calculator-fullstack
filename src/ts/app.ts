import {CalculatorModel, CalculatorController, CalculatorView} from '@components/Calculator'
import '@styles/styles.scss';


const calculatorModel = new CalculatorModel()
new CalculatorView(calculatorModel)
new CalculatorController(calculatorModel)


calculatorModel.setExpression('2 + 2')
calculatorModel.setResult(10)
calculatorModel.setResult(330)
calculatorModel.setResult(104)
calculatorModel.setExpression('2 + d2')