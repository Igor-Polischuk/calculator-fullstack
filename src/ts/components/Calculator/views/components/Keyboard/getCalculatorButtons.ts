import { Button } from "../../../../Elements/Button"

export function getCalculatorButtons(): Button[] {
    const numpudButtons = getNumpudButtons()
    const operationsButton = getCommonOpeationsButtons()
    const { resultBtn, removeSymbolBtn, clearBtn } = getServiceBtn()
    const calculatorKeyboard = [
        operationsButton['pi'],  operationsButton['e'], operationsButton['('], operationsButton[')'], removeSymbolBtn, clearBtn,
        operationsButton['sin'], operationsButton['sqrt'], numpudButtons[7], numpudButtons[8], numpudButtons[9], operationsButton['/'],
        operationsButton['cos'], operationsButton['^'], numpudButtons[4], numpudButtons[5], numpudButtons[6], operationsButton['*'],
        operationsButton['tg'], operationsButton['!'], numpudButtons[1], numpudButtons[2], numpudButtons[3], operationsButton['-'],
        operationsButton['ctg'], operationsButton['%'], numpudButtons[0], numpudButtons[10], resultBtn, operationsButton['+'],
    ]
    return calculatorKeyboard
}

function getServiceBtn() {
    const clearBtn = new Button({
        text: 'AC',
        classNames: ['button', 'button--action'],
        meta: {purpose: 'clearInput'}
    })

    const removeSymbolBtn = new Button({
        text: '←',
        classNames: ['button', 'button--action'],
        meta: {purpose: 'removeSymbol'}
    })
    const resultBtn = new Button({
        text: '=',
        classNames: ['button', 'button--get-res'],
        meta: {purpose: 'getResult'}
    })
    return { resultBtn, removeSymbolBtn, clearBtn }
}

function getNumpudButtons() {
    const numpudButtonsText = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    const classNames = ['button', 'button--number']
    return numpudButtonsText.map(text => {
        return new Button({
            classNames: classNames,
            text,
            meta: {
                action: text
            }
        })
    })
}

function getCommonOpeationsButtons() {
    const operations = [
        {
            text: '+',
        },
        {
            text: '−',
            action: '-'
        },
        {
            text: '×',
            action: '*'
        },
        {
            text: '÷',
            action: '/'
        },
        {
            text: '(',
        },
        {
            text: ')',
        },
        {
            text: 'π',
            action: 'pi'
        },
        {
            text: 'e',
        },
        {
            text: 'sin',
        },
        {
            text: 'cos',
        },
        {
            text: 'tg',
        },
        {
            text: 'ctg',
        },
        {
            text: '√',
            action: 'sqrt'
        },
        {
            text: '<span>x<sup>y</sup></span>',
            action: '^'
        },
        {
            text: 'n!',
            action: '!'
        },
        {
            text: '%',
        },
    ]

    return operations.reduce<Record<string, Button>>((buttonsObj, operation) => {
        buttonsObj[operation.action || operation.text] = new Button({
            text: operation.text,
            classNames: ['button', 'button--action'],
            meta: {
                action: operation.action || operation.text
            }
        })
        return { ...buttonsObj }
    }, {})
}