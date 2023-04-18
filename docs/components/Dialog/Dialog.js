"use strict";
class Dialog {
    constructor(content) {
        this.bodyContent = content;
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
        this.bodyContent.onRendered();
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['dialogBackground'],
            children: [
                {
                    tag: 'div',
                    classes: ['dialogContainer'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['dialogHead'],
                            children: [
                                {
                                    tag: 'button',
                                    classes: ['fa', 'fa-times', 'squareButton'],
                                    handler: [
                                        {
                                            type: 'click',
                                            id: 'clickCloseDialog',
                                            body: (self) => Dialog.findParentDialog(self).delete(),
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            tag: 'div',
                            classes: ['dialogBody'],
                            children: [this.bodyContent.instructions()],
                        },
                        {
                            tag: 'div',
                            classes: ['dialogFooter'],
                        },
                    ],
                },
            ],
        };
    }
    unload() { }
    static findParentDialog(self) {
        let elm;
        elm = self.parent;
        let i = 0;
        const maxIter = 100;
        while (elm !== undefined && !elm.classes.includes('dialogBackground')) {
            elm = elm.parent;
            if (i >= maxIter) {
                elm = undefined;
                break;
            }
        }
        if (elm === undefined) {
            throw new Error('could not find parent dialog');
        }
        return elm;
    }
}
