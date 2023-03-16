import { Button } from "./Elements/Button"

export function getCalculatorButtons() {
    const numpudButtons = getNumpudButtons()
    const operationsButton = getCommonOpeationsButtons()
    // const { resultBtn } = getServiceBtn()
    return {
        numpudButtons,
        operationsButton,
        // removeSymbolBtn
    }
}

function getServiceBtn() {
    const parentNode = document.querySelector('#common-actions')!

    // const removeSymbolBtn = new Button({
    //     text: '←',
    //     classNames: ['button', 'button--action'],
    //     parentNode
    // })
    const resultBtn = new Button({
        text: '=',
        classNames: ['button', 'button--get-res'],
        parentNode
    })
    return { resultBtn }
}

function getNumpudButtons() {
    const parentNode = document.querySelector('.calculator__buttons__number')!
    const numpudButtonsText = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
    const classNames = ['button', 'button--number']
    const newbtn = numpudButtonsText.map(text => {
        return new Button({
            parentNode,
            classNames: classNames,
            text,
            meta: {
                action: text
            }
        })
    })
    const resultBtn = new Button({
        text: '=',
        classNames: ['button', 'button--get-res'],
        parentNode
    })

    return newbtn
}

function getCommonOpeationsButtons() {
    const parentNode = document.querySelector('#common-actions')!
    const operations = [
        {
            text: '+',
            action: '+'
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
    ]

    return operations.map(operation => {
        return new Button({
            parentNode,
            text: operation.text,
            classNames: ['button', 'button--action'],
            meta: {
                action: operation.action
            }
        })
    })
}