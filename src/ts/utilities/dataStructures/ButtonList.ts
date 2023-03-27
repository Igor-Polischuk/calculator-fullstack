import { Button } from '@components/Elements/Button';


export class ButtonList {
    private buttons: Button[]
    constructor(buttons: Button[]) {
        this.buttons = buttons
    }

    addClickListenersByRole(role: string, callback: (params: {e: Event, button: Button}) => void) {
        const buttons = this.getButtonsByRole(role)
        buttons.forEach(button => {
            button.onClick((e) => callback({e, button}))
        })
    }

    getButtonsByRole(role: string){
        return this.buttons.filter(button => button.getButtonRole === role)
    }

    getAll(){
        return this.buttons
    }
}