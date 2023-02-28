import {CalculatorModel, CalculatorController, CalculatorView} from '@components/Calculator'
import '@styles/styles.scss';


const calculatorModel = new CalculatorModel()
const calculatorView = new CalculatorView(calculatorModel)
const calculatorController = new CalculatorController(calculatorModel)


