import {CalculatorModel, CalculatorController, CalculatorView} from '@components/Calculator'
import '@styles/styles.scss';


const calculatorModel = new CalculatorModel()
const calculatorView = new CalculatorView()
const calculatorController = new CalculatorController()

calculatorModel.observers.resultObserver.subscribe(calculatorView)
calculatorModel.observers.expressionObserver.subscribe(calculatorController)

calculatorModel.observers.expressionObserver.notifyAll('dsd')
calculatorModel.observers.resultObserver.notifyAll(132)
