import { CalculatorController } from './controllers/CalculatorController';
import { CalculatorModel } from '@models/CalculatorModel';
import { CalculatorView } from '@views/CalculatorView';
import '@styles/styles.scss';


const calculatorModel = new CalculatorModel()
const calculatorView = new CalculatorView()
const calculatorController = new CalculatorController()

calculatorModel.expressionChanel.subscribe(calculatorController)
calculatorModel.resultChanel.subscribe(calculatorView)

// calculatorModel.resultChanel.notify(15)
// calculatorModel.expressionChanel.unsubscribe(calculatorController)
// calculatorModel.expressionChanel.notify('3 * 5')
