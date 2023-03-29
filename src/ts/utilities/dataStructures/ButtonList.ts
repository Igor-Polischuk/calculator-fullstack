import { Button } from '@components/Elements/Button';


export class ButtonList {
    private buttons: Button[]
    constructor(buttons: Button[]) {
        this.buttons = buttons
    }

    addClickListenersByType(type: string, callback: (params: {e: Event, button: Button}) => void) {
        const buttons = this.getButtonsByType(type)
        buttons.forEach(button => {
            button.onClick((e) => callback({e, button}))
        })
    }

    getButtonsByType(type: string){
        return this.buttons.filter(button => button.type === type)
    }

    getAll(){
        return this.buttons
    }
}