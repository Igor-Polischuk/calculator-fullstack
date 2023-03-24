import { Button } from "@components/Elements/Button"

export function getServiceButtons() {
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