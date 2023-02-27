import {CalculatorModel, CalculatorController, CalculatorView} from '@components/Calculator'
import '@styles/styles.scss';


const calculatorModel = new CalculatorModel()
const calculatorView = new CalculatorView()
const calculatorController = new CalculatorController()

calculatorModel.expressionChanel.subscribe(calculatorController)
calculatorModel.resultChanel.subscribe(calculatorView)

calculatorModel.resultChanel.notify(15)
calculatorModel.expressionChanel.unsubscribe(calculatorController)
calculatorModel.expressionChanel.notify('3 * 5')
