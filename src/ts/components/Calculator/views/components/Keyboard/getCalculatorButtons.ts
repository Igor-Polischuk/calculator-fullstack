import { Button } from "../../../../Elements/Button"

export function getCalculatorButtons(): Button[] {
    const numpadButtons = getNumpadButtons()
    const operationsButton = getCommonOperationsButtons()
    const { resultBtn, removeSymbolBtn, clearBtn } = getServiceBtn()
    const calculatorKeyboard = [
        operationsButton['pi'],  operationsButton['e'], operationsButton['('], operationsButton[')'], removeSymbolBtn, clearBtn,
        operationsButton['sin'], operationsButton['sqrt'], numpadButtons[7], numpadButtons[8], numpadButtons[9], operationsButton['/'],
        operationsButton['cos'], operationsButton['^'], numpadButtons[4], numpadButtons[5], numpadButtons[6], operationsButton['*'],
        operationsButton['tg'], operationsButton['!'], numpadButtons[1], numpadButtons[2], numpadButtons[3], operationsButton['-'],
        operationsButton['ctg'], operationsButton['%'], numpadButtons[0], numpadButtons[10], resultBtn, operationsButton['+'],
    ]
    return calculatorKeyboard
}

function getServiceBtn() {
    const clearBtn = new Button({
        text: 'AC',
        classNames: 'button button--action',
        meta: {purpose: 'clearInput'}
    })

    const removeSymbolBtn = new Button({
        text: '←',
        classNames: 'button button--action',
        meta: {purpose: 'removeSymbol'}
    })
    const resultBtn = new Button({
        text: '=',
        classNames: 'button button--get-res',
        meta: {purpose: 'getResult'}
    })
    return { resultBtn, removeSymbolBtn, clearBtn }
}

function getNumpadButtons() {
    const numpadButtonsText = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    const classNames = 'button button--number'
    return numpadButtonsText.map(text => {
        return new Button({
            classNames: classNames,
            text,
            meta: {
                action: text
            }
        })
    })
}

function getCommonOperationsButtons() {
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
            classNames: 'button button--action',
            meta: {
                action: operation.action || operation.text
            }
        })
        return { ...buttonsObj }
    }, {})
}