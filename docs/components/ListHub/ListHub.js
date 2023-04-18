"use strict";
class ListHub {
    constructor(listNames) {
        this.listNames = listNames.sort();
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        if (this.listNames.length === 0) {
            return new frownie().instructions();
        }
        return {
            tag: 'ul',
            classes: ['listHub'],
            id: 'listButtons',
            children: this.listNames.map((name) => {
                return {
                    tag: 'li',
                    children: [new ListButton(name).instructions()],
                };
            }),
        };
    }
    unload() { }
}
